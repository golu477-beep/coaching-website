import Payment from '../models/Payment.js';

export const makePayment = async (req, res) => {
  try {
    const payment = await Payment.create({
      student: req.user.id,
      amount: req.body.amount,
      transactionId: `TXN_${Date.now()}`,
      status: 'Completed'
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};