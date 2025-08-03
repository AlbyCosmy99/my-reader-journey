import {Button, Col, Container, Row} from 'react-bootstrap';
import './UserOptions.css';
import Welcome from '../Welcome/Welcome';
import {useNavigate} from 'react-router-dom';
import AddNewBookButton from '../../../Buttons/AddNewBookButton/AddNewBookButton';

export default function UserOptions() {
  const navigate = useNavigate();

  return (
    <>
      <div className="options-container">
        <Welcome />
        <Container style={{margin: 'auto'}}>
          <Row>
            <Col
              lg={12}
              className="options-btn"
              onClick={() => navigate('add-book')}
            >
              <AddNewBookButton />
            </Col>
            <Col lg={12} className="options-btn">
              <Button
                onClick={() =>
                  navigate(
                    'books-list?message=all-my-books&sectionTitle=ALL MY BOOKS',
                  )
                }
              >
                ALL MY BOOKS
              </Button>
            </Col>
            <Col lg={6} className="options-btn">
              <Button
                onClick={() =>
                  navigate(
                    'books-list?message=books-read&sectionTitle=BOOKS READ',
                  )
                }
              >
                BOOKS READ
              </Button>
            </Col>
            <Col lg={6} className="options-btn">
              <Button
                onClick={() =>
                  navigate(
                    'books-list?message=books-to-read&sectionTitle=BOOKS TO READ',
                  )
                }
              >
                BOOKS TO READ
              </Button>
            </Col>
            <Col lg={6} className="options-btn">
              <Button
                onClick={() =>
                  navigate(
                    'books-list?message=favorite-books&sectionTitle=FAVORITE BOOKS',
                  )
                }
              >
                FAVORITE BOOKS
              </Button>
            </Col>
            <Col lg={6} className="options-btn">
              <Button
                className="folders-btn"
                onClick={() =>
                  navigate(
                    'books-list?message=top-rating-books&sectionTitle=10/10 RATING BOOKS',
                  )
                }
              >
                10/10 RATING BOOKS
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
