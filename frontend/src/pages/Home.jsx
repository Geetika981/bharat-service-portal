import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col font-sans">
      {/* Header */}
      <header className="p-6 flex justify-between items-center shadow-md sticky top-0 bg-white z-50">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
          ProFinder
        </h1>
        <nav className="space-x-6 text-sm font-medium">
          <a
            href="#features"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Features
          </a>
          <a
            href="#services"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-blue-600 transition"
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
          Connecting You to Trusted Local Professionals Instantly
        </h2>
        <p className="text-lg max-w-2xl mb-10 opacity-90">
          Book skilled service providers nearby for anything—from plumbing and
          electrical work to tutoring and event planning.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="inline-flex items-center bg-white text-blue-600 font-semibold px-6 py-3 text-lg rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer"
        >
          Get Started <ArrowRight className="ml-2 w-5 h-5" />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-14 text-gray-800">
          Why ProFinder?
        </h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Verified Providers",
              desc: "All professionals are vetted and approved to ensure reliable service every time.",
            },
            {
              title: "Secure Payments",
              desc: "Pay with confidence through our integrated and encrypted payment system.",
            },
            {
              title: "Real-Time Booking",
              desc: "Find and schedule services on-demand, without the back-and-forth.",
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h4 className="text-xl font-semibold mb-2 text-blue-600">
                {title}
              </h4>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <h3 className="text-3xl font-bold text-center mb-14 text-gray-800">
          Popular Services
        </h3>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Home Cleaning",
              desc: "Book top-rated cleaners for one-time or recurring services.",
            },
            {
              title: "Tutoring",
              desc: "Find expert tutors for academics, test prep, or skill development.",
            },
            {
              title: "Event Photography",
              desc: "Hire professionals to capture your memories beautifully and affordably.",
            },
          ].map(({ title, desc }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h4 className="text-xl font-semibold mb-2 text-blue-600">
                {title}
              </h4>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <h3 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Contact Us
        </h3>
        <p className="text-center max-w-xl mx-auto text-gray-600">
          Have questions or want to partner with us? Drop us a message and we'll
          get back to you within 24 hours.
        </p>
        <div className="mt-8 text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition">
            Send a Message
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 text-sm text-gray-500">
        © {new Date().getFullYear()} ProFinder. All rights reserved.
      </footer>
    </div>
  );
};
