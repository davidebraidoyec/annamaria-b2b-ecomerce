import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Button, Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LanguageProvider } from '../../core/language-provider';
import { LoginManager } from '../../core/login-manager';
import { Helmet } from 'react-helmet';



export default function Logout() {

    let navigate = useNavigate();


    async function handleSubmit() {
        var response = await LoginManager.logout();
        navigate('/')
    }


    return (
        <>
            <Helmet>
                <title>Logout?</title>
            </Helmet>

            <Container fluid='sm' className='mt-5 mb-5'>

                <Container fluid className='mt-5 mb-5 text-secondary' style={{maxWidth:600}}>
                    <h3>{LanguageProvider.get('logout.title')}</h3>
                    <p className='lead'>{LanguageProvider.get('logout.subtitle')}</p>
                    <Button className="me-2" onClick={handleSubmit} variant='danger' size='lg'>{LanguageProvider.get('logout.confirm')}</Button>
                    <Link to="/"><Button variant='primary' size='lg'>Torna alla home</Button></Link>
                </Container>

            </Container>
        </>
    );
};