import { Container, Navbar, Nav, Button, Badge } from 'react-bootstrap';

const NavBar = () => {

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/"><h1>Charteum</h1></Navbar.Brand>
          <Nav className="me-auto">
              <Nav.Link href="erc20-transfer-volume">ERC20 Transfer Volume</Nav.Link>
              <Nav.Link href="base-fee-per-gas">Base Fee</Nav.Link>
              <Nav.Link href="gas-used-ratio">Gas Used Ratio</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default NavBar;