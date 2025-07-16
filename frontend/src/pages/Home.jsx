import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen bg-gradient-to-br from-[#f0fafa] to-white px-4 md:px-6 py-24 flex items-center justify-center">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#01BFBD] mb-6">
            📚 Welcome to <span className="text-[#019fa5]">BookNest</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            BookNest is your modern library management platform. Easily browse,
            issue, return, and manage books — all in one seamless system.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={() => navigate("/allBooks")}
              className="bg-[#01BFBD] hover:bg-[#019fa5] text-white px-6 py-3 rounded-xl shadow-md text-lg transition duration-300"
            >
              Browse Books
            </button>

            <button
              onClick={() => navigate("/about")}
              className="border border-[#01BFBD] text-[#01BFBD] hover:bg-[#e0ffff] px-6 py-3 rounded-xl text-lg transition duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
