import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBookOpen, FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `hover:text-[#01BFBD] transition ${
      location.pathname === path ? "text-[#01BFBD] font-semibold" : ""
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#01BFBD] text-2xl font-bold"
        >
          <FaBookOpen className="text-3xl" />
          BookNest
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-6 items-center text-gray-800 text-lg">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/allBooks" className={navLinkClass("/allBooks")}>
            Books
          </Link>
          <Link to="/about" className={navLinkClass("/about")}>
            About
          </Link>
          {isAuthenticated && (
            <Link
              to="/user-dashboard"
              className={navLinkClass("/user-dashboard")}
            >
              Dashboard
            </Link>
          )}
          <Link to="/contact" className={navLinkClass("/contact")}>
            Contact
          </Link>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="bg-[#01BFBD] text-white px-4 py-2 rounded-lg hover:bg-[#019fa5] transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-[#01BFBD] text-[#01BFBD] px-4 py-2 rounded-lg hover:bg-[#e0ffff] transition"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-[#01BFBD]"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md rounded-b-lg px-6 pb-4 animate-slide-down">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700"
          >
            Home
          </Link>
          <Link
            to="/allBooks"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700"
          >
            Books
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700"
          >
            About
          </Link>
          {isAuthenticated && (
            <Link
              to="/user-dashboard"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-700"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-700"
          >
            Contact
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button className="w-full bg-[#01BFBD] text-white py-2 rounded mt-3 hover:bg-[#019fa5]">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="w-full border border-[#01BFBD] text-[#01BFBD] py-2 rounded mt-2 hover:bg-[#e0ffff]">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full bg-red-500 text-white py-2 rounded mt-3 hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
