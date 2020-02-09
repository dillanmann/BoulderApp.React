import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Table,  Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/react-hooks';

import DeleteButton from './DeleteButton';

const GET_VGRADES = 
    gql`{ vGrades }`;

const GET_CIRCUIT_BY_ID =
    gql`
    query GetCircuitById($id: ID!){
        circuit(id: $id){
            name
            problems{
                id
                name
                grade
            }
        }
    }`;

const DELETE_PROBLEM_BY_ID = 
    gql`
    mutation DeleteProblemById($id: ID!){
        deleteProblem(id: $id){
            result
        }
    }`;

const DELETE_CIRCUIT_BY_ID = 
    gql`
    mutation DeleteCircuitById($id: ID!){
        deleteCircuit(id: $id){
            result
        }
    }`;

const ADD_PROBLEM_TO_CIRCUIT = 
    gql`
    mutation CreateProblemInCircuit($input: CreateProblemInCircuitInput!){
        createProblemInCircuit(input: $input){
          name
        }
      }`;

class CircuitDetails extends React.Component{
    constructor(props){
        super(props);
        this.history = props.history;
        this.state = {
            showAddProblemModal: false,
            problemName: '',
            problemGrade: ''
        }
    }
    onChangeProblemName = evt => this.setState( { problemName: evt.target.value } )
    onChangeProblemGrade = evt => this.setState( { problemGrade: evt.target.value } )
    setShowAddProblemModal = state => this.setState( { showAddProblemModal: state } )
    render(){
    let id = this.props.id;

    return (
    <Query query={GET_CIRCUIT_BY_ID} variables={{id}}>
    {({ loading, data, refetch }) => !loading && (
        <Container>
        <AddProblemModal 
        show={this.state.showAddProblemModal} 
        handleClose={() => this.setShowAddProblemModal(false)}
        problemName={this.state.problemName}
        onChangeProblemName={this.onChangeProblemName}
        problemGrade={this.state.problemGrade}
        onChangeProblemGrade={this.onChangeProblemGrade}
        circuitId={id}
        onSuccess={() => {
            this.setShowAddProblemModal(false);
            refetch();
        }}
        />
        <div>
            <h1>{data.circuit.name}</h1>
            <h4>Problems</h4>
            <div style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto', margin: '5px'}}>
            <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Grade</th>
                    <th/>
                </tr>
            </thead>
            <tbody>
            {data.circuit.problems.map(problem => 
            {
                return(
                    <tr key={problem.id} onClick={() => this.history.push("/problem/" + problem.id)}>
                        <td>{problem.name}</td>
                        <td>{problem.grade}</td>
                        <td>                      
                            <DeleteButton mutation={DELETE_PROBLEM_BY_ID} itemId={problem.id} afterDelete={() => refetch()} IconComponent={TrashIcon} />
                        </td>
                    </tr>
                )
                })}
            </tbody>                
            </Table>
            </div>
                <Row>
                    <Col xs={4}>
                    <Button variant='success' onClick={() => this.setShowAddProblemModal(true)}>Add Problem</Button>
                    <DeleteButton mutation={DELETE_CIRCUIT_BY_ID} itemId={id} afterDelete={() => this.history.goBack()} text='Delete Circuit'/>
                    </Col>
                    <Col xs={7}/>
                    <Col xs={1}>
                        <Button onClick={() => this.history.goBack()}>Back</Button>
                    </Col>
                </Row>
        </div>
        </Container>
    )}
  </Query>
    )
}
}

const AddProblemModal = ( { show, handleClose, problemName, onChangeProblemName, problemGrade, onChangeProblemGrade, circuitId, onSuccess } ) => {

    const createInputFromState = () => ({
        input: {
            circuitId: circuitId,
            problem: {
              name: problemName,
              grade: problemGrade,
            },
          }        
    });

    const [ mutate ] = useMutation(ADD_PROBLEM_TO_CIRCUIT, 
    { 
        variables: createInputFromState(),
        onCompleted: () => onSuccess()            
    });

    const handleClick = () => mutate();

    let { data, loading } = useQuery(GET_VGRADES);

    if (loading) return <p>Loading...</p>
    
    return(        
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Add Problem</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Problem name</Form.Label>
                        <Form.Control type='text' onChange={onChangeProblemName} value={problemName}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Grade</Form.Label>
                        <Form.Control as='select' onChange={onChangeProblemGrade} value={problemGrade}>
                            {data.vGrades.map(grade => <option key={grade}>{grade}</option>)}
                        </Form.Control>
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

const TrashIcon = () => <FaTrash/>

export default CircuitDetails;