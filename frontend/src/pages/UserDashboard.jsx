import { useEffect, useState } from "react";
import Footer from "../components/footer";
import BookCard from "../components/BookCard";

const API_BASE = "https://booknest-2hdd.onrender.com";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [wishedBooks, setWishedBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("add-new-book-token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE}/user/userById`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "User fetch failed");
          return;
        }

        setUser(data.user);
        setBorrowedBooks(data.user.borrowedBooks || []);
        setReturnedBooks(data.user.returnedBooks || []);
        setWishedBooks(data.user.wishedBooks || []);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);


  const BookShelf = ({ title, books }) => {
    return (
      <section className="bg-white border shadow rounded-lg p-6 w-full mb-8">
        <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
          {title}
        </h2>

        {books.length === 0 ? (
          <p className="text-gray-400 italic text-center">
            No books are on this shelf.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((b) => (
              <BookCard key={b._id} book={b} />
            ))}
          </div>
        )}
      </section>
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-indigo-600">
        Loading your dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            👋 Welcome{user ? `, ${user.username}` : ""}
          </h1>
          {user && (
            <p className="text-gray-500">
              Email: <span className="font-medium">{user.email}</span> | Role:{" "}
              <span className="capitalize">{user.role}</span>
            </p>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded mb-6 text-center">
            ❌ {error}
          </div>
        )}

        {/* Book Shelves */}
        <div className="space-y-8">
          <BookShelf title="📖 Currently Reading" books={borrowedBooks} />
          <BookShelf title="✅ Already Read" books={returnedBooks} />
          <BookShelf title="📚 Wish to Read" books={wishedBooks} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
