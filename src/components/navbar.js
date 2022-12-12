import React ,{useState,useEffect}from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBarBoostrap(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [logeado, setLogeado] = useState(true);

  // useEffect(() => {
  //   const logeadoLocalStorage = localStorage.getItem('items')?? false;
  //   setLogeado(logeadoLocalStorage)
  // }, []);
  const togglePopup = (e) => {
    setIsOpen(!isOpen);
    console.log('que onda')
  };

  const Popup = (props) => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          {props.content}
        </div>
      </div>
    );
  };
  return (
    <div className='Navbar p-3 mb-5'>
      {isOpen && (
        <Popup
          content={
            <>
              <b>esta es tu compra</b>
              <p>
                <br />
                greagregare
                <br />
                <br />
                <div>
                </div>
                <br />

                <button
                  className="btn btn-primary"
                  onClick={console.log()}
                >
                comprar
                </button>
                
              </p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>props.setModal(true)}>Logigraegaern</Nav.Link>
        </Nav.Item>
        <Nav.Item>ffffffffff
          <Nav.Link href="/" onClick={()=>togglePopup()}>Tu compra</Nav.Link>
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