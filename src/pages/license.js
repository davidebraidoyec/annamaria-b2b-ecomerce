import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumb, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LanguageProvider } from '../core/language-provider';
import logoYec from '../assets/yec.svg';
import { Helmet } from 'react-helmet';


export default function License() {
    return (
        <>
            <Helmet>
                <title>License</title>
            </Helmet>

            <Container fluid='md' className='mt-5 mb-5'>

                <Container fluid className='text-center mt-5 mb-5 text-secondary'>
                    <Image src={logoYec} width='180' className='mb-5' />
                    <p className='lead'>GRUPPO YEC è una Tech Company specializzata nello sviluppo di soluzioni digitali innovative e nella promozione online di top brand.</p>
                    <p className='lead'><a target="_blank" href="https://gruppoyec.com">https://gruppoyec.com</a></p>
                    <a target="_blank" href="https://gruppoyec.com"><Button variant="primary" className='m-1'>Visita il nostro sito</Button></a>
                    <a target="_blank" href="https://gruppoyec.com/contact"><Button variant="success" className='m-1'>Contattaci</Button></a>
                </Container>

                <hr/>

                <Container fluid className='text-center mt-5 mb-5 text-secondary'>
                    <p>Questo framework è sviluppato da Gruppo Yec srl.<br/>Version 2.0.07428 - Build 02/05/2023</p>
                </Container>

            </Container>
        </>
    );
};