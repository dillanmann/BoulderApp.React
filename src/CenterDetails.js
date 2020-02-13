import React from 'react';
import { Query } from 'react-apollo';
import { Container, ListGroup, Col, Row, Button, Form } from 'react-bootstrap';
import DeleteButton from './DeleteButton';
import CreationModal from './CreationModal';
import { GET_CENTER_BY_ID } from './Constants/QueriesConstants';
import { CREATE_CIRCUIT_IN_CENTER, DELETE_CENTER_BY_ID } from './Constants/MutationConstants';

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

    createInputFromState = () => ({
        input: {
            centerId: this.id,
            circuit: {
              name: this.state.circuitName,
              dateUp: this.state.circuitUpDate,
              dateDown: this.state.circuitDownDate
            },
          }        
    });
    onStateChange = evt => this.setState({ [evt.target.name]: evt.target.value });
    setShowAddCircuitModal = state => this.setState( { showAddCircuitModal: state } )

    AddCircuitModalBody = () => {
        return (
        <Form>
            <Form.Group>
                <Form.Label>Circuit name</Form.Label>
                <Form.Control type='text' name='circuitName' onChange={this.onStateChange} value={this.state.circuitName}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date set</Form.Label>
                <Form.Control type='date' name='circuitUpDate' onChange={this.onStateChange} value={this.state.circuitUpDate}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date down</Form.Label>
                <Form.Control type='date' name='circuitDownDate' onChange={this.onStateChange} value={this.state.circuitDownDate}></Form.Control>
            </Form.Group>
        </Form>)
    }

    render(){
        const id = this.id;
        return (
            <Query query={GET_CENTER_BY_ID} variables={{id}}>
            {({ loading, data, refetch }) => !loading && (
                <Container>
                <CreationModal 
                    show={this.state.showAddCircuitModal}
                    title='Add Circuit'
                    handleClose={() => this.setShowAddCircuitModal(false)}
                    onChange={this.onStateChange}
                    onSuccess={() => {
                        this.setShowAddCircuitModal(false);
                        refetch();
                    }}
                    createInputFromState={this.createInputFromState}
                    mutation={CREATE_CIRCUIT_IN_CENTER}
                    Body={this.AddCircuitModalBody}
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

export default CenterDetails;