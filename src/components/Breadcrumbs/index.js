import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';
import logo from '../../assets/test.svg';
import { settings } from '../../config/settings';


export default function Breadcrumbs(props) {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const { p } = useParams();
    const page = parseInt(p);

    const url = settings.ckdPath;

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        console.log(props)

    }, []);

    function goBack() {
        window.history.back();
    }


    return (
        <>
            <Container fluid='md' className='mt-3 mb-5'>
                <div className='d-flex flex-row gap-3'>
                    <div className='d-flex flex-row border border-1 rounded justify-content-center align-items-center p-2 px-3 gap-2' style={{ cursor: 'pointer' }} onClick={goBack}>
                        <FontAwesomeIcon icon='arrow-left' size='xl'></FontAwesomeIcon>
                    </div>
                    <div className='row align-items-center'>
                        <h4 className='text-uppercase mb-0'>{props.title}</h4>
                    </div>




                </div>
            </Container>
        </>
    )


};