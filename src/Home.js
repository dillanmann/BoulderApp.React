import React from 'react';
import { Query } from 'react-apollo';
import { Button, Card, Container} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import { GET_CENTERS } from './Constants/QueriesConstants';

export default function CenterDetail(){
  let history = useHistory();

  return (<Query query={GET_CENTERS}>
    {({ loading, data }) => !loading && (
      <Container>
      <div style={{ maxHeight: 'calc(100vh - 180px)', overflow: 'auto', margin: '5px'}}>
      {data.centers.map(center => (
          <Card key={center.id} bg="dark" text="white" style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{center.name}</Card.Title>
              <Card.Text>Circuits: {center.circuits.length}</Card.Text>
              <Button variant="primary" onClick={() => history.push("/center/" + center.id)}>
                View                
              </Button>
            </Card.Body>
          </Card>
      ))}
      </div>
      </Container>
    )}
  </Query>
  )
}