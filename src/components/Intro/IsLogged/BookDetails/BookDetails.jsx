import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import './BookDetails.css';
import BookDetailsData from "./BookDetailsData/BookDetailsData";
import { useEffect, useState } from "react";
import backendUrlPath from "../../../../backendUrlPath";

export default function BookDetails() {
    const { id } = useParams()
    const [book,setBook] = useState({})

    useEffect(() => {
        fetch(`${backendUrlPath}/api/users/books/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(res => {
            setBook(res['book'][0])
        })
    },[])

    return (
        <Container style={{marginTop:'1rem', marginBottom:'1rem'}}>
            <Row>
                <Col lg={6} sm={12}> 
                    <Card style={{backgroundColor: '#CEB289'}}>
                        <Card.Img variant="top" src={book.imageUrl} />
                    </Card>
                </Col>
                <Col lg={6} sm={12}>
                    <BookDetailsData book={book}/>
                </Col>
            </Row>
        </Container>
    )
}