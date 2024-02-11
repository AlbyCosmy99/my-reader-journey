import { Container, Row, Col } from "react-bootstrap";
import AddNewBookButton from "../../../Buttons/AddNewBookButton/AddNewBookButton";
import Dropdown from 'react-bootstrap/Dropdown';
import './BooksList.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import backendUrlPath from "../../../../backendUrlPath";
import Spinner from 'react-bootstrap/Spinner';

export default function BooksList({message}) {
    const navigate = useNavigate();
    const [books,setBooks] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${backendUrlPath}/api/users/books?filter=${message}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(res => {
            setBooks(res)
            setLoading(false)
        })
    },[])

    return (
        loading ? 
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Spinner animation="border" role="status" style={{ width: "8rem", height: "8rem", color:'orange' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> : 
        <div className="books-list-container">
            <div className="add-new-book-btn">
                <AddNewBookButton />
            </div>
            <div className="card-books-container">
                <div className="card" style={{maxHeight: '65vh', overflowY: 'auto', backgroundColor: '#9A7872'}}>
                    <div className="card-header" style={{position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#9A7872', textAlign:'center', color:'#2D2019'}}>
                        <Container>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center" style={{fontSize:'30px', color:'white'}}>
                                    <b>ALL MY BOOKS</b>
                                </Col>
                                {books.length > 0 ? 
                                <Col className="d-flex justify-content-center align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{fontSize: '20px'}}>
                                            Order by: TITLE
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu >
                                            <Dropdown.Item href="#/action-1">Title</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Author</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Genre</Dropdown.Item>
                                            <Dropdown.Item href="#/action-1">Language</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Pages</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
                                            <Dropdown.Item href="#/action-1">Reading start date</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Reading end date</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Date you added the book</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>   
                                </Col> : ''}
                            </Row>
                        </Container>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#D3AD79'}}>
                        {books.length > 0 ? books.map((book, index) => (
                            <div className="card elevated-card" key={index} onClick={() => navigate(`/books/${book._id}`)} style={{marginBottom:'0.5rem', backgroundColor:'#CEB289', color:'#5B462F',cursor:'pointer'}}>
                                <div className="card-body">
                                    <Container>
                                        <Row>
                                            <Col lg={2} className="book-details" style={{textAlign:'center'}}>
                                                <img style={{ maxWidth: '100%', maxHeight: '150px' }} className="book-img img-fluid" src={book.imageUrl} alt="book cover"/>
                                            </Col>
                                            <Col lg={8} className="book-details">
                                                <h2>{book.title}</h2>
                                                <h4>{book.author}</h4>
                                            </Col>
                                            <Col lg={2}>
                                                <div style={{textAlign:'end', paddingRight:'3rem', cursor: 'pointer'}} className="d-flex justify-content-end">
                                                    {book.favorite ? <i className="bi bi-heart-fill" style={{ fontSize: '60px' }}></i> :
                                                    <i className="bi bi-heart" style={{ fontSize: '60px' }}></i>}
                                                </div>
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