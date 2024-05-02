import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, FloatingLabel, Button, Spinner } from 'react-bootstrap';
import { LanguageProvider } from '../../core/language-provider';
import { LoginManager } from '../../core/login-manager';
import loginBg from '../../assets/login.jpg';


export default function Recover() {

    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [sending, setSending] = useState(0)

    async function handleSubmit(e) {
        e.preventDefault();
        setSending(1)
        let response = await LoginManager.recoverPassword(username)
        setSending(0)

        if (response.success === 1) {
            navigate('/reset')
        }
    }

    return (
        <Container fluid id="login-container" style={{"backgroundImage": `url('${loginBg}')`}}>
            <div className="form-recover">
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-2">
                        <h3>{LanguageProvider.get('login.forgot')}</h3>
                    </div>

                    <FloatingLabel label={LanguageProvider.get('login.username')} className="mb-3">
                        <Form.Control type="text" placeholder="name@example.com" onChange={e => setUserName(e.target.value)} />
                    </FloatingLabel>
 
                    {sending === 1 ? (
                        <Button variant="primary" size="lg" disabled>
                            {LanguageProvider.get('login.send_forgot_password_key')}
                            <Spinner size="sm" className='ms-3' />
                        </Button>
                    ) : (
                        <Button variant="primary" size="lg" type="submit">{LanguageProvider.get('login.send_forgot_password_key')}</Button>
                    )}
                </Form>
                <div className="text-center mt-3">
                    <Link to="/">{LanguageProvider.get('login.back_to_login')}</Link>
                </div>
            </div>
        </Container>
    );
};