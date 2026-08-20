// paymentRoute.js
import express from "express";
const Paymentrouter = express.Router();

import Stripe from "stripe";
 const stripe = new Stripe(
  "sk_test_51RplLzIYhlitoskk0y4Bd5mQraTX1b4eD8pp6KRLkUAKml7uSyFv6UGJCNSVy8e8QgR7dkMjYEC9rwoWha5jLjdZ00NuzOJYuC",
  {
    apiVersion: "2024-06-20", // or your preferred version
  },
);

// paymentMethod.js (or paymentRoute.js)
Paymentrouter.post("/create-checkout-session", async (req, res) => {
  try {
    const frontendBase = process.env.NODE_ENV === "development"
      ? "http://localhost:5173"                  // your Vite/React port
      : "https://your-production-domain.com";   // later change this

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Advanced Elevator Design PDF" },
            unit_amount: 990,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${frontendBase}/review?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${frontendBase}/review?payment=cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ error: error.message });
  }
});

export {Paymentrouter};
