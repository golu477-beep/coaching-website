import Payment from '../models/Payment.js';

export const makePayment = async (req, res) => {
  const { amount } = req.body ?? {};
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  try {
    const payment = await Payment.create({
      student: req.user.id,
      amount,
      transactionId: `TXN_${Date.now()}`,
      status: 'Pending'
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};