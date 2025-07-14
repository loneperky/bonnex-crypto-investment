// middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      userId: string;
      email: string;
    };

    (req as any).user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
