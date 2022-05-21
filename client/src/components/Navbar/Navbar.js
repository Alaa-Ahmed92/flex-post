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
import brandWhiteLogo from '../../assets/images/logo-white.png';
import {
    LogoutIcon
} from '@heroicons/react/outline';
import FindUser from '../FindUser/FindUser';

const NavbarMenu = (props) => {
    const { logoutUser } = props;
    const jwt = isAuthenticated();
    const photoUrl = jwt && jwt.user && jwt.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${jwt.user._id}?${new Date().getTime()}` : `/user/photo/defaultphoto`;

    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={brandWhiteLogo} alt="Flux Post" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <FindUser />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className='nav-link' to="/">Home</Link>
                        {jwt ? (
                            <NavDropdown title={<img src={photoUrl} alt={jwt.user && jwt.user.name} onError={i => i.target.src = `/user/photo/defaultphoto`} />}>
                                <Link className='dropdown-item userProfile' to={`/user/${jwt.user._id}`}>
                                    <div className='navImgInfo'>
                                        <img src={photoUrl} alt={jwt.user && jwt.user.name} onError={i => i.target.src = `/user/photo/defaultphoto`} />
                                    </div>
                                    <div className='navUserInfo'>
                                        <h6>{jwt.user.name}</h6>
                                        <span>View Profile</span>
                                    </div>
                                </Link>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutUser}><LogoutIcon /> <span>Logout</span></NavDropdown.Item>
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