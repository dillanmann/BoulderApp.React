import React from 'react';
import { Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

export default ( { mutation, itemId, afterDelete, text, IconComponent } ) => {
    const [deleteItem] = useMutation(mutation, { variables: {id: itemId }, onCompleted: () => afterDelete()});
    return(
        <Button variant="danger" onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            deleteItem({});
        }} >
        {
            text != null ? text : <IconComponent/>
        }
        </Button>
    )
}