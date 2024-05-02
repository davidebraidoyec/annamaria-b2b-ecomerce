import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, FloatingLabel, Button, Alert, Row, Col } from 'react-bootstrap';
import { LanguageProvider } from '../../core/language-provider';
import { LoginManager } from '../../core/login-manager';
import loginBg from '../../assets/login.jpg';


export default function Login() {

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        var response = await LoginManager.login(username, password, 1);
        console.log(response)
        if (response.success === 0) {
            setErrors(response.message)
        }else {
            navigate('/');
        }
    }
    function registrati(){
        navigate('/registrati');
    }

    return (
        <>

            <Container fluid='md' className='mt-5 mb-5'>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <h3 className="mb-4 text-center text-uppercase">{LanguageProvider.get('forms.accedi')}</h3>
                        <p className='text-center'>{LanguageProvider.get('forms.accedi_subtitle')}</p>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Control type="email" placeholder="Indirizzo email" onChange={e => setUserName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <div className="mb-3 mt-2">
                                <Form.Check type="checkbox" label={LanguageProvider.get('login.remember')} />
                            </div>
                            <Button variant="danger" style={{color:'white'}} type="submit" className='w-100'>
                                {LanguageProvider.get('buttons.accedi')}
                            </Button>
                            <div className="text-center mt-1">
                                <Link to="/recover">{LanguageProvider.get('login.forgot')}</Link>
                            </div>
                        </Form>
                        {errors.length > 0 &&
                            <Alert variant='danger'>
                                {errors}
                            </Alert>
                        }
                        <hr className='my-5 mx-5'></hr>
                        <Container className='text-center'>
                            <p className='text-center'>{LanguageProvider.get('forms.accedi_footer')}</p>
                            <Button variant="danger" style={{color:'white'}} onClick={registrati}>
                                {LanguageProvider.get('buttons.registrati')}
                            </Button>
                        </Container>
                    </Col>
                    <Col md="4"></Col>
                </Row>
            </Container>
        </>
    );
};