import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown
} from 'react-bootstrap';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/loginActions';
import { isAuthenticated } from '../../helpers/auth-helper';
import { getUserSelector } from '../../selectors/userSelector';

const NavbarMenu = (props) => {
    const { logoutUser, user } = props;
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Flux Post</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to="/">Home</Link>
                        {isAuthenticated() ? (
                            <NavDropdown title={isAuthenticated().user.name}>
                                <Link className='dropdown-item' to={`/user/${isAuthenticated().user._id}`}>Profile</Link>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        ) : <>
                            <Link className='nav-link' to="/login">Login</Link>
                            <Link className='nav-link' to="/register">Register</Link>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

const mapStateToProps = state => ({
    login: state.login,
    user: getUserSelector(state)
});

export default connect(mapStateToProps, { logoutUser })(NavbarMenu);