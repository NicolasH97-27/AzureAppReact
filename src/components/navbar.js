import React ,{useState,useEffect}from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarBoostrap(props) {

  const [logeado, setLogeado] = useState(true);

  // useEffect(() => {
  //   const logeadoLocalStorage = localStorage.getItem('items')?? false;
  //   setLogeado(logeadoLocalStorage)
  // }, []);


  return (
    <div className='Navbar p-3 mb-5'>
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>props.setModal(true)}>Login</Nav.Link>
        </Nav.Item>
        {
          logeado && <Nav.Item>
          <Nav.Link onClick={()=>props.setModalCargarCatogoria(true)}>Cargar Categorias</Nav.Link>
        </Nav.Item>
        }
        
      </Nav>
    </div>
  );
}

export default NavBarBoostrap;