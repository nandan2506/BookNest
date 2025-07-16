import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/footer";
import { toast } from "react-toastify";
import { IoMdToday } from "react-icons/io";

const BorrowBook = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const [rentAmount, setRentAmount] = useState(0);
  const navigate = useNavigate();

  const { bookId } = useParams();
  const token = localStorage.getItem("add-new-book-token");

  const API_BASE = "https://booknest-2hdd.onrender.com";

  useEffect(() => {
    const fetchbook = async () => {
      try {
        const res = await fetch(`${API_BASE}/book/book/${bookId}`);
        const data = await res.json();
        setBook(data.book);
      } catch (error) {
        console.log("Error fetching book detail:", error);
      }
    };
    fetchbook();
  }, [bookId, book]);

  // calculate rent based on dueDate
  useEffect(() => {
    if (!dueDate) return;

    const now = new Date();
    const selected = new Date(dueDate);
    const diffInMs = selected.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays > 7) {
      setError("❌ Can't rent for more than 7 days");
      setRentAmount(0);
    } else if (diffInDays <= 0) {
      setError("❌ Select a valid future date");
      setRentAmount(0);
    } else {
      setError("");
      setRentAmount(diffInDays * 30); // ₹10 per day
    }
  }, [dueDate]);

  const handleBorrow = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!bookId || !token || !dueDate) {
      setError("All fields are required");
      setMessage("");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/book/borrow/${bookId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ dueDate }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Borrow failed");
      }

      setMessage(data.message);
      setBook(data.book);
      setError("");
      toast.success(data.message);
      navigate(`/user-dashboard`);
    } catch (err) {
      setMessage("");
      setBook(null);
      setError(err.message || "An error occurred while borrowing the book");
      toast.error(err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="h-dvh flex flex-col justify-center items-center">
        <div className="max-w-auto  mx-4 p-6 border rounded-lg shadow-lg bg-white">
          <h3 className="text-xl my-2 font-semibold text-center">
            Book Details
          </h3>

          {book && (
            <div className="flex gap-4 items-start border p-4 rounded mb-6">
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-40 h-auto rounded shadow"
              />
              <div className="text-left">
                <p>
                  <strong>Title:</strong> {book.title}
                </p>
                <p>
                  <strong>Author:</strong> {book.author}
                </p>
                <p>
                  <strong>Year:</strong> {book.publication_year}
                </p>
                <p>
                  <strong>Genre:</strong> {book.genre.join(", ")}
                </p>
              </div>
            </div>
          )}

          {/* borrow book form */}
          <form onSubmit={handleBorrow} className="space-y-4">
            <div className="flex gap-4 items-center">
              <label className="text-sm font-medium">Return Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border px-2 py-1 text-sm text-gray-600 rounded"
              />
              <p className="text-sm">📅 Max 7 days</p>
            </div>

            <p className="text-sm flex justify-between font-semibold">
              Total Rent: ₹{rentAmount} <span>(over due fine: ₹50/day)</span>
            </p>

            <button
              type="submit"
              disabled={loading || !!error}
              className="bg-blue-600 w-full text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Borrowing..." : "Borrow Book"}
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-sm">
              ✅ {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded text-sm">
              ❌ {error}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BorrowBook;
