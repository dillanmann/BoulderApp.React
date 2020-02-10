import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, ListGroup, Col, Row, Button, Form, Modal } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import DeleteButton from './DeleteButton';


const GET_CENTER_BY_ID =
    gql`
    query GetCenterById($id: ID!){
        center(id: $id){
            name
            circuits{
                name
                id
                problems{
                    id
                }
            }
        }
    }`;

const CREATE_CIRCUIT_IN_CENTER =
    gql`
    mutation CreateCircuitInCenter($input: CreateCircuitInCenterInput!){
        createCircuitInCenter(input: $input){
            name
        }
    }
    `;

const DELETE_CENTER_BY_ID =
    gql`
        mutation DeleteCenterById($id: ID!){
            deleteCenterById(id: $id){
                result
            }
        }
    `;

class CenterDetails extends React.Component{
    constructor(props){
        super(props);
        this.history = props.history;
        this.id = props.id;
        this.state = {
            showAddCircuitModal: false,
            circuitName: '',
            circuitUpDate: '',
            circuitDownDate: ''
        }
    }

    onChangeCircuitName = evt => this.setState( { circuitName: evt.target.value } )
    onChangeCircuitUpDate = evt => this.setState( { circuitUpDate: evt.target.value } )
    onChangeCircuitDownDate = evt => this.setState( { circuitDownDate: evt.target.value } )
    setShowAddCircuitModal = state => this.setState( { showAddCircuitModal: state } )

    render(){
        const id = this.id;
        return (
            <Query query={GET_CENTER_BY_ID} variables={{id}}>
            {({ loading, data, refetch }) => !loading && (
                <Container>
                <AddCircuitModal 
                    show={this.state.showAddCircuitModal}
                    handleClose={() => this.setShowAddCircuitModal(false)}
                    centerId = {id}
                    circuitName={this.state.circuitName}
                    onChangeCircuitName={this.onChangeCircuitName}
                    circuitUpDate={this.state.circuitUpDate}
                    onChangeCircuitUpDate={this.onChangeCircuitUpDate}
                    circuitDownDate={this.state.circuitDownDate}
                    onChangeCircuitDownDate={this.onChangeCircuitDownDate}
                    onSuccess={() => {
                        this.setShowAddCircuitModal(false);
                        refetch();
                    }}
                />
                <div>
                    <h1>{data.center.name}</h1>
                    <h4>Circuits</h4>
                    <div style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto', margin: '5px'}}>
                        <ListGroup>
                            {data.center.circuits.map(circuit => 
                            (
                                <ListGroup.Item key={circuit.id} action onClick={() => this.history.push("/circuit/" + circuit.id)}>
                                <Row>
                                    <Col>{circuit.name}</Col>
                                    <Col>Problems: {circuit.problems.length}</Col>
                                </Row>       
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </div>
                <Row>
                    <Col xs={4}>
                    <Button variant='success' onClick={() => this.setShowAddCircuitModal(true)}>Add Circuit</Button>
                    <DeleteButton mutation={DELETE_CENTER_BY_ID} itemId={id} afterDelete={() => this.history.goBack()} text='Delete Center'/>
                    </Col>
                    <Col xs={7}/>
                    <Col xs={1}>
                        <Button onClick={() => this.history.goBack()}>Back</Button>
                    </Col>
                </Row>
                </Container>
            )}
            </Query>
        )
    }
}

const AddCircuitModal = ( { show, handleClose, circuitName, onChangeCircuitName, circuitUpDate, onChangeCircuitUpDate, circuitDownDate, onChangeCircuitDownDate, centerId, onSuccess } ) => {

    const createInputFromState = () => ({
        input: {
            centerId: centerId,
            circuit: {
              name: circuitName,
              dateUp: circuitUpDate,
              dateDown: circuitDownDate
            },
          }        
    });

    const [ mutate ] = useMutation(CREATE_CIRCUIT_IN_CENTER, 
    { 
        variables: createInputFromState(),
        onCompleted: () => onSuccess()            
    });

    const handleClick = () => mutate();
    
    return(        
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Add Circuit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Circuit name</Form.Label>
                        <Form.Control type='text' onChange={onChangeCircuitName} value={circuitName}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date set</Form.Label>
                        <Form.Control type='date' onChange={onChangeCircuitUpDate} value={circuitUpDate}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Date down</Form.Label>
                        <Form.Control type='date' onChange={onChangeCircuitDownDate} value={circuitDownDate}></Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
                <Button variant='primary' onClick={handleClick}>Add</Button>
            </Modal.Footer>
        </Modal>
        );
}

export default CenterDetails;