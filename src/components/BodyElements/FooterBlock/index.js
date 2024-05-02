import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Image, Row } from 'react-bootstrap';
import logo from '../../../assets/logo.svg';
import { LanguageProvider } from '../../../core/language-provider';


export default function FooterBlock() {

    useEffect(() => {

    }, []);



    return (
        <>
            <Container id="footer" fluid className='p-3 bg-black'>
                <Row lg={3}>
                    <Col>
                        <Image src={logo} width={200} className='mb-2' />
                        <div className='d-grid gap-0'>
                            <p className='text-white text-uppercase mb-0'>P.IVA {LanguageProvider.get('footer.iva')}</p>
                            <p className='text-white text-uppercase mb-0'>{LanguageProvider.get('footer.via')}</p>
                            <p className='text-white text-uppercase mb-0'>{LanguageProvider.get('footer.citta')}, {LanguageProvider.get('footer.provincia')}</p>
                            <p className='text-white text-uppercase mb-0'>{LanguageProvider.get('footer.stato')}</p>
                        </div>
                    </Col>
                    <Col></Col>
                    <Col></Col>

                </Row>

            </Container>
        </>
    )
};