import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import VerifyOtp from "./pages/VerifyOtp";
import BorrowBook from "./pages/BorrowBook";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReturnBook from "./pages/ReturnBook";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/bookDetails/:bookId" element={<BookDetails />} />
        <Route path="/borrow/:bookId" element={<BorrowBook />} />
        <Route path="/return/:bookId" element={<ReturnBook />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route />
        <Route />
        <Route />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
