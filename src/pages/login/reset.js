import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap';
import { LanguageProvider } from '../../core/language-provider';
import { LoginManager } from '../../core/login-manager';
import loginBg from '../../assets/login.jpg';


export default function Reset() {

    const navigate = useNavigate();
    const [key, setKey] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        let response = await LoginManager.resetPassword(key, password, confirmPassword)

        console.log(response)
        if (response.success === 1) {
            navigate('/')
        }
    }

    return (
        <Container fluid id="login-container" style={{"backgroundImage": `url('${loginBg}')`}}>
            <div className="form-recover">
                <Form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-2">
                        <h3>{LanguageProvider.get('login.reset_password')}</h3>
                        <p>{LanguageProvider.get('login.insert_password_key')}</p>
                    </div>

                    <FloatingLabel label={LanguageProvider.get('login.password_key')} className="mb-3">
                        <Form.Control type="text" placeholder="key" onChange={e => setKey(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label={LanguageProvider.get('login.new_password')} className="mb-3">
                        <Form.Control type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                    </FloatingLabel>

                    <FloatingLabel label={LanguageProvider.get('login.confirm_new_password')} className="mb-3">
                        <Form.Control type="password" placeholder="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FloatingLabel>

                    <Button variant="primary" size="lg" type="submit">{LanguageProvider.get('login.confirm_reset')}</Button>
                </Form>
                <div className="text-center mt-3">
                    <Link to="/">{LanguageProvider.get('login.back_to_login')}</Link>
                </div>
            </div>
        </Container>
    );
};