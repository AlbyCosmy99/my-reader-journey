import {Button, Container, Row} from 'react-bootstrap';
import './AddNewBookButton.css';

export default function AddNewBookButton({text = 'ADD A NEW BOOK'}) {
  return (
    <Container style={{margin: 'auto'}}>
      <Row>
        <div className="options-btn add-new-book">
          <Button className="add-book-button">{text}</Button>
        </div>
      </Row>
    </Container>
  );
}
