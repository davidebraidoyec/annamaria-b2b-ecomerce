import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Alert, Spinner } from 'react-bootstrap';
import { DataManager } from '../../core/data-manager';
import { Helmet } from 'react-helmet';
import moment from 'moment';


export default function Entry() {

    const [errors, setErrors] = useState('');
    const { k } = useParams();
    const id = parseInt(k)

    const [data, setData] = useState(null);


    useEffect(() => {
        init()
    }, [id]);

    
    async function init() {
        var response = await DataManager.getItem('blog', id)
        if(response.success === 1) {
            console.warn(response)
            if(response.body.length > 0) {
                setData(response.body[0])
            }
            else {
                setErrors('Errore. Articolo non trovato.')
            }
        }
        else {
            setErrors('Errore. Articolo non trovato.')
        }
    }



    if (data !== null) {
        return (
            <>
                <Helmet>
                    <title>{data.title}</title>
                    <meta name="description" content={data.title} />
                </Helmet>

                <Container fluid='md' className='mt-5 mb-5'>
                    <Container fluid='sm' className='text-center'>
                        <h1 className='text-secondary'>{data.title}</h1>
                        <p className='small text-secondary'>{data.date && moment(data.date).format('DD/MM/YYYY HH:mm')}</p>
                        <div className='m-auto text-start prose' dangerouslySetInnerHTML={{ __html: data.content }}></div>
                    </Container>
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