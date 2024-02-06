import { Container, Row, Col } from "react-bootstrap";
import AddNewBookButton from "../../../Buttons/AddNewBookButton/AddNewBookButton";
import Dropdown from 'react-bootstrap/Dropdown';
import './BooksList.css'; 

export default function BooksList({message}) {
    const books = [
        {
            title:"Se questo e' un uomo",
            author: 'Primo Levi',
            img:'https://www.lafeltrinelli.it/images/9788806219352_0_536_0_75.jpg',
            favorite: true,
            description: 'descrizione1'
        },
        {
            title:"Se i gatti scomparissero dal mondo",
            author: 'Kawamura Genki',
            img:'https://www.ibs.it/images/9788806240301_0_536_0_75.jpg',
            favorite: false,
            description: 'descrizione2'
        },
    ]
    return (
        <div className="books-list-container">
            <div className="add-new-book-btn">
                <AddNewBookButton />
            </div>
            <div className="card-books-container" style={{marginLeft: '10rem', marginRight:'10rem', marginBottom:'1rem'}}>
                <div className="card" style={{maxHeight: '65vh', overflowY: 'auto', backgroundColor: '#9A7872', cursor:'pointer'}}>
                    <div className="card-header" style={{position: 'sticky', top: 0, zIndex: 1, backgroundColor: '#9A7872', textAlign:'center', color:'#2D2019'}}>
                        <Container>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center" style={{fontSize:'30px', color:'white'}}>
                                    <b>ALL MY BOOKS</b>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic" style={{fontSize: '20px'}}>
                                            Order by: TITLE
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu >
                                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>   
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="card-body" style={{backgroundColor: '#D3AD79'}}>
                        {books.map((book, index) => {
                            return (
                                <div className="card elevated-card" key={index} style={{marginBottom:'0.5rem', backgroundColor:'#CEB289', color:'#5B462F'}}>
                                    <div className="card-body">
                                        <Container>
                                            <Row>
                                                <Col lg={2} className="book-details" style={{textAlign:'center'}}>
                                                    <img style={{ maxWidth: '100%', maxHeight: '150px' }} className="book-img img-fluid" src={book.img} alt="book cover"/>
                                                </Col>
                                                <Col lg={8} className="book-details">
                                                    <h2>{book.title}</h2>
                                                    <h4>{book.author}</h4>
                                                </Col>
                                                <Col lg={2}>
                                                    <div style={{textAlign:'end', paddingRight:'3rem', cursor: 'pointer'}} className="d-flex justify-content-end">
                                                        {
                                                        book.favorite ? <i class="bi bi-heart-fill" style={{ fontSize: '60px' }}></i> :
                                                        <i class="bi bi-heart" style={{ fontSize: '60px' }}></i>
                                                        }
                                                        
                                                        
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