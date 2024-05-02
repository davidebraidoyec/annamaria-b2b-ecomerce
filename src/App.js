import React, { useState, useEffect } from 'react';
import './scss/style.scss';
import './css/style.css';
import './css/header.css';
import './css/login.css';
import './css/custom.css';
//import './config/bootstrap.scss';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';


/** pages */
import Login from './pages/login/index';
import Recover from './pages/login/recover';
import Reset from './pages/login/reset';
import Logout from './pages/user/logout';
import Settings from './pages/user/settings';
import NotFound from './pages/not_found';
import License from './pages/license';
import Privacy from './pages/privacy';
import Cookie from './pages/cookie';
import Home from './pages/index';
import NotAuthorized from './pages/not_authorized';
import Entry from './pages/entry/index';
import Collection from './pages/collection/index';
import Profile from './pages/profile/index';
import Cart from './pages/cart/index';
import Soon from './pages/soon/soon';
import Congratulazioni from './pages/thanksyou/index';
import ConfermaOrdine from './pages/conferma_ordine/index';



/** core & components */
import { LanguageProvider } from './core/language-provider';
import { LoginManager } from './core/login-manager';
import { DataManager } from './core/data-manager';
import HeaderBlock from './components/BodyElements/HeaderBlock';
import FooterBlock from './components/BodyElements/FooterBlock';
import ConnectionStatus from './components/BodyElements/ConnectionStatus';


import { Helmet } from "react-helmet";
import { settings } from './config/settings';
import Contattaci from './pages/contattaci';
import Registrati from './pages/registrati';
import Dettaglio from './pages/dettaglio';
import Collezioni from './pages/collezioni';





function App() {

    library.add(fas)

    const [isLogged, setIsLogged] = useState(null);
    const [language, setLanguage] = useState('ita');
    const [userInfo, setUserInfo] = useState(null);
    const [cartItem, setCartItem] = useState(0);


    useEffect(() => {
        async function init() {
            var response = await LoginManager.checkLogin()
            console.log('checkLogin', response)
            setIsLogged(response)
            setUserInfo(LoginManager.getUserInfo());
        }

        init()
        detectSidChange()
    }, []);

    useEffect(() => {
        if(userInfo){
            getNumberCart();
        }
    }, [userInfo]);

    async function detectSidChange() {
        var sessionId = LoginManager.registerChangeSid(async function () {
            var response = await LoginManager.checkLogin()
            console.log('CheckLogin after sid changed', response)
            setIsLogged(response);
            setUserInfo(LoginManager.getUserInfo());
        })
        console.log('--- SESSION ID ' + sessionId + ' ---')
    }


    useEffect(() => {
        LanguageProvider.setCurrentLanguage(language)
    }, [language]);


    async function getNumberCart() {
        var constraints = {
            "idUser": {
                "type": "value",
                "value": userInfo.id
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('customer_cart', 1, 30, sorting, '', [], constraints)
        //console.warn(response)
        if (response.success === 1) {
            setCartItem(response.total);
        }

    }



    if (isLogged === null) {
        return (
            <>
                <p>Loading...</p>
                <ConnectionStatus />
            </>
        )
    }
    else if (isLogged === false) {
        return (
            <Router basename={'/'} >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{settings.title}</title>
                    <meta name="description" content="React application" />
                </Helmet>
                <div id='app-container'>
                    <Routes>
                        <Route exact path='/' element={<Login />} /> {/* default page */}
                        <Route exact path='/recover' element={<Recover />} />
                        <Route exact path='/reset' element={<Reset />} />
                        <Route path='/license' element={<License />} />
                        <Route path="*" element={<NotFound />} /> {/* 404 page */}
                        <Route path='/registrati' element={<Registrati />} />
                        <Route path='/congratulazioni' element={<Registrati />} />
                        
                    </Routes>
                </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </Router>
        )
    }
    else {
        if (userInfo && userInfo.authorized === 1) {
            return (
                <Router basename={'/'}>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{settings.title}</title>
                        <meta name="description" content="React application" />
                    </Helmet>
                    <Container fluid  id="main-container" className=' px-0'>
                        <HeaderBlock cartItem={cartItem} setCartItem={setCartItem}/>
                        <div id='app-container'>
                            <Routes>
                                <Route path="*" element={<NotFound />} /> {/* 404 page */}
                                <Route exact path='/' element={<Home />} /> {/* default page */}
                                <Route path='/license' element={<License />} />
                                <Route path='/privacy' element={<Privacy />} />
                                <Route path='/cookie' element={<Cookie />} />
                                <Route path='/logout' element={<Logout />} />
                                <Route path='/settings' element={<Settings />} />
                                <Route path='/collezione/:k' element={<Collection />} />
                                <Route path='/contattaci' element={<Contattaci />} />
                                <Route path='/profile' element={<Profile />} />
                                <Route path='/cart' element={<Cart cartItem={cartItem} setCartItem={setCartItem}/>} />
                                <Route path='/dettaglio/:k'  element={<Dettaglio cartItem={cartItem} setCartItem={setCartItem}/>} />
                                <Route path='/soon' element={<Soon />} />
                                <Route path='/collezioni' element={<Collezioni />} />
                                <Route path='/grazie' element={<Congratulazioni />} />
                                <Route path='/invio_riuscito' element={<ConfermaOrdine />} />



                                
                                <Route path="/entry/:k" element={<Entry />} />
                            </Routes>
                        </div>
                        <FooterBlock />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </Container>
                </Router>
            );
        }
        else {
            return (
                <Router basename={'/'}>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>{settings.title}</title>
                        <meta name="description" content="React application" />
                    </Helmet>
                    <Container fluid  id="main-container" className='pt-2'>
                        <HeaderBlock />
                        <div id='app-container'>
                            <Routes>
                                <Route path="*" element={<NotAuthorized />} /> {/* 404 page */}
                                <Route exact path='/' element={<NotAuthorized />} /> {/* default page */}
                            </Routes>
                        </div>
                        <FooterBlock />
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </Container>
                </Router>
            );
        }

    }

}

export default App;