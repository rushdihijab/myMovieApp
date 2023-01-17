import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const App = () => {
  return (
    <Container fluid className="justify-content-md-center">
      <MainView />
    </Container>
  );
}

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);