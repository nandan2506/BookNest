import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer";
import { FaComment, FaShare } from "react-icons/fa";

function BookDetails() {
  const navigate = useNavigate();
  const { bookId } = useParams();
const API_BASE = "https://booknest-2hdd.onrender.com";

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // Scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  // Validate token and extract userId
  useEffect(() => {
    const localToken = localStorage.getItem("add-new-book-token");

    if (!localToken) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    setToken(localToken);

    try {
      const payload = JSON.parse(atob(localToken.split(".")[1]));
      setUserId(payload.userId);
    } catch (e) {
      console.error("Invalid token:", e);
    }
  }, [navigate]);

  // Fetch book details
  useEffect(() => {
    const localToken = localStorage.getItem("add-new-book-token");

    if (!localToken) {
      alert("Please login first");
      navigate("/login");
    } else {
      setToken(localToken);
      try {
        const payload = JSON.parse(atob(localToken.split(".")[1]));
        setUserId(payload.userId);
      } catch (e) {
        console.error("Invalid token:", e);
      }
    }
    if (!token) return;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/book/book/${bookId}`);
        const data = await res.json();

        if (!data.book) {
          setBook(null);
          setError("No book found.");
        } else {
          setBook(data.book);
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching the book.");
      } finally {
        setLoading(false);
      }
    })();
  }, [bookId, token, userId, navigate]);

  const handleClick = () => {
    if (!book || !userId) return;
    if (book.is_available) {
      navigate(`/borrow/${book._id}`);
    } else if (book.borrowed_by === userId) {
      navigate(`/return/${book._id}`);
    }
  };

  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;
  if (err) return <h2 className="text-center mt-20 text-red-500">{err}</h2>;
  if (!book) return <h2 className="text-center mt-20">No book found</h2>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto my-24 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
        {/* Left */}
        <div className="lg:w-1/4 space-y-6">
          <div className="h-80 rounded-xl overflow-hidden">
            <img
              src={
                book.cover_image ??
                "https://designerpeople.com//wp-content/uploads/2020/02/illustration-book-cover-design-inspiration-2.jpg"
              }
              alt="book"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <button
              disabled={!book.is_available || book.borrowed_by._id !== userId}
              onClick={handleClick}
              className={`w-full px-4 py-2 rounded-lg transition-all text-white ${
                book.is_available
                  ? "bg-[#01BFBD] hover:bg-[#019fa5]"
                  : book.borrowed_by._id === userId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {book.is_available
                ? "Borrow"
                : book.borrowed_by._id === userId
                ? "Return"
                : "Borrowed"}
            </button>
          </div>

          <div className="flex justify-around text-gray-600">
            <button className="flex flex-col items-center gap-1 hover:text-indigo-600">
              <FaComment />
              <span>Reviews</span>
            </button>
            <button className="flex flex-col items-center gap-1 hover:text-indigo-600">
              <FaShare />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-3/4 space-y-6">
          <div className="flex gap-6 justify-center shadow-sm p-2 items-center  text-indigo-600 font-medium">
            <button
              className="hover:shadow-md p-2 cursor-pointer"
              onClick={() => scrollToSection("overview")}
            >
              Overview
            </button>
            <button
              className="hover:shadow-md p-2 cursor-pointer"
              onClick={() => scrollToSection("details")}
            >
              Details
            </button>
            <button
              className="hover:shadow-md p-2 cursor-pointer"
              onClick={() => scrollToSection("comments")}
            >
              Comments
            </button>
          </div>

          {/* Overview */}
          <div id="overview" className="space-y-4">
            <div>
              <h2 className="text-3xl font-bold text-indigo-700">
                {book.title}
              </h2>
              by <span>{book.author}</span>
            </div>
            <p className="text-gray-700">{book.description}</p>

            <div className="flex flex-col md:flex-row gap-4 mt-4 text-sm text-gray-600">
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>Pages:</strong> {book.pages}
              </p>
              <p>
                <strong>Publisher:</strong> {book.publisher}
              </p>
              <p>
                <strong>Published:</strong> {book.publication_year}
              </p>
              <p>
                <strong>Language:</strong> {book.language}
              </p>
            </div>
          </div>

          {/* Details */}
          <div id="details" className="space-y-2 border-t pt-6">
            <h3 className="text-xl font-semibold text-indigo-700">Details</h3>
            <p className="text-gray-700">
              This book is available for borrowing. You can track your reading
              history and manage borrow/return activity from your dashboard.
            </p>
          </div>

          {/* Comments */}
          <div id="comments" className="space-y-2 border-t pt-6">
            <h3 className="text-xl font-semibold text-indigo-700">Comments</h3>
            <p className="text-gray-600 italic">
              Comment section coming soon...
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookDetails;
