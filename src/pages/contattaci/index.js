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
import Breadcrumbs from '../../components/Breadcrumbs';


export default function Contattaci() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const { p } = useParams();
    const page = parseInt(p)

    const [data, setData] = useState({});
    const [totalPages, setTotalPages] = useState(0);


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [azienda, setAzienda] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        init()
    }, [page]);


    async function init() {
        getAzienda();
    }

    async function sendEmail() {
        const body = {
            'emailTo': email,
            'name': name,
            'surname': surname,
            'factory': azienda,
            'text': message,
        }
        var response = await ApiManager.sendAuthenticatedRequest('/custom/send_contattaci', body);
        console.log('email', response);
        if (response.success === 1) {
            navigate('/grazie');
        }

    }

    async function getAzienda() {
        var constraints = {
            "idUser": {
                "type": "value",
                "value": 6
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('customer', 1, 30, sorting, '', [], constraints)
        console.warn(response)
        if (response.success === 1) {
            setName(response.body[0].idUser.name);
            setSurname(response.body[0].idUser.surname);
            setEmail(response.body[0].idUser.email);
            setAzienda(response.body[0].ragione_sociale);
        }
    }

    function onChangeField(key, value) {
        let newArr = { ...data };
        newArr[key] = value;
        setData(newArr);
        console.log(data);
    }



    return (
        <>
            <Breadcrumbs title='Contattaci'></Breadcrumbs>
            <Container fluid='md' className='mt-5 mb-5'>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <p className="mb-5 text-center text-uppercase font-weight-light" style={{ fontSize: '28px' }}>Hai bisogno di aiuto?</p>
                        <Form>
                            <Form.Group className="mb-4" controlId="formNome">
                                <Form.Control type="text" placeholder="Nome" value={name} onChange={e => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formCognome">
                                <Form.Control type="text" placeholder="Cognome" value={surname} onChange={e => { setSurname(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Control type="email" placeholder="Email" value={email} onChange={e => { setEmail(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formCompany">
                                <Form.Control type="text" placeholder="Azienda" value={azienda} onChange={e => { setAzienda(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formMessage">
                                <Form.Control as="textarea" rows={3} type="text" placeholder="Messaggio" value={message} onChange={e => { setMessage(e.target.value) }} />
                            </Form.Group>
                            <Button variant="danger" style={{color:'white'}} className='w-100' onClick={sendEmail}>
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