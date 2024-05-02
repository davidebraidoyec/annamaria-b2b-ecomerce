import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function ConnectionStatus() {

    const [offline, setOffline] = useState(false);

    useEffect(() => {
        if(!navigator.onLine) {
            setOffline(true)
        }
    }, []);


    return (
        <Container fluid className='text-end small p-3 text-secondary bg-dark'>
            {offline && (
                <div>
                    Network status: <b>Offline</b> <FontAwesomeIcon className='ms-1' icon={'globe'} color={'red'} size={'lg'} fade />
                    <br/>
                    / <span role='button' className='link-primary' onClick={() => window.location.reload(true)}>Refresh</span>
                </div>
            )}
            {!offline && (
                <div>
                    Network status: <b>Online</b> <FontAwesomeIcon className='ms-1' icon={'globe'} color={'green'} size={'lg'} fade />
                </div>
            )}
        </Container>
    );
};