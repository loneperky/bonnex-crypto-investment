import express from 'express';
import supabase from '../../config/supabaseClient';
import { Request, Response } from 'express';
import { authToken } from '../../config/authToken';

const router = express.Router();

router.get('/profile', authToken, async (req: Request, res: Response) => {
  // 🛡 Extract userId from the token (added in middleware)
  const userId = (req as any).user?.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized: No user ID found' });
  }

  // ✅ Fetch profile by user ID
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', userId)
    .single();

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(200).json({ user: data });
});

export { router as profileRoute };
