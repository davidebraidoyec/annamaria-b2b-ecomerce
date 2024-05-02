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


export default function Congratulazioni() {

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



    



    return (
        <>
           
            
        </>
    )


};