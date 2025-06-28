import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import CheckoutForm from "../../components/CheckoutForm";
import Navbar from "../../components/Navbar";

export const BookService = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const fetchService = async () => {
    try {
      const res = await axios.get(`/user/services/${serviceId}`);
      setService(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch service");
    }
  };

  const createIntent = async (amount) => {
    try {
      const res = await axios.post(
        "/payments/create-payment-intent",
        { amount },
        { withCredentials: true }
      );
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error("❌ Failed to create payment intent");
    }
  };

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  useEffect(() => {
    if (service) {
      createIntent(service.price);
    }
  }, [service]);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Book Service:{" "}
          <span className="text-blue-600">{service?.title}</span>
        </h2>

        <div className="bg-white shadow rounded-lg p-6">
          {clientSecret ? (
            <CheckoutForm
              clientSecret={clientSecret}
              serviceId={service._id}
              providerId={service.createdBy._id}
            />
          ) : (
            <p className="text-gray-600 animate-pulse">Loading Stripe payment form...</p>
          )}
        </div>
      </div>
    </>
  );
};
