import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import Button2 from "react-bootstrap/Button";
import { loginRequest } from "./authConfig";
import { callMsGraph } from "./graph";
import { ProfileData } from "./components/ProfileData";
import NavBarBoostrap from "./components/navbar";
import DarkTable from "./components/table";
import Form2 from "./components/Form/Form";
import {
  Container,
  Modal,
  Dropdown,
  Col,
  Form,
  Row,
  Button,
  ButtonGroup,
} from "react-bootstrap";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
  
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
 
  function RequestProfileData() {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }

  return (
    <>
      <h5 className="card-title">Bienvenido {accounts[0].name}</h5>
    </>
  );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = (props) => {
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const { modalCargarCateg, setModalCargarCateg } = props;

  const [productosFilter,setProductosFilter] = useState("")
  const [categoriasFilter, setCategoriasFilter] = useState("");
  const [subcategoriasFilter, setSubcategoriasFilter] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [k, setk] = useState(1);
  

  console.log("modalCargarCateg", modalCargarCateg);
  useEffect(() => {
    fetch(
      "https://strnico.blob.core.windows.net/productos/testoutput.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        let categoriasArray = [] 
        data.forEach(post => {
          if (!categoriasArray.some(e => e.categoria === post.Categoria)) {
              categoriasArray.push({
                categoria:post.Categoria,
                subcategorias:[]
              })
          }

          let index = categoriasArray.findIndex(categoria => categoria.categoria === post.Categoria)
          let subCategoriaExist = categoriasArray.some(categoria => categoria.subcategorias.some(e => e  === post.SubCategoria))
          if(index > -1 && !subCategoriaExist){
            categoriasArray[index].subcategorias.push(post.SubCategoria)
          }
        
        })
        setCategorias(categoriasArray)
        
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addInfo = (infoObject) => {
    console.log("producto:", infoObject);
    setk(k+1)
    fetch("https://strnico.blob.core.windows.net/input/"+k+".json?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupyx&se=2022-11-30T20:27:35Z&st=2022-11-30T12:27:35Z&spr=https&sig=XD%2BVqNAyPcKXVbu9lUuukBIpguwyhi5FSBnQ469LqMs%3D", {
      method: "PUT",
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(infoObject),
    })
      .then((response) => response.json())
      .then((response) => console.log(JSON.stringify(response)));
  };

  const filterConditions = (producto) => {

    let cumple = true 

    if( productosFilter !== "" && !producto.Producto.includes(productosFilter) ) cumple = false
    if( categoriasFilter !== "" && categoriasFilter !== producto.Categoria) cumple = false
    if( subcategoriasFilter !== "" && subcategoriasFilter !== producto.SubCategoria) cumple = false

    return cumple
  }
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent/>
        <Modal
          show={modalCargarCateg}
          fullscreen={true}
          onHide={() => setModalCargarCateg(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cargar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form2 onClick={addInfo} message={setErrorMessage} />
            <h1>{errorMessage}</h1>
          </Modal.Body>
        </Modal>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {/* //Cargar Categorias */}

        <div>
          <Form>
            <Form.Group
              as={Row}
              className="mb-1"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2">
                Producto
              </Form.Label>
              <Col sm="10">
                <Form.Control onChange={(e)=>setProductosFilter(e.currentTarget.value)} placeholder="" defaultValue="" />
              </Col>
            </Form.Group>

            <Dropdown autoClose={"outside"}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categorias
              </Dropdown.Toggle>

                  <Dropdown.Menu>
              {categorias.map(categoria => (
                    <Dropdown.Item href="#/action-1">
                      <Dropdown as={ButtonGroup}>
                        <Button variant="success" onClick={()=>setCategoriasFilter(categoria.categoria)}>{categoria.categoria} </Button>

                        <Dropdown.Toggle
                          split
                          variant="success"
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>

                          {
                            categoria.subcategorias.map( subcategoria => 
                                <Dropdown.Item href="#/action-1" onClick={()=>{setCategoriasFilter(categoria.categoria);setSubcategoriasFilter(subcategoria)}}>
                                  {subcategoria}{" "}
                                </Dropdown.Item>

                            )
                          }
                        </Dropdown.Menu>
                      </Dropdown>
                    </Dropdown.Item>
                  ) 
                    )}
                  </Dropdown.Menu>

            </Dropdown>

            <Button onClick={()=>{
              setProductosFilter("")
              setCategoriasFilter("")
              setSubcategoriasFilter("")
            }}>Borrar Filtros</Button>
          </Form>
        </div>
        <DarkTable posts={posts.filter(filterConditions)} />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  const [modalCargarCateg, setModalCargarCateg] = useState(false);
  return (
    <PageLayout
      modalCargarCateg={modalCargarCateg}
      setModalCargarCateg={setModalCargarCateg}
    >
      <MainContent
        modalCargarCateg={modalCargarCateg}
        setModalCargarCateg={setModalCargarCateg}
      />
    </PageLayout>
  );
}
