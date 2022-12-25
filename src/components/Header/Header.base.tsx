
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const HeaderBase: React.FunctionComponent = () => {


  return (
    <Navbar style={{backgroundColor:'#0b5394'}}  variant="dark" >
    <Container>
      <Navbar.Brand href="#home">CP-Assistant</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
};
