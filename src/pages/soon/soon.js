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


export default function Soon() {

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


        const response = await ApiManager.sendRequest('/public/do_register', body)
        console.log(response);
    }



    return (
        <>
        <Breadcrumbs title='Home&Living'></Breadcrumbs>
            <div className='d-flex flex-row justify-content-center' style={{ width: '100%', height: '100%', marginTop: '200px' }}>
                <div className='d-flex flex-column gap-3 align-items-center' style={{height: '100%'}}>
                    <h1 className='text-uppercase'>Presto diponibile</h1>
                    <h5>Nel frattempo dai un'occhiata all'area Fashion</h5>
                    <Button variant='danger' as={Link} to='/collezioni' style={{color:'white'}}>Scopri ora</Button>
                </div>

            </div>



        </>
    )


};