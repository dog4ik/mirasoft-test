import { Container, Navbar, Offcanvas } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="light" sticky="top" expand="">
      <Container fluid>
        <Navbar.Brand>Brand</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
              Brand
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Container className="d-flex flex-column justify-content-center align-items-center gap-3 mb-3">
              <img src="https://placehold.co/120" className="rounded w-50" />
              <h4>Vadim Gerasimov</h4>
              <span>angryvadik@gmail.com</span>
            </Container>
            <Nav className="justify-content-end flex-grow-1 gap-4">
              <Navbar.Toggle className="text-start">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fs-4 ${isActive ? "active" : ""}`
                  }
                  to={"/"}
                >
                  Posts
                </NavLink>
              </Navbar.Toggle>
              <Navbar.Toggle className="text-start">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link fs-4 ${isActive ? "active" : ""}`
                  }
                  to="/aboutMe"
                >
                  About Me
                </NavLink>
              </Navbar.Toggle>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
