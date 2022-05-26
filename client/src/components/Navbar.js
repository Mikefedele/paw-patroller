import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Auth from '../utils/auth';
import '../Navbar.css';
import logo from '../paw2.png';

const AppNavbar = () => {

  return (
    <>
      <Navbar bg='white' variant='light' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
          <img
          src={logo}
          width="50"
          height="50"
          alt='paw patroller logo'
        />
        <h3>PAW PATROLLER</h3>
        <h6>Dog Friendly Business Search</h6>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/me' onClick='location.reload()'>
                    {Auth.getProfile().data.username}'s profile
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                  <>
                  <Nav.Link as={Link} to='/login'>
                    Login
                  </Nav.Link>
                    <Nav.Link as={Link} to='/signup'>
                      Sign Up
                    </Nav.Link>
                    </>
              )}
              
            </Nav>
          </Navbar.Collapse>
         
        </Container>
      </Navbar>
      
    </>
  );
};

export default AppNavbar;
