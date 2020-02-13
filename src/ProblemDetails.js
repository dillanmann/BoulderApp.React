import React from 'react';
import { Query } from 'react-apollo';
import { Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import { GET_PROBLEM_BY_ID } from './Constants/QueriesConstants';
import { DELETE_PROBLEM_BY_ID } from './Constants/MutationConstants';

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