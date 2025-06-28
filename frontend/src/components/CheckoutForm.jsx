import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CheckoutForm = ({ clientSecret, serviceId, providerId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      }
    );

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === "succeeded") {
      toast.success("✅ Payment Successful!");

      try {
        const res=await axios.post("/bookings", {
          serviceId,
          providerId,
          paymentIntentId: paymentIntent.id,
        });
        // console.log(res.data);
        toast.success("🎉 Booking Confirmed!");
        navigate("/user/bookings");
      } catch (err) {
        console.error("❌ Booking Error:", err);
        toast.error("Payment succeeded, but booking failed.");
        navigate("/user/bookings");
      }
    }

    setLoading(false);
  };

  const inputStyle = {
    base: {
      fontSize: "16px",
      color: "#1F2937", // Tailwind gray-800
      "::placeholder": { color: "#9CA3AF" }, // Tailwind gray-400
    },
    invalid: { color: "#DC2626" }, // Tailwind red-600
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardNumberElement options={{ style: inputStyle }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardExpiryElement options={{ style: inputStyle }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardCvcElement options={{ style: inputStyle }} />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-2 rounded text-white font-semibold transition ${
          loading || !stripe
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
