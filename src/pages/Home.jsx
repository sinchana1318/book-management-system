import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {

  // STATES
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [filterGenre, setFilterGenre] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // FETCH DATA
  useEffect(() => {
    fetchBooks();
  }, []);

  // FETCH BOOKS
  const fetchBooks = async () => {

    try {

      setLoading(true);

      const res = await API.get("/books");

      setBooks(res.data);

      setSearchResults(res.data);

      setLoading(false);

    } catch (err) {

      setError("Something went wrong");

      setLoading(false);

      alert("Failed to fetch books ❌");
    }
  };

  // ADD BOOK
  const addBook = async () => {

    if (!title) {
      alert("Please enter book title");
      return;
    }

    if (!author) {
      alert("Please enter author name");
      return;
    }

    if (!genre) {
      alert("Please select genre");
      return;
    }

    if (!year) {
      alert("Please enter publication year");
      return;
    }

    if (year < 1000 || year > 2026) {
      alert("Please enter valid year");
      return;
    }

    const newBook = {
      title,
      author,
      genre,
      year,
    };

    try {

      await API.post("/books", newBook);

      fetchBooks();

      alert("Book Added Successfully ✅");

      setTitle("");
      setAuthor("");
      setGenre("");
      setYear("");

    } catch (err) {

      alert("Failed to add book ❌");
    }
  };

  // DELETE BOOK
  const deleteBook = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {

      alert("Delete Cancelled");

      return;
    }

    try {

      await API.delete(`/books/${id}`);

      fetchBooks();

      alert("Book Deleted Successfully ❌");

    } catch (err) {

      alert("Failed to delete book ❌");
    }
  };

  // SEARCH
  const handleSearch = () => {

    if (!searchInput.trim()) {

      alert("Please enter title or author to search");

      return;
    }

    const filteredBooks = books
      .filter(
        (book) =>
          ((book.title || "")
            .toLowerCase()
            .includes(searchInput.toLowerCase())) ||

          ((book.author || "")
            .toLowerCase()
            .includes(searchInput.toLowerCase()))
      )
      .filter(
        (book) =>
          filterGenre === "" || book.genre === filterGenre
      );

    setSearchResults(filteredBooks);

    if (filteredBooks.length === 0) {

      alert("No Data Found ❌");

    } else {

      alert(
        filteredBooks.length +
        " result(s) found. Scroll down to view results ✅"
      );

      // AUTO SCROLL TO RESULTS
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // LOADING
  if (loading) return <h1>Loading...</h1>;

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial",
        backgroundColor: "#f4f4f4",
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#1e293b",
          color: "white",
          padding: "30px",
        }}
      >

        <h1>📚 Book Manager</h1>

        <p style={{ marginTop: "20px" }}>
          Manage your books easily with add, search, filter and delete features.
        </p>

      </div>

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        <h1 style={{ marginBottom: "20px" }}>
          Book Management System
        </h1>

        {/* ERROR */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* SEARCH SECTION */}
        <div
          style={{
            marginBottom: "20px",
          }}
        >

          {/* SEARCH + FILTER */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >

            {/* SEARCH INPUT */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "8px",
                border: "1px solid gray",
              }}
            />

            {/* FILTER */}
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            >

              <option value="">All Genres</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Self Help">Self Help</option>
              <option value="Science">Science</option>

            </select>

          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >

            Search

          </button>

        </div>

        {/* ADD BOOK FORM */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "30px",
            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          }}
        >

          <h2>Add New Book</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginTop: "15px",
            }}
          >

            {/* TITLE */}
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            />

            {/* AUTHOR */}
            <input
              type="text"
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            />

            {/* GENRE */}
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            >

              <option value="">Select Genre</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Self Help">Self Help</option>
              <option value="Science">Science</option>

            </select>

            {/* YEAR */}
            <input
              type="number"
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            />

          </div>

          {/* ADD BUTTON */}
          <button
            onClick={addBook}
            style={{
              marginTop: "20px",
              padding: "12px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >

            Add Book

          </button>

        </div>

        {/* SEARCH RESULTS */}
        <div
          style={{
            marginTop: "40px",
          }}
        >

          <h2 style={{ marginBottom: "20px" }}>
            Search Results
          </h2>

          {/* NO DATA */}
          {searchResults.length === 0 ? (

            <div
              style={{
                backgroundColor: "white",
                padding: "30px",
                borderRadius: "10px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }}
            >

              No Data Found ❌

            </div>

          ) : (

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "20px",
              }}
            >

              {searchResults.map((book) => (

                <div
                  key={book.id}
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  }}
                >

                  <h2>{book.title}</h2>

                  <p>
                    <b>Author:</b> {book.author}
                  </p>

                  <p>
                    <b>Genre:</b> {book.genre}
                  </p>

                  <p>
                    <b>Year:</b> {book.year}
                  </p>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteBook(book.id)}
                    style={{
                      marginTop: "10px",
                      padding: "10px 15px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >

                    Delete

                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Home;