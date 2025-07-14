import express from 'express';
import supabase from '../../config/supabaseClient';
import { Request, Response } from 'express';
const router = express.Router();
// logout route

router.post("/logout", async (req: Request, res: Response) => {
  // Ensure the user is authenticated
  await supabase.auth.signOut();
  await res.clearCookie("token")
  return res.status(200).json({ message: "Logged out successfully" });
})

export { router as LogOutRoute }