import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LanguageProvider } from '../core/language-provider';
import notfound from '../assets/404.png';
import { Helmet } from 'react-helmet';


export default function NotAuthorized() {
    return (
        <>
            <Helmet>
                <title>Non autorizzato</title>
            </Helmet>
            <Container fluid='sm' className='mt-5 mb-5 text-secondary'>
                
                <Row className='pt-4 align-items-center'>
                    <Col xs={12} lg={6}>
                        <img src={notfound} width={'100%'} />
                    </Col>
                    <Col xs={12} lg={6}>
                        <h1>Ops!</h1>
                        <p className='lead'>Non sei ancora stato approvato.</p>
                        
                    </Col>
                </Row>

            </Container>
        </>
    );
};