import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = "https://booknest-2hdd.onrender.com";

const ReturnBook = () => {
  const { bookId } = useParams();
  console.log(bookId)
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("add-new-book-token");

  // Fetch book details
  useEffect(() => {
    setLoading(true);
    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_BASE}/book/book/${bookId}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setBook(data.book);
      } catch (err) {
        setError(err.message || "Failed to fetch book details.");
      }
    };
setLoading(false);
    fetchBook();
  }, [bookId]);

  const handleReturn = async () => {
    
    try {
      const res = await fetch(`${API_BASE}/book/return/${bookId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);
      toast.success(data.message);
      navigate("/user-dashboard");
    } catch (err) {
      toast.error(err.message || "Return failed");
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-indigo-700">
          Return Book
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">❌ {error}</p>}

        {book ? (
          <div className="space-y-3">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-bold">{book.title}</h3>
            <p>by {book.author}</p>
            <p className="text-sm text-gray-600">
              Genre: {book.genre.join(", ")}
            </p>
            <p className="text-sm text-gray-600">
              Year: {book.publication_year}
            </p>

            <button
              onClick={handleReturn}
              disabled={loading}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              {loading ? "Returning..." : "Return Book"}
            </button>
          </div>
        ) : (
          !error && <p className="text-gray-600 text-center">Loading book...</p>
        )}
      </div>
    </div>
  );
};

export default ReturnBook;
