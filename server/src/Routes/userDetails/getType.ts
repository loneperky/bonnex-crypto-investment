import express, { Request, Response } from 'express';
import supabase from '../../config/supabaseClient';
import { authToken } from '../../config/authToken';

const router = express.Router();

// ✅ Get transactions by type (deposit, withdrawal, fund_log)
router.get('/type/:type', authToken, async (req: Request, res: Response) => {
  const { type } = req.params;
  const userId = (req as any).user?.userId;

  const validTypes = ['deposit', 'withdrawal', 'fund_log'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    return res.status(200).json({ transactions: data });
  } catch (err) {
    console.error('Transaction fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as getTransxByTypeRoute };
