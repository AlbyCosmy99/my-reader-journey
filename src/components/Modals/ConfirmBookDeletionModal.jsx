import {Button, Modal} from 'react-bootstrap';
import consts from '../../consts';
import './ConfirmBookDeletionModal.css'
const ConfirmBookDeletionModal = ({
  showDeleteModal,
  setShowDeleteModal,
  setSelectedDeleteBook,
  fetchBooks,
  selectedDeleteBook,
}) => {
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
  const handleDeleteModalClose = () => {
    setShowDeleteModal(false);
    setSelectedDeleteBook(null);
    deleteBook(selectedDeleteBook._id);
  };
  return (
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
        className="modal-body"
        style={{
          backgroundColor: '#CEB289',
          color: '#402A1F',
          fontSize: '1.05rem',
          paddingTop: '1rem',
        }}
      >
        <p>
          Are you sure you want to delete{' '}
          <strong>{selectedDeleteBook?.title}</strong>?
        </p>
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
  );
};

export default ConfirmBookDeletionModal;
