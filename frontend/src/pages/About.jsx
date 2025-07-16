import Footer from "../components/footer";

function About() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#f0fafa] to-[#e0ffff] min-h-screen py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#01BFBD] mb-6">
            About BookNest
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8">
            BookNest is a modern and user-friendly library management platform
            designed to simplify the way users explore, borrow, and manage
            books. Whether you're a student, librarian, or book lover, BookNest
            provides a seamless experience for discovering and tracking your
            reading.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              📚 Our Mission
            </h3>
            <p className="text-gray-600">
              Our mission is to modernize library systems by making book
              tracking and management effortless and accessible to everyone —
              from students to administrators.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              🔍 Key Features
            </h3>
            <p className="text-gray-600">
              With smart search, genre filtering, borrowing history, overdue
              fine tracking, and user roles — BookNest covers all essential
              library needs in a single platform.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              🚀 How It Works
            </h3>
            <p className="text-gray-600">
              Users can browse available books, issue them with one click, and
              return them when done. Admins can manage book inventory, user
              accounts, and overdue fees — all from an intuitive dashboard.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#01BFBD] mb-3">
              💡 Why BookNest
            </h3>
            <p className="text-gray-600">
              Fast, secure, and easy to use — BookNest is built with the latest
              technology (MERN stack) and a clean UI to provide a delightful
              experience for readers and librarians alike.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
