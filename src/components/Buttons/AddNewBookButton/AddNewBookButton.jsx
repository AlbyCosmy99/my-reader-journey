import { Button, Container, Row } from "react-bootstrap";
import './AddNewBookButton.css';

export default function AddNewBookButton() {
    return (
        <Container style={{margin: 'auto'}}>
            <Row>
                <div className="options-btn add-new-book">
                    <Button className="add-book-button">
                        ADD A NEW BOOK
                    </Button>
                </div>
            </Row>
        </Container>
    )
}