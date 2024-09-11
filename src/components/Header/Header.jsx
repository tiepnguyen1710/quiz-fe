import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from "react-redux"
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate} from "react-router-dom";
import { logout } from '../../services/apiService';
import { doLogout } from '../../redux/action/userAction';
const Header = () => {
  const account = useSelector(state => state.user.account);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  //console.log("acc, ", account , ", " , isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const handleBtnLogin = () => {
    navigate("/login");
  }

  const handleBtnRegister = () => {
    navigate("/register");
  }

  const handleLogout = async () => {
    const res = await logout(account.email, account.refresh_token);
    console.log(res);

    if(res && res.EC === 0){
      dispatch(doLogout());
      navigate("/login");
    }
  }

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
          {
            isAuthenticated ? 
            
            <Nav>
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>
                      Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            :
            <Nav>
            <button className='btnLogin' onClick={() => handleBtnLogin()}>Login</button>
            <button className='btnSignUp' onClick={() => handleBtnRegister()}>Sign up</button>
            </Nav>

          }
          
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