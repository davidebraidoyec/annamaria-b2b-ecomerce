import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';
import { ApiManager } from '../../core/api-manager';


export default function Registrati() {

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
    }, [page]);



    async function handleRegister() {
        const body = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            phone: phone
        }
        console.log(body);

        const response = await ApiManager.sendRequest('/public/do_register', body);
        console.log(response); 
        navigate('/');
    }



    return (
        <>
            <Helmet>
                <title>{page}</title>
            </Helmet>

            <Container fluid='md' className='mt-5 mb-5'>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <h3 className="mb-4 text-center text-uppercase">{LanguageProvider.get('forms.registrati')}</h3>
                        <p className='text-center'>{LanguageProvider.get('forms.registrati_subtitle')}</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formNome">
                                <Form.Control type="text" placeholder="Nome" onChange={e => setUserName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCognome">
                                <Form.Control type="text" placeholder="Cognome" onChange={e => setUserSurname(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Control type="email" placeholder="Email" onChange={e => setUserEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTelefono">
                                <Form.Control type="text" placeholder="Telefono" onChange={e => setUserPhone(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Control type="password" placeholder="Password" onChange={e => setUserPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="danger" className='w-100' style={{color:'white'}} onClick={handleRegister}>
                                {LanguageProvider.get('buttons.invia')}
                            </Button>
                        </Form>
                    </Col>
                    <Col md="4"></Col>
                </Row>


            </Container>
        </>
    )


};