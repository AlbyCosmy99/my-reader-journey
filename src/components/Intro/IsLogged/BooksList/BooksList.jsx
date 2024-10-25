import './BooksList.css';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import consts from "../../../../consts";
import { Col, Container, Dropdown, Row, Spinner } from 'react-bootstrap';
import AddNewBookButton from '../../../Buttons/AddNewBookButton/AddNewBookButton';

export default function BooksList() {
    const navigate = useNavigate()
    const [books,setBooks] = useState([])
    const [loading,setLoading] = useState(false)
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy'))

    const [searchParams] = useSearchParams()
    const message = searchParams.get('message')
    const sectionTitle = searchParams.get('sectionTitle')

    function fetchBooks() {
        setLoading(true)
        fetch(`${consts.getBackendUrl()}/api/users/books?filter=${message}&sortBy=${sortBy}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(res => {
            setBooks(res)
            console.log(res)
            setLoading(false)
        })
    }

    useEffect(() => {
        if(!message && !sectionTitle) {
            navigate('/home')
            return
        }
        fetchBooks() 
    },[message, sectionTitle])

    function handleSelect(selection) {
        localStorage.setItem('sortBy', selection)
        setSortBy(localStorage.getItem('sortBy'))
        fetchBooks()
    }

    function deleteBook(bookId) {
        fetch(`${consts.getBackendUrl()}/api/users/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(() => {
           fetchBooks()
        });
    }

    function setFavoriteBook(bookId) {
        const updatedBooks = books.map(book => {
            if (book._id === bookId) {
                return { ...book, favorite: !book.favorite }; 
            }
            return book; 
        });
    
        setBooks(updatedBooks); 
        fetch(`${consts.getBackendUrl()}/api/users/books/${bookId}/favorite`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(() => {
            if(message === 'favorite-books') {
                fetchBooks()
            }
        })   
    }
    

    return (
        loading ? 
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Spinner animation="border" role="status" style={{ width: "8rem", height: "8rem", color:'orange' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> : 
        <div className="books-list-container">
            <div className="add-new-book-btn" onClick={() => navigate('/home/add-book')}>
                <AddNewBookButton />
            </div>
            <div className="card-books-container">
                <div className="card" style={{maxHeight: '65vh', overflowY: 'scroll', backgroundColor: '#9A7872'}}>
                    <div className="card-header" style={{position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#9A7872', textAlign:'center', color:'#2D2019'}}>
                        <Container>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center" style={{fontSize:'30px', color:'white'}}>
                                    <b>{sectionTitle}</b>
                                </Col>
                                {books.length > 0 ? 
                                <Col className="d-flex justify-content-center align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{fontSize: '20px'}}>
                                            Order by: {sortBy}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                        <Dropdown.Item eventKey="title" onClick={() => handleSelect('title')}>Title</Dropdown.Item>
                                        <Dropdown.Item eventKey="author" onClick={() => handleSelect('author')}>Author</Dropdown.Item>
                                        <Dropdown.Item eventKey="genre" onClick={() => handleSelect('genre')}>Genre</Dropdown.Item>
                                        <Dropdown.Item eventKey="language" onClick={() => handleSelect('language')}>Language</Dropdown.Item>
                                        <Dropdown.Item eventKey="pages" onClick={() => handleSelect('pages')}>Pages</Dropdown.Item>
                                        <Dropdown.Item eventKey="rating" onClick={() => handleSelect('rating')}>Rating</Dropdown.Item>
                                        <Dropdown.Item eventKey="readingStartDate" onClick={() => handleSelect('startReadingDate')}>Reading start date</Dropdown.Item>
                                        <Dropdown.Item eventKey="readingEndDate" onClick={() => handleSelect('endReadingDate')}>Reading end date</Dropdown.Item>
                                        <Dropdown.Item eventKey="dateAdded" onClick={() => handleSelect('dateAdded')}>Date you added the book</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>   
                                </Col> : ''}
                            </Row>
                        </Container>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#D3AD79'}}>
                        {books.length > 0 ? books.map((book, index) => (
                            <div className="card elevated-card" key={index} style={{marginBottom:'0.5rem', backgroundColor:'#CEB289', color:'#5B462F',cursor:'pointer'}}>
                                <div className="card-body">
                                    <Container>
                                        <Row>
                                            <Col lg={2} className="book-details" style={{textAlign:'center'}} onClick={() => navigate(`/home/book/${book._id}`)}>
                                                <img style={{ maxWidth: '100%', maxHeight: '150px' }} className="book-img img-fluid" src={book.imageUrl ? book.imageUrl : '../../../../../../assets/defaultCover.webp'} alt="book cover"/>
                                            </Col>
                                            <Col lg={7} className="book-details" onClick={() => navigate(`/home/book/${book._id}`)}>
                                                <h2>{book.title}</h2>
                                                <h4>{book.author}</h4>
                                            </Col>
                                            <Col lg={3}>
                                                <Container>
                                                    <Row>
                                                        <Col lg={6} className="book-icons">
                                                        <div onClick={() => setFavoriteBook(book._id)} style={{textAlign:'end', paddingRight:'3rem', cursor: 'pointer'}} className="d-flex justify-content-end">
                                                            {book.favorite ? <i className="bi bi-heart-fill" style={{ fontSize: '60px' }}></i> :
                                                            <i className="bi bi-heart" style={{ fontSize: '60px' }}></i>}
                                                        </div>
                                                        </Col>
                                                        <Col lg={6} className="book-icons" onClick={() => deleteBook(book._id)}>
                                                            <div style={{textAlign:'end', paddingRight:'3rem', cursor: 'pointer'}} className="d-flex justify-content-end">
                                                                <i className="bi bi-trash"style={{fontSize: '60px'}}></i>
                                                            </div>
                                                            
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </div>
                        )) : 
                        <div className="d-flex justify-content-center align-items-center" style={{height: '100%'}}>
                            <div className="card" style={{width: '18rem', color:'#733c0f',backgroundColor: '#D3AD79', textAlign:'center'}}>
                                <div className="card-body">
                                    <h5 className="card-title">No books available.</h5>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
