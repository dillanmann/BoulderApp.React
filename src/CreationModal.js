import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

export default ( { show, title, handleClose, onSuccess, createInputFromState, mutation, Body } ) => {

    const [ mutate ] = useMutation(mutation, 
    { 
        variables: createInputFromState(),
        onCompleted: () => onSuccess()            
    });

    const handleClick = () => mutate();
    
    return(        
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Body />
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
                <Button variant='primary' onClick={handleClick}>Add</Button>
            </Modal.Footer>
        </Modal>
        );
}
