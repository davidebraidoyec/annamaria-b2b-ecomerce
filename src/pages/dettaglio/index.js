import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';
import logo from '../../assets/test.svg';
import { settings } from '../../config/settings';
import { LoginManager } from '../../core/login-manager';
import { HeaderBlock } from '../../components/BodyElements/HeaderBlock/index';
import e from 'cors';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../components/Breadcrumbs';



export default function Dettaglio(props) {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const [success, setSuccess] = useState('');
    const { k } = useParams();
    const id = parseInt(k);
    const [userInfo, setUserInfo] = useState();

    const url = settings.ckdPath;

    const [data, setData] = useState([]);
    const [model, setModel] = useState(null);
    const [fantasy, setFantasy] = useState(null);
    const [taglia, setTaglia] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [price, setPrice] = useState(null);
    const [codeVariant, setCodeVariant] = useState();
    const [path, setPath] = useState();
    const [title, setTitle] = useState('');


    const [variant, setVariant] = useState(false);
    const [dataVariant, setDataVariant] = useState([]);


    useEffect(() => {
        init();
        getUserInfo();
    }, []);

    useEffect(() => {
        if (taglia !== null && price !== null) {
            addCart();
        }
    }, [taglia, price])

    

    function getUserInfo() {
        var u = LoginManager.getUserInfo()
        setUserInfo(u)
    }


    async function init() {
        var constraints = {
            "idModel": {
                "type": "value",
                "value": id
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('product', 1, 30, sorting, '', [], constraints)

        console.warn(response.body)
        if (response.success === 1) {
            setData(response.body);
            setTitle(response.body[0].idModel.name)
        }
        else {
            setErrors('Errore. Riprova più tardi.')
        }
    }



    async function getVariant(idFantasy) {
        setPath(url + 'upload/' + data[0].idModel.photo.entity + '/' + data[0].idModel.photo.hash + '.' + data[0].idModel.photo.extension);

        var constraints = {
            "idModel": {
                "type": "value",
                "value": id
            },
            "idFantasy": {
                "type": "value",
                "value": idFantasy
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('product', 1, 30, sorting, '', [], constraints)
        const data1 = response.body;
        if (response.success === 1) {
            setDataVariant(response.body);
            setVariant(true);
            setModel(data1[0].idModel.code);
            setFantasy(data1[0].idFantasy.codice);
        }
        else {
            setErrors('Errore. Riprova più tardi.')
        }
    }

    async function setDataCart() {
        var constraints = {
            "codice": {
                "type": "value",
                "value": codeVariant
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('variant', 1, 30, sorting, '', [], constraints);

        if (response.success === 1) {
            setTaglia(response.body[0].taglia);
            setPrice(parseFloat(response.body[0].priceList));


        }

    }

    async function addCart() {
        
        const dataCarrello = {
            'idUser': { 'id': userInfo.id },
            'model': model,
            'fantasy': fantasy,
            'variant': taglia,
            'code': codeVariant,
            'quantity': parseFloat(quantity),
            'listPrice': price,
            'price': (price * parseFloat(quantity)),
            'image': path

        }
        console.log(dataCarrello);
        var response = await DataManager.insertItem('customer_cart', dataCarrello);
        console.log(response);
        if (response.success === 1) {
            //setSuccess('Articolo aggiunto al carrello!');
            //setErrors('');
            toast.success('Articolo aggiunto con successo', {theme: 'colored'});
            props.setCartItem(props.cartItem + 1);
        }

    }




    return (
        <>
        <Breadcrumbs title={title}></Breadcrumbs>
            {data && data.length > 0 ? <Container className='mt-5'>
                <div className='d-flex flex-row gap-5'>
                    <div className='col-3'>
                        <Image src={url + 'upload/' + data[0].idModel.photo.entity + '/' + data[0].idModel.photo.hash + '.' + data[0].idModel.photo.extension} style={{ width: '100%' }}></Image>
                    </div>
                    <div className='col-9'>
                        <p>{data[0].idModel.description}</p>
                        <h5 className='text-uppercase mt-5'><b>Fantasie disponibili</b></h5>
                        <div className='row row-cols-5'>
                            {data.map(item => {
                                return (
                                    <>
                                        <div key={item.id} className='col text-center'>
                                            <div id={item.idFantasy.id} onClick={(e) => getVariant(item.idFantasy.id)} style={{ cursor: 'pointer' }}>
                                                <Image style={{ width: '75%' }} src={url + 'upload/' + item.idFantasy.photoCover.entity + '/' + item.idFantasy.photoCover.hash + '.' + item.idFantasy.photoCover.extension} roundedCircle></Image>
                                                <p>{item.idFantasy.name}</p>
                                            </div>

                                        </div>
                                    </>
                                )
                            })}
                        </div>


                        {variant ? <div>
                            <h5 className='text-uppercase mt-5 mb-2'><b>Taglie disponibili</b></h5>
                            <div className='row row-cols-6 ms-1'>
                                <Table bordered striped style={{ width: '100%' }}>
                                    <thead>
                                        <tr>
                                            <th>Codice</th>
                                            <th>Taglia</th>
                                            <th>Prezzo</th>
                                            <th>Quantità disponibile</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataVariant.map((item, index) => (
                                            <React.Fragment key={index}>
                                                {item.idVariant.map((variant, variantIndex) => (
                                                    <tr key={variant.id}>
                                                        <td>{variant.codice}</td>
                                                        <td>{variant.taglia}</td>
                                                        <td>{variant.priceList} €</td>
                                                        <td>{variant.quantity}</td>

                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                            <div className='d-flex flex-row gap-3 mt-2 mb-5'>
                                {dataVariant.map(item => {
                                    return (
                                        <Form.Select style={{ width: '200px' }} onChange={e => setCodeVariant(e.target.value)}>
                                            <option>Seleziona codice</option>
                                            {item.idVariant.map(variant => (
                                                <option value={variant.codice}>{variant.codice}</option>
                                            ))}
                                        </Form.Select>
                                    )

                                })}

                                <Form.Group controlId="formNome">
                                    <Form.Control type="number" placeholder="Quantità" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                </Form.Group>
                                <Button variant='danger' style={{color:'white'}} onClick={setDataCart}>Aggiungi al carrello</Button>
                            </div>


                        </div> : null
                        }

                    </div>
                </div>
            </Container>
                : null}
            {errors.length > 0 &&
                <Alert variant='danger' style={{position: 'absolute', top: '15%', right: '5%'}}>
                    {errors}
                </Alert>
            }
            {success.length > 0 &&
                <Alert variant='success' style={{position: 'absolute', top: '15%', right: '5%'}}>
                    {success}
                </Alert>
            }



        </>
    )


};