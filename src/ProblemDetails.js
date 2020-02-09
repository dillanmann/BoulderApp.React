import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DeleteButton from './DeleteButton';


const GET_PROBLEM_BY_ID =
    gql`
    query GetProblemById($id: ID!){
        problem(id: $id){
            name
            id
            grade
        }
    }`;

const DELETE_PROBLEM_BY_ID = 
    gql`
    mutation DeleteProblemById($id: ID!){
        deleteProblem(id: $id){
            result
        }
    }`;

export default (props) => {
    let id = props.id;
    let history = useHistory();

    return (<Query query={GET_PROBLEM_BY_ID} variables={{id}}>
    {({ loading, data }) => !loading && (
        <Container>
        <div>
            <h1>{data.problem.name}</h1>
            <h3>Grade: {data.problem.grade}</h3>
            <DeleteButton mutation={DELETE_PROBLEM_BY_ID} itemId={data.problem.id} afterDelete={history.goBack} text="Delete"/>
            <Button onClick={history.goBack}>
                Back
            </Button>
        </div>
        </Container>
    )}
  </Query>
)}