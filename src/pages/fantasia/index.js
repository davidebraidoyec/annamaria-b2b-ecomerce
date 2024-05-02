import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';


export default function Fantasia() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const { p } = useParams();
    const page = parseInt(p)

    const [data, setData] = useState(null);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        init()
    }, [page]);


    async function init() {
        var constraints = {
            "public": {
                "type": "value",
                "value": 1
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('blog', page, 30, sorting, '', [], constraints)
        console.warn(response)
        if (response.success === 1) {
            setData(response.body)
            setTotalPages(response.pages)
        }
        else {
            setErrors('Errore. Riprova più tardi.')
        }
    }

    function changePage(p) {
        navigate('/blog/' + p)
    }

    function goToPrevPage() {
        if (page > 1) {
            changePage(page - 1)
        }
    }
    function goToNextPage() {
        if (page < totalPages) {
            changePage(page + 1)
        }
    }
    function goToFirstPage() {
        if (page !== 1) {
            changePage(1)
        }
    }
    function goToLastPage() {
        if (page !== totalPages) {
            changePage(totalPages)
        }
    }

    function openEntry(item) {
        navigate('/entry/' + item.id)
    }


    if (data !== null) {
        return (
            <>
                <Helmet>
                    <title>{'Blog - ' + page}</title>
                </Helmet>

                <Container fluid='md' className='mt-5 mb-5'>
                    <Row className='flex flex-row text-left'>

                        <div className='flex flex-col'>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item active>{LanguageProvider.get('header.collection')}</Breadcrumb.Item>
                            </Breadcrumb>
                            <h3 className='text-secondary'>{LanguageProvider.get('header.collection')}</h3>
                        </div>

                    </Row>
                    <Row className='mt-5 mb-5'>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                </Container>
            </>
        )
    }
    else {
        return (
            <Container fluid='md' className='mt-5 mb-5'>
                {errors.length > 0 &&
                    <Alert variant='danger'>
                        {errors}
                    </Alert>
                }
                <div className='text-center p-5'>
                    <Spinner animation="border" variant="secondary" />
                    <p className='text-secondary'>Loading</p>
                </div>
            </Container>
        )
    }
};