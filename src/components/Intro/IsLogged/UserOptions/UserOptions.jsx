import { Button, Col, Container, Row } from "react-bootstrap";
import './UserOptions.css';
import Welcome from "../Welcome/Welcome";
import { useNavigate } from "react-router-dom";

export default function UserOptions() {
    const navigate = useNavigate();
    const navigateTo = (url) => {
        navigate(`/${url}`);
    }
    return (
        <>
            <div className="options-container">
                <Welcome />
                <Container style={{margin: 'auto'}}>
                    <Row>
                        <Col lg={12} className="options-btn">
                            <Button className="add-book-button">
                                ADD A NEW BOOK
                            </Button>
                        </Col>
                        <Col lg={12} className="options-btn" onClick={() => navigateTo('all-my-books')}>
                            <Button>
                                ALL MY BOOKS
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn" onClick={() => navigateTo('books-read')}>
                            <Button>
                                BOOKS READ
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn" onClick={() => navigateTo('books-to-read')}>
                            <Button>
                                BOOKS TO READ
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn">
                            <Button>
                                FAVORITE BOOKS
                            </Button>
                        </Col>
                        <Col lg={6} className="options-btn">
                            <Button className="folders-btn">
                                FOLDERS
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}