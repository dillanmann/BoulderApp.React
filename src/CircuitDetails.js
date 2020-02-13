import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Table,  Row, Col, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useQuery } from '@apollo/react-hooks';

import DeleteButton from './DeleteButton';
import CreationModal from './CreationModal';


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

const CREATE_PROBLEM_IN_CIRCUIT = 
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
        this.id = props.id;
        this.state = {
            showAddProblemModal: false,
            problemName: '',
            problemGrade: ''
        }
    }
    
    
    createInputFromState = () => ({
        input: {
            circuitId: this.id,
            problem: {
              name: this.state.problemName,
              grade: this.state.problemGrade,
            },
          }        
    });    

    onStateChange = evt => this.setState({ [evt.target.name]: evt.target.value });
    setShowAddProblemModal = state => this.setState( { showAddProblemModal: state } )
    render(){
    let id = this.props.id;

    return (
        <Query query={GET_CIRCUIT_BY_ID} variables={{id}}>
        {({ loading, data, refetch }) => !loading && (
            <Container>
                <CreationModal 
                    show={this.state.showAddProblemModal}
                    title='Add Problem'
                    handleClose={() => this.setShowAddProblemModal(false)}
                    onChange={this.onStateChange}
                    onSuccess={() => {
                        this.setShowAddProblemModal(false);
                        refetch();
                    }}
                    createInputFromState={this.createInputFromState}
                    mutation={CREATE_PROBLEM_IN_CIRCUIT}
                    Body={this.AddProblemModalBody}
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

    AddProblemModalBody = () => {
        let { data, loading } = useQuery(GET_VGRADES);

        if (loading) return <p>Loading...</p>

        return(
        <Form>
            <Form.Group>
                <Form.Label>Problem name</Form.Label>
                <Form.Control type='text' name='problemName' onChange={this.onStateChange} value={this.state.problemName}></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Grade</Form.Label>
                <Form.Control as='select' name='problemGrade' onChange={this.onStateChange} value={this.state.problemGrade}>
                    {data.vGrades.map(grade => <option key={grade}>{grade}</option>)}
                </Form.Control>
            </Form.Group>
        </Form>)
    }
}

const TrashIcon = () => <FaTrash/>

export default CircuitDetails;