import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../store/actions/authActions';
import { RootState } from '../store/reducers';

const ApplicationPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleSignOut = () => {
    dispatch(signOut() as any);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' , background:'#0d6efd'}}>
      <Row>
        <Col>
          <Card className="shadow-lg p-4" style={{ borderRadius: '15px', border: 'none' }}>
            <Card.Body className="text-center">
              <img
                src="./assets/add-user.png"
                alt="Welcome"
                className="mb-4"
                style={{ width: '100px', height: '100px' }}
              />
              <Card.Title className="mb-4" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                Welcome, {user?.name || 'User'}!
              </Card.Title>
              <Card.Text className="mb-4 text-muted">
                You have successfully signed in. Explore the features and enjoy your experience!
              </Card.Text>
              <Button
                variant="danger"
                onClick={handleSignOut}
                className="px-4 py-2"
                style={{ fontSize: '1.2rem', borderRadius: '50px' }}
              >
                Sign Out
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationPage;
