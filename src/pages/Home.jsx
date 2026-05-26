import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {

  
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  
  const fetchBooks = async () => {

    try {

      setLoading(true);

      const res = await API.get("/books");

      setBooks(res.data);

      setLoading(false);

    } catch (err) {

      setError("Something went wrong");

      setLoading(false);
    }
  };

  const addBook = async () => {

    const newBook = {
      title,
      author,
      genre,
      year,
    };

    await API.post("/books", newBook);

    fetchBooks();

    setTitle("");
    setAuthor("");
    setGenre("");
    setYear("");
  };

  // DELETE BOOK
  const deleteBook = async (id) => {

    await API.delete(`/books/${id}`);

    fetchBooks();
  };

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

      
      <div
        style={{
          flex: 1,
          padding: "30px",
        }}
      >

        <h1 style={{ marginBottom: "20px" }}>
          Book Management System
        </h1>

      
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

      
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
          }}
        >

          <input
            type="text"
            placeholder="Search by title or author"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "8px",
              border: "1px solid gray",
            }}
          />

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

            <input
              type="text"
              placeholder="Enter genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
              }}
            />

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

        {}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >

          {books
            .filter(
              (book) =>
                book.title.toLowerCase().includes(search.toLowerCase()) ||
                book.author.toLowerCase().includes(search.toLowerCase())
            )
            .filter(
              (book) =>
                filterGenre === "" || book.genre === filterGenre
            )
            .map((book) => (

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

      </div>

    </div>
  );
}

export default Home;