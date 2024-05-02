import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Alert, Spinner, Card, Row, Col, ButtonGroup, Button, Image, Breadcrumb, Form, Tab, Tabs, Table, Modal, Accordion, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataManager } from '../../core/data-manager';
import { ResourceManager } from '../../core/resource-manager';
import { LanguageProvider } from '../../core/language-provider';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import blogDefault from '../../assets/entry-default.jpg';
import { LoginManager } from '../../core/login-manager';
import { toast } from 'react-toastify';
import Breadcrumbs from '../../components/Breadcrumbs';


export default function Profile() {

    const navigate = useNavigate();
    const [errors, setErrors] = useState('');
    const { p } = useParams();
    const page = parseInt(p);


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEditInfo, setShowEditInfo] = useState(false);
    const handleCloseEditInfo = () => setShowEditInfo(false);
    const handleShowEditInfo = () => setShowEditInfo(true);

    const [showEditDati, setShowEditDati] = useState(false);
    const handleCloseEditDati = () => setShowEditDati(false);
    const handleShowEditDati = () => setShowEditDati(true);

    const [showEditInd, setShowEditInd] = useState(false);
    const handleCloseEditInd = () => setShowEditInd(false);
    const handleShowEditInd = () => setShowEditInd(true);

    const [data, setData] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);
    const [detailOrder, setDetailOrder] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [userInfo, setUserInfo] = useState();

    const [name, setName] = useState('Nome');
    const [idCustomer, setId] = useState(0);
    const [idFatturazione, setIdFatturazione] = useState(0);
    const [idSpedizione, setIdSpedizione] = useState(0);
    const [surname, setSurname] = useState('Cognome');
    const [username, setUsername] = useState('Username');
    const [email, setEmail] = useState('Email');
    const [ragsoc, setRagSoc] = useState('Ragione sociale');
    const [iva, setIva] = useState('Partita IVA');
    const [sdi, setSdi] = useState('Codice SDI');
    const [sede, setSede] = useState('Sede legale');
    const [iSpedizione, setSpedizione] = useState('Indirizzo spedizione');
    const [iFatturazione, setFatturazione] = useState('Indirizzo fatturazione');

    const [viaS, setViaS] = useState('');
    const [cittaS, setCittaS] = useState('');
    const [capS, setCapS] = useState('');
    const [provinciaS, setProvinciaS] = useState('');

    const [viaF, setViaF] = useState('');
    const [cittaF, setCittaF] = useState('');
    const [capF, setCapF] = useState('');
    const [provinciaF, setProvinciaF] = useState('');


    const [showLogout, setShowLogout] = useState(false);

    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);


    useEffect(() => {
        getUserInfo();
    }, []);

    useEffect(() => {
        getAzienda();
        getOrder();
    }, [userInfo]);



    function getUserInfo() {
        var u = LoginManager.getUserInfo()
        setUserInfo(u);
    }


    async function getOrder() {
        var constraints = {
            "idCustomer": {
                "type": "value",
                "value": userInfo.id
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('customer_order', page, 30, sorting, '', [], constraints)
        if (response.success === 1) {
            setDataOrder(response.body)
        }

    }

    async function doLogout() {
        var response = await LoginManager.logout();
        navigate('/')
    }


    async function getAzienda() {
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
        var response = await DataManager.searchItems('customer', 1, 30, sorting, '', [], constraints);
        console.warn(response);
        if (response.success === 1) {
            setId(response.body[0].id);
            setData(response.body);
            setName(response.body[0].idUser.name);
            setSurname(response.body[0].idUser.surname);
            setUsername(response.body[0].idUser.username);
            setEmail(response.body[0].idUser.email);
            setRagSoc(response.body[0].ragione_sociale);
            setIva(response.body[0].vat_number);
            setSdi(response.body[0].sdi);
            setSede(response.body[0].sede_legale);
            setFatturazione(response.body[0].idBillingAddress.full_address);
            setSpedizione(response.body[0].idShippingAddress.full_address);
            setIdSpedizione(response.body[0].idShippingAddress.id);
            setIdFatturazione(response.body[0].idBillingAddress.id);
            setViaS(response.body[0].idShippingAddress.address);
            setCapS(response.body[0].idShippingAddress.cap);
            setCittaS(response.body[0].idShippingAddress.city);
            setProvinciaS(response.body[0].idShippingAddress.province);
            setViaF(response.body[0].idBillingAddress.address);
            setCapF(response.body[0].idBillingAddress.cap);
            setCittaF(response.body[0].idBillingAddress.city);
            setProvinciaF(response.body[0].idBillingAddress.province);
        }
    }


    async function customerOrder(id) {
        var constraints = {
            "id": {
                "type": "value",
                "value": id
            }
        }
        var sorting = {
            'field': 'id',
            'order': 'desc'
        }
        var response = await DataManager.searchItems('customer_order', page, 30, sorting, '', [], constraints)
        //console.warn(response.body[0])
        if (response.success === 1) {
            setDetailOrder(response.body[0])
            handleShow();
        }

    }



    async function editProfile() {
        const data = {
            'name': name,
            'surname': surname,
            'username': username,
            'email': email
        }
        const dataAzienda = {
            'ragione_sociale': ragsoc,
            'vat_number': iva,
            'sdi': sdi,
            'sede_legale': sede
        }
        const dataSpedizione = {
            'full_address': viaS + ', ' + cittaS + ' ' + capS + ', ' + provinciaS,
            'province': provinciaS,
            'address': viaS,
            'cap': capS,
            'city': cittaS
        }

        const dataFatturazione = {
            'full_address': viaF + ', ' + cittaF + ' ' + capF + ', ' + provinciaF,
            'province': provinciaF,
            'address': viaF,
            'cap': capF,
            'city': cittaF,
            'ragione_sociale': ragsoc,
            'vat_number': iva
        }

        console.log(idFatturazione, dataFatturazione);
        console.log(idSpedizione, dataSpedizione);
        var response = await DataManager.updateItem('user', data, userInfo.id);
        var responseAzienda = await DataManager.updateItem('customer', dataAzienda, idCustomer);
        var responseSpedizione = await DataManager.updateItem('shipping_address', dataSpedizione, idSpedizione);
        var responseFatturazione = await DataManager.updateItem('billing_address', dataFatturazione, idFatturazione);

        if (response.success === 1 && responseAzienda.success === 1 && responseFatturazione.success === 1 && responseSpedizione.success === 1) {
            toast.success('Campi salvati con successo!', { theme: 'colored' });
            handleCloseEditInd();
            handleCloseEditInfo();
            handleCloseEditDati();
            getAzienda();
        } else {
            toast.error('Errore nel salvataggio dei dati!', { theme: 'colored' });
            handleCloseEditInd();
            handleCloseEditInfo();
            handleCloseEditDati();

        }


    }




    return (
        <>

<Breadcrumbs title='Area personale'></Breadcrumbs>
            <Container fluid='md' className='mt-5 mb-5'>
                <Row>
                    <Col md="2"></Col>
                    <Col md="8">
                        <Tabs
                            defaultActiveKey="info"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            fill
                            justify
                            variant='tabs'
                        >
                            <Tab eventKey="info" title="Info personali">
                                <Container>
                                    <Col className='mt-5'>
                                        <Table bordered striped>

                                            <tbody>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>{name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cognome</td>
                                                    <td>{surname}</td>
                                                </tr>
                                                <tr>
                                                    <td>Username</td>
                                                    <td>{username}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{email}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Button variant='danger' style={{color:'white'}} onClick={handleShowEditInfo}>Modifica dati</Button>
                                </Container>
                            </Tab>
                            <Tab eventKey="azienda" title="Dati aziendali">
                                <Container>
                                    <Col className='mt-5'>
                                        <Table bordered striped>

                                            <tbody>
                                                <tr>
                                                    <td>Ragione sociale</td>
                                                    <td>{ragsoc}</td>
                                                </tr>
                                                <tr>
                                                    <td>Partita IVA</td>
                                                    <td>{iva}</td>
                                                </tr>
                                                <tr>
                                                    <td>Codice SDI</td>
                                                    <td>{sdi}</td>
                                                </tr>
                                                <tr>
                                                    <td>Sede legale</td>
                                                    <td>{sede}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Button variant='danger' style={{color:'white'}} onClick={handleShowEditDati}>Modifica dati</Button>
                                </Container>
                            </Tab>
                            <Tab eventKey="indirizzi" title="Indirizzi">
                                <Container>
                                    <Col className='mt-5'>
                                        <Table bordered striped>

                                            <tbody>
                                                <tr>
                                                    <td>Indirizzo di spedizione</td>
                                                    <td>{iSpedizione}</td>
                                                </tr>
                                                <tr>
                                                    <td>Indirizzo di fatturazione</td>
                                                    <td>{iFatturazione}</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Button variant='danger' style={{color:'white'}} onClick={handleShowEditInd}>Modifica dati</Button>
                                </Container>
                            </Tab>
                            <Tab eventKey="ordini" title="Ordini">
                                <Container>
                                    <Col className='mt-5'>
                                        {dataOrder && dataOrder.length > 0 ?
                                            <Table bordered striped>
                                                <thead>
                                                    <tr>
                                                        <th>Data e ora</th>
                                                        <th>Indirizzo di spedizione</th>
                                                        <th>Importo</th>
                                                        <th>Partita IVA</th>
                                                        <th>Dettagli</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {dataOrder.map((item, index) => (

                                                        <tr key={item.id}>
                                                            <td>{item.date}</td>
                                                            <td>{item.shipping_address}</td>
                                                            <td>{item.total_price} €</td>
                                                            <td>{item.vat_number}</td>
                                                            <td><Button variant='primary' onClick={() => customerOrder(item.id)}>Vedi</Button></td>


                                                        </tr>

                                                    ))}
                                                </tbody>
                                            </Table> :
                                            <h4>Nessun ordine ancora effettuato</h4>}


                                    </Col>
                                </Container>
                            </Tab>
                            <Tab eventKey="logout" title="Logout">
                                <Container>
                                    <Col className='mt-5'>
                                        <Button variant='danger' style={{color:'white'}} onClick={handleShowLogout}>Logout</Button>
                                    </Col>
                                </Container>
                            </Tab>
                        </Tabs>

                    </Col>
                    <Col md="2"></Col>
                </Row>


            </Container>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{detailOrder.date}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Indirizzo di spedizione: <b>{detailOrder.shipping_address}</b></p>
                    <p>Indirizzo di fatturazione: <b>{detailOrder.billing_address}</b></p>
                    <Accordion defaultActiveKey="0" flush>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Prodotti</Accordion.Header>
                            <Accordion.Body>
                                {detailOrder && detailOrder.length > 0 ?
                                    <div>
                                        {detailOrder.rows.map(index => {
                                            return (
                                                <>
                                                    <div key={index.id} className='d-flex flex-row justify-content-between'>
                                                        <p>{index.code}</p>
                                                        <p>{index.quantity}</p>
                                                        <p>{index.price}</p>
                                                    </div>
                                                    <hr></hr>
                                                </>

                                            )

                                        })}
                                    </div>
                                    : null

                                }

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>

            </Modal>
            <Modal show={showLogout} onHide={handleCloseLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Sei sicuro di voler effettuare il logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseLogout}>
                        No, chiudi
                    </Button>
                    <Button variant="danger" style={{color:'white'}} onClick={doLogout}>
                        Si, sono sicuro
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditInfo} onHide={handleCloseEditInfo}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica informazioni</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder='Nome' value={name} onChange={e => { setName(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formCognome">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder='Cognome' value={surname} onChange={e => { setSurname(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder='Username' value={username} onChange={e => { setUsername(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder='Email' value={email} onChange={e => { setEmail(e.target.value) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditInfo}>
                        Indietro
                    </Button>
                    <Button variant="danger" style={{color:'white'}} onClick={editProfile}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showEditDati} onHide={handleCloseEditDati}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica dati</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4" controlId="formRagSoc">
                            <Form.Label>Ragione sociale</Form.Label>
                            <Form.Control type="text" placeholder='Ragione sociale' value={ragsoc} onChange={e => { setRagSoc(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formIva">
                            <Form.Label>Partita IVA</Form.Label>
                            <Form.Control type="text" placeholder='Partita IVA' value={iva} onChange={e => { setIva(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formSDI">
                            <Form.Label>Codice SDI</Form.Label>
                            <Form.Control type="text" placeholder='Codice SDI' value={sdi} onChange={e => { setSdi(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formSede">
                            <Form.Label>Sede legale</Form.Label>
                            <Form.Control type="text" placeholder='Sede legale' value={sede} onChange={e => { setSede(e.target.value) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditDati}>
                        Indietro
                    </Button>
                    <Button variant="danger" style={{color:'white'}} onClick={editProfile}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showEditInd} onHide={handleCloseEditInd}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica indirizzi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormLabel>Indirizzo di spedizione</FormLabel>
                        <Form.Group className="mb-3" controlId="formVia">
                            <Form.Control type="text" placeholder="Via" value={viaS} onChange={e => setViaS(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCap">
                            <Form.Control type="text" placeholder="CAP" value={capS} onChange={e => setCapS(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCitta">
                            <Form.Control type="email" placeholder="Città" value={cittaS} onChange={e => setCittaS(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProvincia">
                            <Form.Control type="text" placeholder="Provincia" value={provinciaS} onChange={e => setProvinciaS(e.target.value)} />
                        </Form.Group>
                        <FormLabel>Indirizzo di fatturazione</FormLabel>
                        <Form.Group className="mb-3" controlId="formVia">
                            <Form.Control type="text" placeholder="Via" value={viaF} onChange={e => setViaF(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCap">
                            <Form.Control type="text" placeholder="CAP" value={capF} onChange={e => setCapF(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCitta">
                            <Form.Control type="email" placeholder="Città" value={cittaF} onChange={e => setCittaF(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProvincia">
                            <Form.Control type="text" placeholder="Provincia" value={provinciaF} onChange={e => setProvinciaF(e.target.value)} />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditInd}>
                        Indietro
                    </Button>
                    <Button variant="danger" style={{color:'white'}} onClick={editProfile}>
                        Salva
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


};