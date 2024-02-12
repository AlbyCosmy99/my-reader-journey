import { Button, Col, Container, Row } from "react-bootstrap";
import './UserOptions.css';
import Welcome from "../Welcome/Welcome";
import { useNavigate } from "react-router-dom";
import AddNewBookButton from "../../../Buttons/AddNewBookButton/AddNewBookButton";

export default function UserOptions() {
    const navigate = useNavigate();

    return (
        <>
            <div className="options-container">
                <Welcome />
                <Container style={{margin: 'auto'}}>
                    <Row>
                        <Col lg={12} className="options-btn" onClick={() => navigate('add-book')}>
                            <AddNewBookButton />
                        </Col>
                        <Col lg={12} className="options-btn">
                            <Button onClick={() => navigate('all-my-books')}>
                                ALL MY BOOKS
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn">
                            <Button onClick={() => navigate('books-read')}>
                                BOOKS READ
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn">
                            <Button onClick={() => navigate('books-to-read')}>
                                BOOKS TO READ
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn">
                            <Button onClick={() => navigate('favorite-books')}>
                                FAVORITE BOOKS
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn">
                            <Button className="folders-btn" onClick={() => navigate('top-rating-books')}>
                                10/10 RATING BOOKS
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}