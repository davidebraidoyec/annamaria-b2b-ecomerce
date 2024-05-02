import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';
import { ApiManager } from '../../core/api-manager';
import Breadcrumbs from '../../components/Breadcrumbs';


export default function Collezioni() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const { p } = useParams();
    const page = parseInt(p)

    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    const [name, setUserName] = useState('');
    const [surname, setUserSurname] = useState('');
    const [email, setUserEmail] = useState('');
    const [phone, setUserPhone] = useState('');
    const [password, setUserPassword] = useState('');


    useEffect(() => {
    }, []);







    return (
        <>
        <Breadcrumbs title='Collezioni'></Breadcrumbs>
            <Container fluid='md' className='mt-5 mb-5 d-flex flex-column gap-5' style={{ height: '100%' }}>
                <h3>Nuova collezione</h3>
                <Row className='d-flex flex-row justify-content-around align-items-center text-center'>
                    <Col lg='4' style={{ height: '100%' }}>
                        <Link to='/collezione/4' style={{ textDecoration: 'none' }}>
                            <Card style={{ height: '100%' }} body className='text-uppercase py-3' as='h3'>Annamaria</Card>
                        </Link>
                    </Col>
                    <Col lg='4' style={{ height: '100%' }}>
                        <Link to='/collezione/3' style={{ textDecoration: 'none' }}>
                            <Card style={{ height: '100%' }} body className='text-uppercase py-3' as='h3'>Amamitoo</Card>
                        </Link>
                    </Col>
                </Row>
                <h3>Fuori collezione</h3>
                <Row className='d-flex flex-row justify-content-around align-items-center text-center' >
                    <Col lg='4' style={{ height: '100%' }}>
                        <Link to='/collezione/7' style={{ textDecoration: 'none' }}>
                            <Card style={{ height: '100%' }} body className='text-uppercase py-3' as='h3'>Annamaria</Card>
                        </Link>
                    </Col>
                    <Col lg='4' style={{ height: '100%' }}>
                        <Link to='/collezione/6' style={{ textDecoration: 'none' }}>
                            <Card style={{ height: '100%' }} body className='text-uppercase py-3' as='h3'>Amamitoo</Card>
                        </Link>
                    </Col>

                </Row>
            </Container>

        </>
    )


};