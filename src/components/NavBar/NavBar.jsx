import {useState, useEffect, useRef} from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './NavBar.css';
import {useNavigate, Link} from 'react-router-dom';
import consts from '../../consts';

function NavBar() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [books, setBooks] = useState([]);

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = `${consts.getFrontendUrl()}`;
  };

  const handleSearchChange = event => {
    const value = event.target.value;
    fetch(`${consts.getBackendUrl()}/api/users/books?take=5`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        setBooks(
          res.books.filter(book =>
            book.title.toLowerCase().includes(value.toLowerCase()),
          ),
        );
      });
    setSearchValue(value);
    setShowSearchDropdown(value.length > 0);
  };

  const navigatetoBook = bookId => {
    setSearchValue('');
    navigate(`/home/book/${bookId}`);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar-color">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to={consts.getFrontendUrl() + '/home'}
          className="logo text-light"
        >
          <span className="logo-reader">My</span>Reader
          <span className="logo-journey">Journey</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll
          />

          <Form className="d-flex position-relative">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-field"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
            {showSearchDropdown && books.length > 0 && searchValue !== '' && (
              <Dropdown.Menu
                show={true}
                style={{position: 'absolute', left: 0, top: '100%'}}
              >
                {books.map((book, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => navigatetoBook(book._id)}
                  >
                    {book.title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}

            <div ref={dropdownRef}>
              <Dropdown
                align="end"
                show={showDropdown}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  style={{color: 'white'}}
                >
                  <i
                    className="bi bi-person-circle"
                    style={{margin: '1rem', cursor: 'pointer'}}
                  ></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
