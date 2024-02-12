import React, { useState } from 'react';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import './AddBook.css';
import backendUrlPath from '../../../../backendUrlPath';
import { jwtDecode } from 'jwt-decode';
import Spinner from 'react-bootstrap/Spinner';

export default function AddBook() {
    const [title,setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [language, setLanguage] = useState('')
    const [publishingHouse, setPublishingHouse] = useState('')
    const [pages, setPages] = useState(0)
    const [price, setPrice] = useState('')
    const [isbn, setIsbn] = useState('')
    const [publicationDate, setPublicationDate] = useState(Date.now())
    const [read, setRead] = useState(false)
    const [toRead, setToRead] = useState(false)
    const [reading, setReading] = useState(false)
    const [rating,setRating] = useState(6)
    const [favorite, setFavorite] = useState(false)
    const [loaned, setLoaned] = useState(false)
    const [borrowed, setBorrowed] = useState(false)
    const [readingStartDate, setReadingStartDate] = useState(Date.now())
    const [readingEndDate, setReadingEndDate] = useState(Date.now())
    const [dateAdded, setDateAdded] = useState(Date.now())
    const [description, setDescription] = useState('')
    const [notes, setNotes] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const [loading, setLoading] = useState(false)


    function addBook(event) {
        setLoading(true)
        const token = localStorage.getItem('jwt');
        let payload = null;
        if (token) {
            try {
              payload = jwtDecode(token);
            } catch (error) {
              console.error("Failed to decode token", error);
              localStorage.removeItem('jwt')
              window.location.reload()
            }
        } else {
            localStorage.removeItem('jwt')
            window.location.reload()
        }
        const userId = payload.id

        const book = {
            title: title,
            notes: null,
            dateAdded: "2024-02-12T00:54:33.605Z",
            userId: userId
        }

        if(read) {
            book.read = read
        }
        if(toRead) {
            book.toRead = toRead
        }
        if(favorite) {
            book.favorite = favorite
        }
        if(imageUrl) {
            book.imageUrl = imageUrl
        }
        if(borrowed) {
            book.borrowed = borrowed
        }
        if(readingStartDate) {
            book.startReadingDate = readingStartDate
        }
        if(readingEndDate) {
            book.endReadingDate = readingEndDate
        }
        if(publicationDate) {
            book.publicationDate = publicationDate
        }
        if(isbn) {
            book.isbn = isbn
        }
        if(genre) {
            book.genre = genre
        }
        if(publishingHouse) {
            book.publishing_house = publishingHouse
        }
        if(pages) {
            book.pages = pages
        }
        if(price) {
            book.price = price
        }
        if(rating) {
            book.rating = rating
        }
        if(language) {
            book.language = language
        }
        if(description) {
            book.description = description
        }
        if(notes) {
            book.notes = notes
        }
        if(dateAdded) {
            book.dateAdded = dateAdded
        }

        event.preventDefault()
        console.log(book)
        fetch(`${backendUrlPath}/api/users/books`, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(() => {
            window.history.back()
            setLoading(false)
        })
    }
    return(
        loading ? 
        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Spinner animation="border" role="status" style={{ width: "8rem", height: "8rem", color:'orange' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> : 
        <Container className="d-flex align-items-center justify-content-center mt-5 mb-5" style={{ minHeight: "100vh"}}>
            <div className="card-container w-100" style={{ maxWidth: "600px" }}>
                <Card className="card-custom">
                    <Card.Body>
                        <h1 style={{fontSize: '31px', textAlign:'center',color:'white', backgroundColor:'#E05880'}}>Add a new book!</h1>
                        <Form onSubmit={event => addBook(event)}>
                            <Container>
                                <Row>
                                    <Col lg={6}>
                                        <Form.Group id="title">
                                            <Form.Label style={{ color: '#FF7F00' }}>Title*</Form.Label>
                                            <Form.Control type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="author">
                                            <Form.Label style={{ color: '#FF7F00' }}>Author</Form.Label>
                                            <Form.Control type="text"  value={author} onChange={(e) => setAuthor(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="genre">
                                            <Form.Label style={{ color: '#FF7F00' }}>Genre</Form.Label>
                                            <Form.Control type="text"  value={genre} onChange={(e) => setGenre(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="language">
                                            <Form.Label style={{ color: '#FF7F00' }}>Language</Form.Label>
                                            <Form.Control type="text"  value={language} onChange={(e) => setLanguage(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="imageUrl">
                                            <Form.Label style={{ color: '#FF7F00' }}>Image Url</Form.Label>
                                            <Form.Control type="text"  value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="publishingHouse">
                                            <Form.Label style={{ color: '#FF7F00' }}>publishing house</Form.Label>
                                            <Form.Control type="text"  value={publishingHouse} onChange={(e) => setPublishingHouse(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="pages">
                                            <Form.Label style={{ color: '#FF7F00' }}>Pages</Form.Label>
                                            <Form.Control type="number"  value={pages} onChange={(e) => setPages(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="price">
                                            <Form.Label style={{ color: '#FF7F00' }}>Price</Form.Label>
                                            <Form.Control type="text"  value={price} onChange={(e) => setPrice(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="isbn">
                                            <Form.Label style={{ color: '#FF7F00' }}>ISBN</Form.Label>
                                            <Form.Control type="text"  value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="publicationDate">
                                            <Form.Label style={{ color: '#FF7F00' }}>Publication Date</Form.Label>
                                            <Form.Control type="date"  value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="read">
                                            <Form.Label style={{ color: '#FF7F00', display: 'block', marginBottom: '10px' }}>Read</Form.Label>
                                            <Form.Check 
                                                type="checkbox"
                                                checked={read} 
                                                onChange={(e) => setRead(e.target.checked)}
                                                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="toRead">
                                            <Form.Label style={{ color: '#FF7F00', display: 'block', marginBottom: '10px' }}>To Read</Form.Label>
                                            <Form.Check 
                                                type="checkbox"
                                                checked={toRead} 
                                                onChange={(e) => setToRead(e.target.checked)}
                                                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }} 
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="reading">
                                            <Form.Label style={{ color: '#FF7F00', display: 'block', marginBottom: '10px' }}>Reading</Form.Label>
                                            <Form.Check 
                                                type="checkbox"
                                                checked={reading} 
                                                onChange={(e) => setReading(e.target.checked)}
                                                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group id="rating">
                                            <Form.Label style={{ color: '#FF7F00' }}>Rating</Form.Label>
                                            <div>
                                                {[...Array(10)].map((_, index) => (
                                                    <Form.Check
                                                        inline
                                                        label={index + 1}
                                                        type="radio"
                                                        name="rating"
                                                        key={index}
                                                        id={`rating-${index + 1}`}
                                                        value={index + 1}
                                                        checked={rating === index + 1}
                                                        onChange={(e) => setRating(Number(e.target.value))}
                                                        style={{ marginLeft: '10px' }}
                                                    />
                                                ))}
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="favorite">
                                            <Form.Label style={{ color: '#FF7F00', display: 'block', marginBottom: '10px' }}>Favorite</Form.Label>
                                            <Form.Check 
                                                type="checkbox"
                                                checked={favorite} 
                                                onChange={(e) => setFavorite(e.target.checked)}
                                                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="loaned">
                                            <Form.Label style={{ color: '#FF7F00', display: 'block', marginBottom: '10px' }}>Loaned</Form.Label>
                                            <Form.Check 
                                                type="checkbox"
                                                checked={loaned} 
                                                onChange={(e) => setLoaned(e.target.checked)}
                                                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="borrowed">
                                            <Form.Label style={{ color: '#FF7F00', display: 'block', marginBottom: '10px' }}>Borrowed</Form.Label>
                                            <Form.Check 
                                                type="checkbox"
                                                checked={borrowed} 
                                                onChange={(e) => setBorrowed(e.target.checked)}
                                                style={{ marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="readingStartDate">
                                            <Form.Label style={{ color: '#FF7F00' }}>Reading start date</Form.Label>
                                            <Form.Control type="date"  value={readingStartDate} onChange={(e) => setReadingStartDate(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="readingEndDate">
                                            <Form.Label style={{ color: '#FF7F00' }}>Reading end date</Form.Label>
                                            <Form.Control type="date"  value={readingEndDate} onChange={(e) => setReadingEndDate(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6}>
                                        <Form.Group id="dateAdded">
                                            <Form.Label style={{ color: '#FF7F00' }}>Date Book was added</Form.Label>
                                            <Form.Control type="date"  value={dateAdded} onChange={(e) => setDateAdded(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group id="description">
                                            <Form.Label style={{ color: '#FF7F00' }}>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                style={{ resize: 'vertical' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={12}>
                                        <Form.Group id="notes">
                                            <Form.Label style={{ color: '#FF7F00' }}>Notes</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                style={{ resize: 'vertical' }}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col lg={6} className='mt-3'>
                                        <Button className="w-100 mb-3 login-btn" type="submit">Add book</Button>
                                    </Col>
                                    <Col lg={6} className='mt-3'>
                                        <Button style={{backgroundColor:'red'}} className="w-100 mb-3 login-btn back-btn" type="button" onClick={() => window.history.back()}>Back</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}