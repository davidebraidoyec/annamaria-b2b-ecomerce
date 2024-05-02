import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Container, Offcanvas, Nav, Navbar, NavDropdown, Image, Row, Col, Badge } from 'react-bootstrap';
import { LanguageProvider } from '../../../core/language-provider';
import { LoginManager } from '../../../core/login-manager';
import avatars from '../../../core/avatar';
import logo from '../../../assets/logo.svg';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigation } from 'swiper/modules';
import { DataManager } from '../../../core/data-manager';


export default function HeaderBlock(props) {

    const [userInfo, setUserInfo] = useState(null);
    const [cart, setCart] = useState(0);
    const [dropVisible, setDropVisible] = useState(false);

    let location = useLocation();

    useEffect(() => {
        console.log('location: ', location)
        var element = document.getElementById("app-container");
        element.setAttribute("data-page", location.pathname);
    }, [location]);


    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);

        var headerOffcanvas = document.getElementById("responsive-header-navbar");
        if (headerOffcanvas.classList.contains('show')) {
            console.log('closing menu')
            var closeBtn = document.querySelector("#responsive-header-navbar .offcanvas-header .btn-close");
            closeBtn.click()
        }


    }, [location.pathname]);


    useEffect(() => {
        async function init() {
            var u = LoginManager.getUserInfo()
            setUserInfo(u)
            console.log(u)
        }
        init()
    }, []);




    return (
        <>
            <Navbar expand="lg" collapseOnSelect sticky="top" id="header-navbar" className='bg-white text-secondary p-3 border-bottom'>
                <Container fluid={'md'} >
                    <Navbar.Brand>
                        <Link to='/'>
                            <Image src={logo} height={30}  />
                        </Link>

                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-header-navbar" />

                    <Navbar.Offcanvas id="responsive-header-navbar" placement="end" className='text-secondary'>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>
                                Ciao, {userInfo && userInfo.username}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="me-auto" id="header-menu">
                                <Nav.Link as={Link} className={location && location.pathname === '/soon' && 'text-danger'} to="/soon">Home&Living</Nav.Link>
                                <NavDropdown title="Fashion"  autoClose='outside'>
                                    <div className='d-flex flex-row justify-content-around p-3 gap-5' style={{ width: '400px' }}>
                                        <div className='flex flex-col gap-3'>
                                            <p>Nuova Collezione</p>
                                            <p className='fw-light text-uppercase'><Link to='collezione/4' style={{ textDecoration: 'none', color: 'black' }} onClick={() => setDropVisible(false)}>Annamaria</Link></p>
                                            <p className='fw-light text-uppercase'><Link to='collezione/3' style={{ textDecoration: 'none', color: 'black' }} onClick={() => setDropVisible(false)}>Amamitoo</Link></p>
                                        </div>
                                        <div className='flex flex-col gap-3'>
                                            <p>Fuori Collezione</p>
                                            <p className='fw-light text-uppercase'><Link to='collezione/7' style={{ textDecoration: 'none', color: 'black' }} onClick={() => setDropVisible(false)}>Annamaria</Link></p>
                                            <p className='fw-light text-uppercase'><Link to='collezione/6' style={{ textDecoration: 'none', color: 'black' }} onClick={() => setDropVisible(false)}>Amamitoo</Link></p>
                                        </div>
                                    </div> 



                                </NavDropdown>
                                <Nav.Link as={Link} className={location && location.pathname === '/contattaci' && 'text-danger'} to="/contattaci">
                                    Contattaci
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to='/profile' className={location && location.pathname === '/profile' && 'text-danger'}>
                                    <FontAwesomeIcon className='ms-1' icon={'user'} size={'lg'}></FontAwesomeIcon>
                                </Nav.Link>
                                <Nav.Link as={Link} to='/cart' className={location && location.pathname === '/cart' && 'text-danger'}>
                                    <FontAwesomeIcon className='ms-1' icon={'cart-shopping'} size={'lg'}>

                                    </FontAwesomeIcon>
                                    <Badge pill bg="danger">
                                        {props.cartItem}
                                    </Badge>
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};