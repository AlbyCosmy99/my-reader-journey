import {useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import consts from '../../consts';
import {useNavigate, useSearchParams} from 'react-router-dom';
import MobileMiniBookCard from './MobileMiniBookCard';
import ConfirmBookDeletionModal from '../Modals/ConfirmBookDeletionModal';

const MiniBookCard = ({book, fetchBooks, books, setBooks}) => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDeleteBook, setSelectedDeleteBook] = useState(null);

  const handleDeleteModalShow = book => {
    console.log(book);
    setShowDeleteModal(true);
    setSelectedDeleteBook(book);
  };

  function setFavoriteBook(bookId) {
    const updatedBooks = books.map(book => {
      if (book._id === bookId) {
        return {...book, favorite: !book.favorite};
      }
      return book;
    });

    setBooks(updatedBooks);
    fetch(`${consts.getBackendUrl()}/api/users/books/${bookId}/favorite`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(() => {
      if (message === 'favorite-books') {
        fetchBooks();
      }
    });
  }
  return isMobile ? (
    <MobileMiniBookCard
      book={book}
      fetchBooks={fetchBooks}
      books={books}
      setBooks={setBooks}
    />
  ) : (
    <div
      className="card elevated-card"
      key={book._id}
      style={{
        marginBottom: '0.5rem',
        backgroundColor: '#CEB289',
        color: '#5B462F',
        cursor: 'pointer',
      }}
    >
      <div className="card-body">
        <Container>
          <Row>
            <Col
              lg={2}
              className="book-details"
              style={{textAlign: 'center'}}
              onClick={() => navigate(`/home/book/${book._id}`)}
            >
              <img
                style={{maxWidth: '100%', maxHeight: '150px'}}
                className="book-img img-fluid"
                src={
                  book.imageUrl
                    ? book.imageUrl
                    : '../../../../../../assets/defaultCover.webp'
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
                        textAlign: 'end',
                        paddingRight: '3rem',
                        cursor: 'pointer',
                      }}
                      className="d-flex justify-content-end"
                    >
                      {book.favorite ? (
                        <i
                          className="bi bi-heart-fill"
                          style={{fontSize: '60px'}}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-heart"
                          style={{fontSize: '60px'}}
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
                        textAlign: 'end',
                        paddingRight: '3rem',
                        cursor: 'pointer',
                      }}
                      className="d-flex justify-content-end"
                    >
                      <i className="bi bi-trash" style={{fontSize: '60px'}}></i>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <ConfirmBookDeletionModal
            showDeleteModal={showDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setSelectedDeleteBook={setSelectedDeleteBook}
            fetchBooks={fetchBooks}
            selectedDeleteBook={selectedDeleteBook}
          />
        </Container>
      </div>
    </div>
  );
};

export default MiniBookCard;
