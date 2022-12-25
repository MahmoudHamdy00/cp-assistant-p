
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const HomeBase: React.FunctionComponent = () => {


  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand href="#home">CP-Assitant</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
};
