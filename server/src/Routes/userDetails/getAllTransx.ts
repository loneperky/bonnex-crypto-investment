// routes/TransactionRoute.ts
import express, { Request, Response } from 'express';
import supabase from '../../config/supabaseClient';
import { authToken } from '../../config/authToken';

const router = express.Router();

// ✅ GET all transactions for logged-in user
router.get('/all', authToken, async (req: Request, res: Response) => {
  const user = (req as any).user;
  const userId = user?.userId;

  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ error: 'Failed to get transactions.' });
    }

    return res.status(200).json({ transactions: data });
  } catch (err) {
    console.error('Transaction fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as getAllTransxRoute };
