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
import Breadcrumbs from '../../components/Breadcrumbs';



export default function Collection() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');

    const { k } = useParams();
    const id = parseInt(k);

    const url = settings.ckdPath;

    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [linea, setLinea] = useState(3);
    const [title, setTitle] = useState('');


    useEffect(() => {
        init();
    }, [id]);


    async function init() {

        var constraints = {
            'idLine': {
                type: "value",
                value: id
            }
        }
        var sorting = {
            'field': 'code',
            'order': 'asc'
        }

        var response = await DataManager.searchItems('model', 1, 30, sorting, '', [], constraints)
        if (response.success === 1) {
            console.log(response.body)
            setData(response.body);
            setTotalPages(response.pages)
            setTitle(response.body[0].idLine.name)
        }
        else {
            setErrors('Errore. Riprova più tardi.')
        }
    }

    return (
        <>
            <Breadcrumbs title={title}></Breadcrumbs>
            <Container fluid='md' className='mt-5 mb-5'>
                <div className='container'>
                    <div className='row row-cols-4'>
                        {data.map(item => {
                            return (
                                <Link to={`/dettaglio/${item.id}`}>
                                    <div className='flex flex-col' key={item.id}>
                                        <Image src={url + 'upload/' + item.photo.entity + '/' + item.photo.hash + '.' + item.photo.extension} style={{ width: '100%' }} className='mb-1' />
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>

                </div>
            </Container>
        </>
    )


};