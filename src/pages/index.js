import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Alert, Spinner, Image, Row, Col, Button } from 'react-bootstrap';
import { LanguageProvider } from '../core/language-provider';
import { LoginManager } from '../core/login-manager';
import PromoSlider from '../components/PromoSlider';
import banner from '../assets/banner.png'
import { height } from '@fortawesome/free-solid-svg-icons/fa0';


export default function Home() {

    const [userInfo, setUserInfo] = useState(null);
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();


    useEffect(() => {

        async function init() {
            var u = LoginManager.getUserInfo()
            setUserInfo(u)
        }

        init()
    }, []);





    if (userInfo !== null) {
        return (
            <div style={{ position: 'relative', height: 'calc(100vh - 55px)' }}>
                <img src={banner} style={{ width: '100%', height:'100%' }}></img>
                <div style={{ position: 'absolute', zIndex: '500', top: '36%', left: '5%', width:'300px' }} className='d-flex flex-column'>
                    <h3>STA ARRIVANDO HOME&LIVING</h3>
                    <p>Presto disponibile la nuovissima area Home&Living</p>
                    <Button variant='danger' style={{color:'white'}} disabled>In arrivo</Button>
                </div>
                <div style={{ position: 'absolute', zIndex: '500', top: '36%', left: '70%', textAlign:'right', width:'350px' }} className='d-flex flex-column justify-content-end'>
                    <h3>NUOVA COLLEZIONE FASHION!!!</h3>
                    <p>DA OGGI é disponibile una nuovissima collezione! Corri a vederla</p>
                    <Button as={Link} to='/collezioni' variant='danger' style={{color:'white'}}>Scopri di più</Button>
                </div>

            </div>



        )
    }
    else {
        return (
            <Container fluid="md" className='mt-5 mb-5'>
                <div className='text-center p-5'>
                    <Spinner animation="border" variant="primary" />
                    <p className='text-primary'>{LanguageProvider.get('defaults.loading')}</p>
                </div>
            </Container>
        )
    }
};