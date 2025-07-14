// routes/SignUpRoute.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import supabase from '../../config/supabaseClient';

const router = express.Router();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

router.post('/sign-up', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password, and name are required.' });
  }

  try {
    // 1. Supabase Auth signup
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return res.status(400).json({ error: authError.message });

    const user = authData.user;
    if (!user?.id) return res.status(400).json({ error: 'User ID missing after sign-up.' });

    // 2. Insert profile data into `profiles` table
    const { error: profileError } = await supabase.from('profiles').insert([
      { id: user.id, email, full_name: name },
    ]);

    if (profileError) return res.status(400).json({ error: profileError.message });

    // 3. Generate Access Token (short-lived)
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // 4. Generate Refresh Token (long-lived)
    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15, // 15 mins
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    // 6. Respond
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email,
        full_name: name,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as SignUpRoute };
