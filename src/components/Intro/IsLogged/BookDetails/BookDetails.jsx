import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './BookDetails.css';
import AddNewBookButton from "../../../Buttons/AddNewBookButton/AddNewBookButton";

export default function BookDetails() {
    const { id } = useParams()
    const book = {
        id: -1,
        title:"Se questo e' un uomo",
        author: 'Primo Levi',
        img:'https://www.lafeltrinelli.it/images/9788806219352_0_536_0_75.jpg',
        favorite: true,
        description: 'descrizione1'
    };

    return (
        <Container style={{marginTop:'1rem', marginBottom:'1rem'}}>
            <Row>
                <Col lg={12} style={{margin:'inherit'}}>
                    <Button className="w-100" style={{textAlign:'center', margin: '1rem'}}>EDIT BOOK</Button>
                </Col>
                <Col>
                    <Card style={{backgroundColor: '#CEB289'}}>
                        <Card.Img variant="top" src={id == -1 ? "https://www.lafeltrinelli.it/images/9788806219352_0_536_0_75.jpg" : "https://www.ibs.it/images/9788806240301_0_536_0_75.jpg"} alt="Book Cover" style={{ height: '80vh', objectFit: 'contain' }} />
                    </Card>
                </Col>
                <Col>
                    <Card style={{backgroundColor: '#CEB289', color:'#5B462F'}}>
                        <Card.Body>
                            <div style={{textAlign:'center'}}>
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}