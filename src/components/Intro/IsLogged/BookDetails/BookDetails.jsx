import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './BookDetails.css';
import BookDetailsData from "./BookDetailsData/BookDetailsData";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import consts from "../../../../consts";

export default function BookDetails() {
    const { id } = useParams()
    const [book,setBook] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${consts.getBackendUrl()}/api/users/books/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(res => {
            setBook(res['book'][0])
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
        <Container style={{marginTop:'1rem', marginBottom:'1rem'}}>
            <Row>
                <Col lg={4} sm={12}> 
                    <Card style={{backgroundColor: '#CEB289'}}>
                        <Card.Img variant="top" src={book.imageUrl} />
                    </Card>
                </Col>
                <Col lg={8} sm={12}>
                    <BookDetailsData book={book}/>
                </Col>
            </Row>
        </Container>
    )
}