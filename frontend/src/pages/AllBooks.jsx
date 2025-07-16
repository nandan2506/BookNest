import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import BookCard from "../components/BookCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/footer";

const API_BASE = "https://booknest-2hdd.onrender.com";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = 6;
  const sort = searchParams.get("sort") || "title_asc";

  const handleSearchChange = (e) => {
    searchParams.set("search", e.target.value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };

  const handleSortChange = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  const goToPage = (pageNum) => {
    searchParams.set("page", pageNum);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_BASE}/book/all?search=${search}&page=${page}&limit=${limit}&sort=${sort}`
        );
        const data = await res.json();
        if (!data.books || data.books.length === 0) {
          setBooks([]);
          setError("No books found.");
        } else {
          setBooks(data.books);
          setError("");
        }
      } catch (err) {
        console.log("error while fetching books0", err);
        setError("Failed to fetch books.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [search, page, sort]);

  if (books.length === 0) {
    return (
      <div>
        <main className="min-h-screen bg-[#f8fafa] flex flex-col items-center justify-center">
          <h1 className="text-xl text-gray-600 mb-4">No books available</h1>
          <button
            onClick={() => navigate("/newbook")}
            className="px-6 py-3 bg-[#01BFBD] hover:bg-[#019fa5] text-white text-lg rounded-xl transition duration-300"
          >
            Add a New Book
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <main className="min-h-screen bg-[#f8fafa]">
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full md:w-1/2">
              <CiSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-2xl text-[#01BFBD]" />
              <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full shadow focus:ring-2 focus:ring-[#01BFBD] focus:outline-none"
              />
            </div>
            <select
              value={sort}
              onChange={handleSortChange}
              className="border border-gray-300 px-4 py-2 rounded-full shadow focus:ring-2 focus:ring-[#01BFBD] focus:outline-none"
            >
              <option value="title_asc">Title A-Z</option>
              <option value="title_desc">Title Z-A</option>
              <option value="year_asc">Year ↑</option>
              <option value="year_desc">Year ↓</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[192px] w-full bg-gray-200 rounded-xl shadow animate-pulse"
                ></div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-600 font-semibold">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10 gap-2">
                <button
                  onClick={() => goToPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => goToPage(page + 1)}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AllBooks;
