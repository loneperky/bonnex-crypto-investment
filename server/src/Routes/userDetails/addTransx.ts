import express, { Request, Response } from 'express';
import supabase from '../../config/supabaseClient';
import { authToken } from "../../config/authToken";

const router = express.Router();

router.post('/add', authToken, async (req: Request, res: Response) => {
  const { type, method, amount, status } = req.body;
  const user = (req as any).user; // from authToken middleware
  const userId = user?.userId;

  // Validate required fields
  if (!type || !method || !amount || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const validTypes = ['deposit', 'withdrawal', 'fund_log', 'signal_purchase']; // NOTE: Consider consistent casing
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Invalid transaction type' });
  }

  try {
    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          amount,
          type,
          method,
          status,
        },
      ]).select(); // Return inserted row(s)

    if (error) {
      console.error('Insert error:', error);
      return res.status(500).json({ error: 'Transaction creation failed' });
    }

    return res.status(201).json({ transaction: data[0] }); // ✅ Return inserted transaction
  } catch (err) {
    console.error('Transaction error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as addTransxRoute };
