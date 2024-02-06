import { Container, Row, Col } from "react-bootstrap";
import AddNewBookButton from "../../../Buttons/AddNewBookButton/AddNewBookButton";
import Dropdown from 'react-bootstrap/Dropdown';
import './BooksList.css'; 

export default function BooksList({message}) {
    const books = [5,3,5,2,6,3,3,5,1,6,8,5,3,4,6,6,6,6,5,43,32,3]
    return (
        <div className="books-list-container">
            <div className="add-new-book-btn">
                <AddNewBookButton />
            </div>
            <div style={{marginLeft: '10rem', marginRight:'10rem'}}>
                <div className="card" style={{maxHeight: '65vh', overflowY: 'auto'}}>
                    <div className="card-header" style={{position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white', textAlign:'center'}}>
                        <Container>
                            <Row>
                                <Col>
                                    ALL MY BOOKS
                                </Col>
                                <Col>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Order by: TITLE
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>   
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="card-body">
                        {books.map((book, index) => {
                            return (
                                <div className="card elevated-card" key={index} style={{marginBottom:'0.5rem'}}>
                                    <div className="card-body">
                                        <Container>
                                            <Row>
                                                <Col lg={3} className="book-details" style={{textAlign:'center'}}>
                                                    <img style={{ maxWidth: '100%', maxHeight: '150px' }} className="book-img img-fluid" src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt="book cover"/>
                                                </Col>
                                                <Col lg={3} className="book-details">
                                                    <h2>TITOLO</h2>
                                                    <h4>AUTORE</h4>
                                                </Col>
                                                <Col lg={6}>
                                                    <div style={{textAlign:'end', paddingRight:'3rem'}} className="d-flex justify-content-end">
                                                        <i class="bi bi-heart" style={{ fontSize: '60px' }}></i>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}