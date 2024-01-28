import { Button, Col, Container, Row } from "react-bootstrap";
import './Home.css';
import Welcome from "../Welcome/Welcome";

export default function Home() {
    return (
        <>
            <div className="home-container">
                <Welcome />
                <Container style={{margin: 'auto'}}>
                    <Row>
                        <Col lg={12} className="home-btn">
                            <Button className="add-book-button">
                                ADD A NEW BOOK
                            </Button>
                        </Col>
                        <Col lg={12} className="home-btn">
                            <Button>
                                ALL MY BOOKS
                            </Button>
                        </Col>
                        <Col lg={6} className="home-btn">
                            <Button>
                                BOOKS READ
                            </Button>
                        </Col>
                        <Col lg={6} className="home-btn">
                            <Button>
                                BOOKS TO READ
                            </Button>
                        </Col>
                        <Col lg={6} className="home-btn">
                            <Button>
                                FAVORITE BOOKS
                            </Button>
                        </Col>
                        <Col lg={6} className="home-btn">
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