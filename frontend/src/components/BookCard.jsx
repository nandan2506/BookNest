import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("add-new-book-token");
  let userId = null;

  try {
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.userId;
    }
  } catch (e) {
    console.error("Invalid token:", e);
  }
  const handleClick = () => {
    if (book.is_available) {
      navigate(`/borrow/${book._id}`);
    } else if (book.borrowed_by === userId) {
      navigate(`/return/${book._id}`);
    }
  };

  return (
    <div className="flex flex-col p-4 shadow-xl text-center gap-2 rounded-xl bg-white hover:shadow-2xl transition">
      <div
        onClick={() => navigate(`/bookDetails/${book._id}`)}
        className="cursor-pointer"
      >
        <img
          className="rounded-md w-full h-48 object-cover"
          src={
            book.cover_image ||
            "https://designerpeople.com//wp-content/uploads/2020/02/illustration-book-cover-design-inspiration-2.jpg"
          }
          alt="book cover"
        />
      </div>

      <h3 className="text-lg font-semibold mt-2">{book.title}</h3>
      <p className="text-gray-500 text-sm mb-2">by {book.author}</p>

      <button
        disabled={!book.is_available && book.borrowed_by !== userId}
        onClick={handleClick}
        className={`w-full px-4 py-2 rounded-lg transition-all text-white ${
          book.is_available
            ? "bg-[#01BFBD] hover:bg-[#019fa5]"
            : book.borrowed_by === userId
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {book.is_available
          ? "Borrow"
          : book.borrowed_by  === userId
          ? "Return"
          : "Borrowed"}
      </button>
    </div>
  );
}
