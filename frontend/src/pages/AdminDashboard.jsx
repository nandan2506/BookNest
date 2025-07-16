import React, { useEffect, useState } from "react";
import Footer from "../components/footer";

const API_BASE = "https://booknest-2hdd.onrender.com";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    borrowedBooks: 0,
    availableBooks: 0,
  });

  const [recentBooks, setRecentBooks] = useState([]);

  const token = localStorage.getItem("add-new-book-token");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const booksRes = await fetch(`${API_BASE}/book/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const books = await booksRes.json();

        const borrowed = books.filter((book) => !book.is_available).length;
        const available = books.length - borrowed;

        const usersRes = await fetch(`${API_BASE}/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = await usersRes.json();

        const recent = [...books]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalBooks: books.length,
          totalUsers: users.length,
          borrowedBooks: borrowed,
          availableBooks: available,
        });

        setRecentBooks(recent);
      } catch (err) {
        console.error("Error fetching Admindashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        📊 BookNest AdminDashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard label="Total Books" value={stats.totalBooks} color="blue" />
        <StatCard label="Available Books" value={stats.availableBooks} color="green" />
        <StatCard label="Borrowed Books" value={stats.borrowedBooks} color="red" />
        <StatCard label="Total Users" value={stats.totalUsers} color="purple" />
      </div>

      <h2 className="text-xl font-semibold mb-4 text-gray-700">🆕 Recently Added Books</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentBooks.map((book) => (
          <div key={book._id} className="border p-4 rounded bg-white shadow-sm">
            <img src={book.cover_image} alt={book.title} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-semibold text-lg">{book.title}</h3>
            <p className="text-sm text-gray-600">by {book.author}</p>
            <p className="text-sm text-gray-500">Genre: {book.genre.join(", ")}</p>
            <p className={`text-xs font-medium mt-1 ${book.is_available ? "text-green-600" : "text-red-600"}`}>
              {book.is_available ? "Available" : "Borrowed"}
            </p>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

const StatCard = ({ label, value, color }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className={`p-6 rounded shadow ${colorClasses[color]} text-center`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
};

export default AdminDashboard;
