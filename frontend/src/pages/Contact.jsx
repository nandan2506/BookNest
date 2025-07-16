import Footer from "../components/footer";

function Contact() {
  return (
    <>
      <section className="bg-[#f0fafa] py-16 px-6 min-h-screen">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-[#01BFBD] mb-6">
              Get in Touch
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 font-semibold">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Your message..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#01BFBD]"
                />
              </div>

              <button
                type="submit"
                className="bg-[#01BFBD] w-full text-white font-semibold px-6 py-2 rounded-md hover:bg-[#019fa5] transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="text-gray-700">
            <h3 className="text-2xl font-bold text-[#01BFBD] mb-4">
              Contact Info
            </h3>
            <p className="mb-3">📍 Haldwani, Uttarakhan, India</p>
            <p className="mb-3">📞 +91 7906681383</p>
            <p className="mb-3">📧 booknest.dev@gmail.com</p>

            <h4 className="mt-8 font-semibold text-lg text-[#01BFBD]">
              Office Hours
            </h4>
            <p>Mon – Fri: 10 AM – 6 PM</p>
            <p>Sat – Sun: Closed</p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
