import React from 'react';
import { Query } from 'react-apollo';
import { Button, Card, Container, Row, Col, Form, CardColumns } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

import CreationModal from './CreationModal'
import { GET_CENTERS } from './Constants/QueriesConstants';
import { CREATE_CENTER, DELETE_CENTER_BY_ID } from './Constants/MutationConstants';
import DeleteButton from './DeleteButton';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.history = props.history;
    this.state = {
      showAddCenterModal: false,
      centerName: ''
    };
  }

  onStateChange = evt => this.setState({ [evt.target.name]: evt.target.value });
  setShowAddCenterModal = state => this.setState( { showAddCenterModal: state } )

  createInputFromState = () => ({
    input: {
        name: this.state.centerName
      }
    });

  AddCenterModalBody = () => {
    return (
    <Form>
        <Form.Group>
            <Form.Label>Center name</Form.Label>
            <Form.Control type='text' name='centerName' onChange={this.onStateChange} value={this.state.centerName} />
        </Form.Group>
    </Form>)
}

  render(){
      return (<Query query={GET_CENTERS}>
        {({ loading, data, refetch }) => !loading && (
          <Container>
          <CreationModal 
                    show={this.state.showAddCenterModal}
                    title='Add Center'
                    handleClose={() => this.setShowAddCenterModal(false)}
                    onChange={this.onStateChange}
                    onSuccess={() => {
                        this.setShowAddCenterModal(false);
                        refetch();
                    }}
                    createInputFromState={this.createInputFromState}
                    mutation={CREATE_CENTER}
                    Body={this.AddCenterModalBody}
                />
          <div style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto', margin: '5px'}}>
          <CardColumns>
          {data.centers.map(center => (
              <Card key={center.id} bg="dark" text="white" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{center.name}</Card.Title>
                  <Card.Text>Circuits: {center.circuits.length}</Card.Text>
                  <Row>
                    <Col xs={4}>
                      <Button variant="primary" onClick={() => this.history.push("/center/" + center.id)}>
                        View                
                      </Button>
                    </Col>
                    <Col xs={{ offset: 5, span: 3}}>
                      <DeleteButton mutation={DELETE_CENTER_BY_ID} itemId={center.id} afterDelete={refetch} IconComponent={() => <FaTrash/>}/>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
          ))}
          </CardColumns>
          </div>
          <Button variant='success' onClick={() => this.setShowAddCenterModal(true)}>Add Center</Button>
          </Container>
        )}
      </Query>
      )
      }
}

export default Home;