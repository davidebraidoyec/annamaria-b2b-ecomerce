import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LanguageProvider } from '../core/language-provider';
import { Helmet } from 'react-helmet';


export default function Cookie() {
    return (
        <>
            <Helmet>
                <title>Cookie Policy</title>
            </Helmet>

            <Container fluid='md' className='mt-5 mb-5'>

                <Container fluid className='mt-5 mb-5 text-secondary'>
                    <h2>Cookie Policy</h2>

                    <Link to="/">
                        <Button variant='primary' size={'lg'}>{LanguageProvider.get('defaults.back_to_home')}</Button>
                    </Link>
                </Container>

            </Container>
        </>
    );
};