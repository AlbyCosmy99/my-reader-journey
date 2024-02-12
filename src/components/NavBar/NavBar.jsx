import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import frontendUrlPath from '../../frontendUrlPath';
import './NavBar.css';
import backendUrlPath from '../../backendUrlPath';

function NavBar() {
  const [searchValue, setSearchValue] = useState(''); // State to keep track of search input
  const [showSearchDropdown, setShowSearchDropdown] = useState(false); // State to control the visibility of the search dropdown
  const [showDropdown, setShowDropdown] = useState(false);
  const [books, setBooks] = useState([])
  
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    window.location.href = `${frontendUrlPath}`;
  };

  // Function to handle changes in the search input
  const handleSearchChange = (event) => {
    const value = event.target.value;
    fetch(`${backendUrlPath}/api/users/books?take=5`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
    .then(res => res.json())
    .then(res => {
        setBooks(res.filter(book => book.title.toLowerCase().includes(searchValue.toLowerCase())))
    })
    setSearchValue(value);
    setShowSearchDropdown(value.length > 0); 
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar-color">
      <Container fluid>
        <Navbar.Brand className='logo' href={frontendUrlPath} style={{color:'#5B462F', backgroundColor: 'orange', border:'2px solid #CEB289', borderRadius:'10%'}}>MY READER JOURNEY</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
          </Nav>
          <Form className="d-flex position-relative">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-field"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
            {showSearchDropdown && books.length > 0 && (
              <Dropdown.Menu show={true} style={{ position: 'absolute', left: 0, top: '100%' }}>
                {books.map((book, index) => (
                  <Dropdown.Item key={index} onClick={() => window.location.href = `${frontendUrlPath}/books/${book._id}`}>{book.title}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            )}
            <Dropdown align="end" show={showDropdown} onClick={() => setShowDropdown(!showDropdown)}>
                <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ color: 'white' }}>
                  <i className="bi bi-person-circle" style={{ margin: '1rem', cursor: 'pointer' }}></i>
                </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
