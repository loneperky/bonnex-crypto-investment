// routes/RefreshTokenRoute.ts
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

router.post('/refresh-token', (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ error: 'Refresh token not found' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
      userId: string;
      email: string;
    };

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    // Set new access token in cookie
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15, // 15 mins
    });

    return res.status(200).json({ message: 'Access token refreshed' });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(403).json({ error: 'Invalid refresh token' });
  }
});

export { router as RefreshTokenRoute };
