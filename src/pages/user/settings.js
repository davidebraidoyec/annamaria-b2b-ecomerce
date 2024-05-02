import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Tab, Nav, Row, Col, Card, Form, FloatingLabel, Button, Image } from 'react-bootstrap';
import { LanguageProvider } from '../../core/language-provider';
import { DataManager } from '../../core/data-manager';
import { LoginManager } from '../../core/login-manager';
import avatars from '../../core/avatar';
import { Helmet } from 'react-helmet';


export default function Settings() {

    const [userInfo, setUserInfo] = useState({});
    const [data, setData] = useState(null);
    const [errors, setErrors] = useState('');


    useEffect(() => {
        async function init() {
            var res = LoginManager.getUserInfo()
            setUserInfo(res)
            console.warn(res)
            var response = await DataManager.getItem('user', res.id)
            if(response.success === 1) {
                var userData = response.body[0];
                setData(userData)
                setName(userData.name)
                setSurname(userData.surname)
            }
            else {
                setErrors(response.error.message)
            }
        }

        init()  
    }, []);

    useEffect(() => {
        if(userInfo.avatar) {
            setAvatar(userInfo.avatar)
        } 
    }, [userInfo]);

    
    //general
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [errorsGeneral, setErrorsGeneral] = useState('');
    const [successGeneral, setSuccessGeneral] = useState('');

    async function handleSubmitGeneral(e) {
        e.preventDefault();
        var body = {
            name: name,
            surname: surname
        }
        var response = await LoginManager.updateProfile(body)
        if(response.success === 0) {
            setErrorsGeneral(response.error.message)
            setSuccessGeneral('')
        }
        else {
            setSuccessGeneral(LanguageProvider.get('settings.general_success'))
            setErrorsGeneral('')
            setTimeout(() => {
                setSuccessGeneral('')
            }, "5000")
        }
    }

    //security
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorsSecurity, setErrorsSecurity] = useState('');
    const [successSecurity, setSuccessSecurity] = useState('');

    async function handleSubmitSecurity(e) {
        e.preventDefault();

        if(newPassword === '' || newPassword !== confirmPassword) {
            setErrorsSecurity(LanguageProvider.get('settings.passwords_match_error'))
            setSuccessSecurity('')
        }
        else {
            var response = await LoginManager.changePassword(password, newPassword, confirmPassword)
            if(response.success === 0) {
                setErrorsSecurity(response.message)
                setSuccessSecurity('')
            }
            else {
                setSuccessSecurity(LanguageProvider.get('settings.general_success'))
                setErrorsSecurity('')
                setTimeout(() => {
                    setSuccessSecurity('')
                }, "5000")
            }
        }
    }

    //avatar
    const [avatar, setAvatar] = useState('');
    const [errorsAvatar, setErrorsAvatar] = useState('');
    const [successAvatar, setSuccessAvatar] = useState('');

    async function handleSubmitAvatar(e) {
        e.preventDefault();
        var body = {
            avatar: avatar
        }
        var response = await LoginManager.updateProfile(body)
        if(response.success === 0) {
            setErrorsAvatar(response.message)
            setSuccessAvatar('')
        }
        else {
            setSuccessAvatar(LanguageProvider.get('settings.avatar_success'))
            setErrorsAvatar('')
            setTimeout(() => {
                setSuccessAvatar('')
                window.location.reload(true)
            }, "1000")
        }
    }

    
    if (data !== null) {
        return (
            <>
                <Helmet>
                    <title>{LanguageProvider.get('settings.user_settings')}</title>
                </Helmet>
            
                <Container fluid="md" className='mt-5 mb-5 text-secondary'>
                    <h3 className='text-center'>{LanguageProvider.get('settings.user_settings')}</h3>

                    <Container fluid className='mt-5 mb-5'>
                        <Tab.Container defaultActiveKey="first">
                            <Row>
                                <Col md={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">{LanguageProvider.get('settings.avatar')}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">{LanguageProvider.get('settings.general')}</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">{LanguageProvider.get('settings.security')}</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col md={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <Card bg="light">
                                                <Card.Body>
                                                    <Form>
                                                        <div className='row'>
                                                        {avatars.map((item, i) => {
                                                        return(
                                                            <div key={i} className="mb-3 mb-3 col-md-4 col-sm-6">
                                                                <Form.Check
                                                                    id={i} 
                                                                    value={i}
                                                                    type="radio"
                                                                    label={
                                                                        <Image src={item} width={50} height={50} />
                                                                    }
                                                                    onChange={e => setAvatar(i)}
                                                                    checked={avatar*1 === i}
                                                                />
                                                            </div>
                                                        )
                                                        })}
                                                        </div>
                                                    </Form>

                                                    <div className="mt-4 mb-3 text-center">
                                                        <Button onClick={handleSubmitAvatar} className="btn-block" variant="primary" type="submit">{LanguageProvider.get('settings.avatar_save', 'Save')}</Button>
                                                    </div>

                                                    {errorsAvatar.length > 0 &&
                                                        <Alert variant='danger'>
                                                            {errorsAvatar}
                                                        </Alert>
                                                    }
                                                    {successAvatar.length > 0 &&
                                                        <Alert variant='success'>
                                                            {successAvatar}
                                                        </Alert>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <Card bg="light">
                                                <Card.Body>
                                                    <Form onSubmit={handleSubmitGeneral}>
                                                        <FloatingLabel className='mb-3' label={LanguageProvider.get('settings.name', 'Name')}>
                                                            <Form.Control value={name} type="text" onChange={e => setName(e.target.value)} />
                                                        </FloatingLabel>

                                                        <FloatingLabel className='mb-3' label={LanguageProvider.get('settings.surname', 'Surname')}>
                                                            <Form.Control value={surname} type="text" onChange={e => setSurname(e.target.value)} />
                                                        </FloatingLabel>
                                                    
                                                        <div className="mt-4 mb-3 text-center">
                                                            <Button className="btn-block" variant="primary" type="submit">{LanguageProvider.get('settings.general_save', 'Save')}</Button>
                                                        </div>

                                                        {errorsGeneral.length > 0 &&
                                                            <Alert variant='danger'>
                                                                {errorsGeneral}
                                                            </Alert>
                                                        }
                                                        {successGeneral.length > 0 &&
                                                            <Alert variant='success'>
                                                                {successGeneral}
                                                            </Alert>
                                                        }
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <Card bg="light">
                                                <Card.Body>
                                                    <Form onSubmit={handleSubmitSecurity}>
                                                        <FloatingLabel className='mb-3' label={LanguageProvider.get('settings.password', 'Password')}>
                                                            <Form.Control value={password} type="password" onChange={e => setPassword(e.target.value)} />
                                                        </FloatingLabel>

                                                        <FloatingLabel className='mb-3' label={LanguageProvider.get('settings.new_password', 'New password')}>
                                                            <Form.Control value={newPassword} type="password" onChange={e => setNewPassword(e.target.value)} />
                                                        </FloatingLabel>

                                                        <FloatingLabel className='mb-3' label={LanguageProvider.get('settings.confirm_password', 'Confirm password')}>
                                                            <Form.Control value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} />
                                                        </FloatingLabel>
                                                    
                                                        <div className="mt-4 mb-3 text-center">
                                                            <Button className="btn-block" variant="primary" type="submit">{LanguageProvider.get('settings.security_save', 'Save')}</Button>
                                                        </div>

                                                        {errorsSecurity.length > 0 &&
                                                            <Alert variant='danger'>
                                                                {errorsSecurity}
                                                            </Alert>
                                                        }
                                                        {successSecurity.length > 0 &&
                                                            <Alert variant='success'>
                                                                {successSecurity}
                                                            </Alert>
                                                        }
                                                    </Form>
                                                </Card.Body>
                                            </Card>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Container>
                </Container>
            </>
        );
    }
    else {
        return (
            <Container fluid="md" className='mt-5 mb-5'>
                {errors.length > 0 &&
                    <Alert variant='danger'>
                        {errors}
                    </Alert>
                }
                <div className='text-center p-5'>
                    <Spinner animation="border" variant="primary" />
                    <p className='text-primary'>{LanguageProvider.get('defaults.loading')}</p>
                </div>
            </Container>
        )
    }
};