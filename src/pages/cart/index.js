import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb, Form, Tab, Tabs, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';
import { LoginManager } from '../../core/login-manager';
import { ApiManager } from '../../core/api-manager';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../components/Breadcrumbs';


export default function Cart(props) {

    const navigate = useNavigate();
    const { p } = useParams();
    const page = parseInt(p);


    const [data, setData] = useState([]);
    const [azienda, setAzienda] = useState([]);
    const userInfo = LoginManager.getUserInfo();
    const [subtotale, setSubTotale] = useState(0);
    const [spedizione, setSpedizione] = useState(0);
    const [totale, setTotale] = useState(0);
    const [iva, setIva] = useState('');
    const [sdi, setSdi] = useState('');
    const [ragsoc, setRagsoc] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const [viaS, setViaS] = useState('');
    const [cittaS, setCittaS] = useState('');
    const [capS, setCapS] = useState('');
    const [provinciaS, setProvinciaS] = useState('');

    const [viaF, setViaF] = useState('');
    const [cittaF, setCittaF] = useState('');
    const [capF, setCapF] = useState('');
    const [provinciaF, setProvinciaF] = useState('');




    useEffect(() => {
        init();
        getAzienda();
    }, [userInfo]);

    useEffect(() => {
        const somma = data.reduce((acc, cur) => acc + parseFloat(cur.price), 0);
        const sommaFormatted = somma.toFixed(2);
        setTotale(sommaFormatted);
        setSubTotale(sommaFormatted);
    }, [data]);




    async function init() {

        var constraints = {
            "idUser": {
                "type": "value",
                "value": userInfo.id
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('customer_cart', page, 30, sorting, '', [], constraints)
        if (response.success === 1) {
            setData(response.body);
        }
        else {
            toast.errors('Errore. Riprova più tardi.')
        }
    }



    async function getAzienda() {
        console.log(userInfo)
        var constraints = {
            "idUser": {
                "type": "value",
                "value": userInfo.id
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('customer', 1, 30, sorting, '', [], constraints)
        console.warn(response)
        setAzienda(response.body);
        setIva(response.body[0].vat_number);
        setSdi(response.body[0].sdi);
        setRagsoc(response.body[0].ragione_sociale);
        setName(response.body[0].idUser.name);
        setSurname(response.body[0].idUser.surname);
        setEmail(response.body[0].idUser.email);
        setPhone(response.body[0].idUser.phone);
        setViaS(response.body[0].idShippingAddress.address);
        setCapS(response.body[0].idShippingAddress.cap);
        setCittaS(response.body[0].idShippingAddress.city);
        setProvinciaS(response.body[0].idShippingAddress.province);
        setViaF(response.body[0].idBillingAddress.address);
        setCapF(response.body[0].idBillingAddress.cap);
        setCittaF(response.body[0].idBillingAddress.city);
        setProvinciaF(response.body[0].idBillingAddress.province);
    }


    async function deleteItem(customer_id) {
        var response = await DataManager.deleteItem('customer_cart', customer_id);
        if (response.success === 1) {
            init();
            props.setCartItem(props.cartItem - 1);
            toast.success('Prodotto rimosso dal carrello!', { theme: 'colored' })
        }
        else {
            toast.error('Errore. Riprova più tardi.')
        }

    }

    async function sendOrder() {
        const row = []
        data.forEach(element => {
            let rowData = {
                'model': element.model,
                'fantasy': element.fantasy,
                'variant': element.variant,
                'code': element.code,
                'quantity': element.quantity,
                'listPrice': element.listPrice,
                'price': element.price
            }
            row.push(rowData);
        });
        const body = {
            'idCustomer': { 'id': userInfo.id },
            //'idCustomer': { 'id': 6 },
            'ragione_sociale': ragsoc,
            'vat_number': iva,
            'sdi': sdi,
            'shipping_address': viaS + ', ' + cittaS + ' ' + capS + ', ' + provinciaS,
            'billing_address': viaF + ', ' + cittaF + ' ' + capF + ', ' + provinciaF,
            'rows': row,
            'total_price': totale,
            'status': { 'value': 0 }

        }

        console.log(body);

        var response = await DataManager.insertItem('customer_order', body);
        console.warn(response);
        if (response.success === 1) {
            const bodyMail = {
                'emailTo': email,
                'name': name,
                'surname': surname,
            }

            var responseEmail = await ApiManager.sendAuthenticatedRequest('/custom/send_invio_ordine', bodyMail)
            console.log('Email:', responseEmail)
            const body = {
                idUser: userInfo.id
            }
            var responseDelete = await ApiManager.sendAuthenticatedRequest('/custom/delete_cart', body);
            console.log(responseDelete);
            if (responseDelete.success === 1) {
                init();
                //toast.success('Ordine inviato con successo!')
                props.setCartItem(0);
                navigate('/invio_riuscito');
            }
        }
    }





    if (userInfo) {
        return (
            <>

                <Breadcrumbs title='Carrello'></Breadcrumbs>
                <Container fluid='md' className='mt-5 mb-5'>
                    <Row className='gap-5'>
                        <Col md='7'>
                            <Row className='border border-light p-2'>
                                <h5>Informazioni personali</h5>
                                <hr></hr>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formNome">
                                            <Form.Control type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formCognome">
                                            <Form.Control type="text" placeholder="Cognome" value={surname} onChange={e => setSurname(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formTelefono">
                                            <Form.Control type="text" placeholder="Telefono" value={phone} onChange={e => setPhone(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formIva">
                                            <Form.Control type="text" placeholder="Partita IVA" value={iva} onChange={e => setIva(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formSdi">
                                            <Form.Control type="text" placeholder="Codice SDI" value={sdi} onChange={e => setSdi(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Row>
                            <Row className='border border-light flex flex-col p-2 mt-3'>
                                <h5>Indirizzo di spedizione</h5>
                                <hr></hr>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formVia">
                                            <Form.Control type="text" placeholder="Via" value={viaS} onChange={e => setViaS(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formCap">
                                            <Form.Control type="text" placeholder="CAP" value={capS} onChange={e => setCapS(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formCitta">
                                            <Form.Control type="email" placeholder="Città" value={cittaS} onChange={e => setCittaS(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formProvincia">
                                            <Form.Control type="text" placeholder="Provincia" value={provinciaS} onChange={e => setProvinciaS(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Row>
                            <Row className='border border-light flex flex-col p-2 mt-3'>
                                <h5>Indirizzo di fatturazione</h5>
                                <hr></hr>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formVia">
                                            <Form.Control type="text" placeholder="Via" value={viaF} onChange={e => setViaF(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formCap">
                                            <Form.Control type="text" placeholder="CAP" value={capF} onChange={e => setCapF(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formCitta">
                                            <Form.Control type="email" placeholder="Città" value={cittaF} onChange={e => setCittaF(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col md='6'>
                                        <Form.Group className="mb-3" controlId="formProvincia">
                                            <Form.Control type="text" placeholder="Provincia" value={provinciaF} onChange={e => setProvinciaF(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Row>
                        </Col>
                        <Col className='p-3 border border-light'>
                            <h5>Carrello</h5>
                            <hr></hr>
                            {data.length === 0 ?
                                <p>Nessun articolo nel carrello</p> :
                                <div className='d-flex flex-column gap-2'>
                                    {data.map(item => {
                                        return (

                                            <div className='d-flex flex-row align-items-center justify-content-between' key={item.id}>
                                                <div className='d-flex flex-row align-items-center gap-3'>
                                                    <div style={{ position: 'relative' }}>
                                                        <Image src={item.image} style={{ maxHeight: '120px' }}></Image>
                                                        <Badge pill bg="secondary" style={{ position: 'absolute', top: '85%', left: '80%' }}>
                                                            {item.quantity}
                                                        </Badge>
                                                    </div>

                                                    <div className='d-flex flex-column'>
                                                        <p>{item.code}</p>
                                                        <button className='bg-white border-0' onClick={() => deleteItem(item.id)}><FontAwesomeIcon className='me-2' icon='xmark'></FontAwesomeIcon>Rimuovi</button>
                                                    </div>
                                                </div>

                                                <p>€{item.price}</p>
                                            </div>

                                        )
                                    })}
                                    <hr></hr>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <p>Subtotale</p>
                                        <p>€{subtotale}</p>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <p>Spedizione</p>
                                        <p>€{spedizione}</p>
                                    </div>
                                    <hr></hr>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <h4>Totale</h4>
                                        <p>€{totale}</p>
                                    </div>
                                    <Button variant='danger' style={{color:'white'}} onClick={sendOrder} >Invia ordine</Button>
                                </div>
                            }

                        </Col>
                    </Row>
                </Container>

            </>
        )


    }


};