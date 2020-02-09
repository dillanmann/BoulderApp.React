import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Card, Container} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const GET_CENTERS = gql`
  query {
    centers {
      name
      id
      circuits{
        name
      }
    }
  }
`;

export default function CenterDetail(){
  let history = useHistory();

  return (<Query query={GET_CENTERS}>
    {({ loading, data }) => !loading && (
      data.centers.map(center => (
        <Container>
          <Card bg="dark" text="white" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{center.name}</Card.Title>
              <Card.Text>Circuits: {center.circuits.length}</Card.Text>
              <Button variant="primary" onClick={() => history.push("/center/" + center.id)}>
                View                
              </Button>
            </Card.Body>
          </Card>
        </Container>
      ))
    )}
  </Query>
  )
}