import "./BooksList.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import consts from "../../../../consts";
import { Col, Container, Dropdown, Row, Spinner } from "react-bootstrap";
import AddNewBookButton from "../../../Buttons/AddNewBookButton/AddNewBookButton";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BooksList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState(localStorage.getItem("sortBy"));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteBook, setSelectedDeleteBook] = useState(null);

  const [searchParams] = useSearchParams();
  const message = searchParams.get("message");
  const sectionTitle = searchParams.get("sectionTitle");

  const sortMapping = {
    title: "Title",
    author: "Author",
    genre: "Genre",
    language: "Language",
    pages: "Pages",
    rating: "Rating",
    publicationDate: "Last Read",
    dateAdded: "Recently Added",
  };

  function fetchBooks() {
    setLoading(true);
    fetch(
      `${consts.getBackendUrl()}/api/users/books?filter=${message}&sortBy=${localStorage.getItem(
        "sortBy"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setBooks(res.books);
        console.log(res);
        setLoading(false);
      });
  }

  useEffect(() => {
    if (!message && !sectionTitle) {
      navigate("/home");
      return;
    }
    fetchBooks();
  }, [message, sectionTitle]);

  function handleSelect(selection) {
    localStorage.setItem("sortBy", selection);
    setSortBy(localStorage.getItem("sortBy"));
    fetchBooks();
  }

  const handleDeleteModalShow = (book) => {
    console.log(book);
    setShowDeleteModal(true);
    setSelectedDeleteBook(book);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedDeleteBook(null);
    deleteBook(selectedDeleteBook._id);
  };

  function deleteBook(bookId) {
    fetch(`${consts.getBackendUrl()}/api/users/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(() => {
      fetchBooks();
    });
  }

  function setFavoriteBook(bookId) {
    const updatedBooks = books.map((book) => {
      if (book._id === bookId) {
        return { ...book, favorite: !book.favorite };
      }
      return book;
    });

    setBooks(updatedBooks);
    fetch(`${consts.getBackendUrl()}/api/users/books/${bookId}/favorite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(() => {
      if (message === "favorite-books") {
        fetchBooks();
      }
    });
  }

  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{ width: "8rem", height: "8rem", color: "orange" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <div className="books-list-container">
      <div
        className="add-new-book-btn"
        onClick={() => navigate("/home/add-book")}
      >
        <AddNewBookButton />
      </div>
      <div className="card-books-container">
        <div
          className="card"
          style={{ maxHeight: "65vh", backgroundColor: "#9A7872" }}
        >
          <div
            className="card-header"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "#9A7872",
              textAlign: "center",
              color: "#2D2019",
            }}
          >
            <Container>
              <Row>
                <Col
                  className="d-flex justify-content-center align-items-center"
                  style={{ fontSize: "28px", color: "white" }}
                >
                  <b>{sectionTitle}</b>
                </Col>
                {books.length > 0 ? (
                  <Col className="d-flex justify-content-center align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        id="dropdown-basic"
                        style={{ fontSize: "20px" }}
                      >
                        Order by: {sortMapping[sortBy]}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          eventKey="title"
                          onClick={() => handleSelect("title")}
                        >
                          {sortMapping["title"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="author"
                          onClick={() => handleSelect("author")}
                        >
                          {sortMapping["author"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="genre"
                          onClick={() => handleSelect("genre")}
                        >
                          {sortMapping["genre"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="language"
                          onClick={() => handleSelect("language")}
                        >
                          {sortMapping["language"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="pages"
                          onClick={() => handleSelect("pages")}
                        >
                          {sortMapping["pages"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="rating"
                          onClick={() => handleSelect("rating")}
                        >
                          {sortMapping["rating"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="publicationDate"
                          onClick={() => handleSelect("publicationDate")}
                        >
                          {sortMapping["publicationDate"]}
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="dateAdded"
                          onClick={() => handleSelect("dateAdded")}
                        >
                          {sortMapping["dateAdded"]}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </Container>
          </div>
          <div
            className="card-body"
            style={{ backgroundColor: "#D3AD79", overflowY: "scroll" }}
          >
            {books.length > 0 ? (
              books.map((book, index) => (
                <div
                  className="card elevated-card"
                  key={index}
                  style={{
                    marginBottom: "0.5rem",
                    backgroundColor: "#CEB289",
                    color: "#5B462F",
                    cursor: "pointer",
                  }}
                >
                  <div className="card-body">
                    <Container>
                      <Row>
                        <Col
                          lg={2}
                          className="book-details"
                          style={{ textAlign: "center" }}
                          onClick={() => navigate(`/home/book/${book._id}`)}
                        >
                          <img
                            style={{ maxWidth: "100%", maxHeight: "150px" }}
                            className="book-img img-fluid"
                            src={
                              book.imageUrl
                                ? book.imageUrl
                                : "../../../../../../assets/defaultCover.webp"
                            }
                            alt="book cover"
                          />
                        </Col>
                        <Col
                          lg={7}
                          className="book-details"
                          onClick={() => navigate(`/home/book/${book._id}`)}
                        >
                          <h2>{book.title}</h2>
                          <h4>{book.author}</h4>
                        </Col>
                        <Col lg={3}>
                          <Container>
                            <Row>
                              <Col lg={6} className="book-icons">
                                <div
                                  onClick={() => setFavoriteBook(book._id)}
                                  style={{
                                    textAlign: "end",
                                    paddingRight: "3rem",
                                    cursor: "pointer",
                                  }}
                                  className="d-flex justify-content-end"
                                >
                                  {book.favorite ? (
                                    <i
                                      className="bi bi-heart-fill"
                                      style={{ fontSize: "60px" }}
                                    ></i>
                                  ) : (
                                    <i
                                      className="bi bi-heart"
                                      style={{ fontSize: "60px" }}
                                    ></i>
                                  )}
                                </div>
                              </Col>
                              <Col
                                lg={6}
                                className="book-icons"
                                onClick={() => handleDeleteModalShow(book)}
                              >
                                <div
                                  style={{
                                    textAlign: "end",
                                    paddingRight: "3rem",
                                    cursor: "pointer",
                                  }}
                                  className="d-flex justify-content-end"
                                >
                                  <i
                                    className="bi bi-trash"
                                    style={{ fontSize: "60px" }}
                                  ></i>
                                </div>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                      <Modal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        centered
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header
                          closeButton
                          style={{
                            backgroundColor: "#9A7872",
                            color: "#fff",
                            borderBottom: "none",
                          }}
                        >
                          <Modal.Title>Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                          style={{
                            backgroundColor: "#CEB289",
                            color: "#402A1F",
                            fontSize: "1.05rem",
                            paddingTop: "1rem",
                          }}
                        >
                          Are you sure you want to delete{" "}
                          <strong>{selectedDeleteBook?.title}</strong>?
                        </Modal.Body>
                        <Modal.Footer
                          style={{
                            backgroundColor: "#D3AD79",
                            borderTop: "none",
                            justifyContent: "flex-end",
                            boxShadow: "0px -2px 6px rgba(0, 0, 0, 0.1)",
                            transition: "all 0.3s ease-in-out",
                          }}
                        >
                          <Button
                            onClick={() => setShowDeleteModal(false)}
                            style={{
                              backgroundColor: "#A67C52",
                              color: "#fff",
                              borderColor: "#8C6239",
                              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                              transition: "all 0.2s ease-in-out",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#8C6239";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "#A67C52";
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleDeleteModalClose}
                            style={{
                              backgroundColor: "#B02E2E",
                              borderColor: "#861F1F",
                              color: "white",
                              marginLeft: "0.5rem",
                              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
                              transition: "all 0.2s ease-in-out",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#861F1F";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "#B02E2E";
                            }}
                          >
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </Container>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div
                  className="card"
                  style={{
                    width: "18rem",
                    color: "#733c0f",
                    backgroundColor: "#D3AD79",
                    textAlign: "center",
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title">No books available.</h5>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
