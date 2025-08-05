import {useState} from 'react';
import {Button, Col, Container, Modal, Row} from 'react-bootstrap';
import consts from '../../consts';
import {useNavigate, useSearchParams} from 'react-router-dom';

const MiniBookCard = ({book, fetchBooks, books, setBooks}) => {
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

  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedDeleteBook(null);
    deleteBook(selectedDeleteBook._id);
  };

  function deleteBook(bookId) {
    fetch(`${consts.getBackendUrl()}/api/users/books/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(() => {
      fetchBooks();
    });
  }

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
  return (
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
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
            backdrop="static"
            keyboard={false}
            backdropClassName="custom-backdrop"
          >
            <Modal.Header
              closeButton
              style={{
                backgroundColor: '#9A7872',
                color: '#fff',
                borderBottom: 'none',
              }}
            >
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                backgroundColor: '#CEB289',
                color: '#402A1F',
                fontSize: '1.05rem',
                paddingTop: '1rem',
              }}
            >
              Are you sure you want to delete{' '}
              <strong>{selectedDeleteBook?.title}</strong>?
            </Modal.Body>
            <Modal.Footer
              style={{
                backgroundColor: '#D3AD79',
                borderTop: 'none',
                justifyContent: 'flex-end',
                boxShadow: '0px -2px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <Button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  backgroundColor: '#A67C52',
                  color: '#fff',
                  borderColor: '#8C6239',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = '#8C6239';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#A67C52';
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteModalClose}
                style={{
                  backgroundColor: '#B02E2E',
                  borderColor: '#861F1F',
                  color: 'white',
                  marginLeft: '0.5rem',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s ease-in-out',
                }}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = '#861F1F';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#B02E2E';
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default MiniBookCard;
