import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink} from "react-router-dom";
const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to='/' className='navbar-brand'>Quizzet</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className='nav-link'>Home</NavLink>
            <NavLink to="admin" className='nav-link'>Admin</NavLink>
            <NavLink to="user" className='nav-link'>User</NavLink>
            
          </Nav>
          <Nav>
            <button className='btnLogin'>Login</button>
            <button className='btnSignUp'>Sign up</button>
          </Nav>
          {/* <Nav>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Logout
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav> */}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;