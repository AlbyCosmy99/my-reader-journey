import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './BookDetails.css';
import BookDetailsData from "./BookDetailsData/BookDetailsData";

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
                <Col lg={6} sm={12}> 
                    <Card style={{backgroundColor: '#CEB289'}}>
                        <Card.Img variant="top" src={id == -1 ? "https://www.lafeltrinelli.it/images/9788806219352_0_536_0_75.jpg" : "https://www.ibs.it/images/9788806240301_0_536_0_75.jpg"} alt="Book Cover" style={{ height: '80vh', objectFit: 'contain' }} />
                    </Card>
                </Col>
                <Col lg={6} sm={12}>
                    <BookDetailsData book={book}/>
                </Col>
            </Row>
        </Container>
    )
}