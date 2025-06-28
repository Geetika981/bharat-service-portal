import stripe from '../utils/stripe.js';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe needs amount in paisa
      currency: 'inr',
      metadata: {
        integration_check: 'accept_a_payment',
        userId: req.user._id.toString(),
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ message: 'Failed to create Payment Intent' });
  }
};
