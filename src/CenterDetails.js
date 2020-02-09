import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, ListGroup, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

let GET_CENTER_BY_ID = (id => 
    gql`
    query{
        center(id: "${id}"){
            name
            circuits{
                name
                id
                problems{
                    id
                }
            }
        }
    }`);

export default (props) => {
    let history = useHistory();

    return (<Query query={GET_CENTER_BY_ID(props.id)}>
    {({ loading, data }) => !loading && (
        <Container>
        <div>
            <h1>{data.center.name}</h1>
            <h4>Circuits</h4>
            <ListGroup>
                {data.center.circuits.map(circuit => 
                (
                    <ListGroup.Item key={circuit.id} action onClick={() => history.push("/circuit/" + circuit.id)}>
                    <Row>
                        <Col>{circuit.name}</Col>
                        <Col>Problems: {circuit.problems.length}</Col>
                    </Row>       
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
        </Container>
    )}
  </Query>
)}