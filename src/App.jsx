import React, { useState, useEffect } from "react";
import Note from "./components/Note";
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
import Autosuggest from "react-autosuggest";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const TENANTID = '71d929a5-af77-473e-bf1a-0d41e1affefe' //de active directory
const SUSCRIPTIONID = '9cd6251c-8a67-432f-a673-0c45fb77031c' //de active directory
const GRUPODERECURSOS = 'resourcenico2022n' //de active directory
const DATAFACTORY = 'adfPruebaAPI' //de active directory
const BLOBPILELINE = 'adfPruebaAPI' //de active directory
const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzcxZDkyOWE1LWFmNzctNDczZS1iZjFhLTBkNDFlMWFmZmVmZS8iLCJpYXQiOjE2NzA5NDQyNTAsIm5iZiI6MTY3MDk0NDI1MCwiZXhwIjoxNjcwOTQ4MTUwLCJhaW8iOiJFMlpnWUtnSWE1aXljZjNhSjVQdVA4NXVyWFg0RHdBPSIsImFwcGlkIjoiNDNjN2U3NTItMTRkYy00N2EzLWFmYWUtOTMyZmNjY2Q1YTcwIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzFkOTI5YTUtYWY3Ny00NzNlLWJmMWEtMGQ0MWUxYWZmZWZlLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNmEyMmExMWQtNmViMC00YzFhLWExMzgtOGEzNzhjMTRkMjNmIiwicmgiOiIwLkFWa0FwU25aY1hldlBrZV9HZzFCNGFfLV9rWklmM2tBdXRkUHVrUGF3ZmoyTUJPZEFBQS4iLCJzdWIiOiI2YTIyYTExZC02ZWIwLTRjMWEtYTEzOC04YTM3OGMxNGQyM2YiLCJ0aWQiOiI3MWQ5MjlhNS1hZjc3LTQ3M2UtYmYxYS0wZDQxZTFhZmZlZmUiLCJ1dGkiOiI1T1pHd2hac1hrNnZmNDhaTGxvNUFnIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjE2NjI0NzA3OTl9.nvrFOe3fX4Xsjmz7ylDrk_Zkxbhy_lBl3m6tuYNzmrwebnt5ihctsB-FuB6wpGcBMd04nGLeX-Swyrlqy7E2fLoBBjGTC2paGsEonbQRFdrm7swCsBPCmLjNX1KMsrFlGWArQRDooZlrVgwKLulmYoMdF6n8E7EGP-Va0kNYfEM29Xw-dmGB0DWDepHD9U5CSvCODsJ9knVFHGnaPciyjg9iUz48BdX3pPBIH22IwGkLaN4qAXP0M2FSu40abuEerZIOOpatjvabpAK9imeSWMUaSOxoQr4IXIhRVoImb16wGMk5YBLHSi2QaoE7z8BLBuGMfUF76I__9Qq1bcjTcQ"

const parseoParaDataFiltrada = (productoAFiltrar) => {
  return {
    Producto: productoAFiltrar.Producto,
    Cod_Producto: productoAFiltrar.Cod_Producto
  }
}
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
  const [postsInvalido, setPostsInvalido] = useState([]);
  const [posts2, setPosts2] = useState([]);
  const [modal, setModal] = useState(false);

  const { modalCargarCateg, setModalCargarCateg } = props;

  const [dataFiltrado, setDataFiltrado] = useState([])
  const [productosFilter, setProductosFilter] = useState("");
  const [Cod_Producto, setCod_Producto] = useState("");
  const [Cod_SubCategoria, setCod_SubCategoria] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [k, setk] = useState(1);


  const [token, setToken] = useState();

  useEffect(() => {
    fetch("https://datalakesiglo21.blob.core.windows.net/getsfront/busquedacliente.json")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        const dataNuevaFiltrada = data.map(parseoParaDataFiltrada)
        setDataFiltrado(data);
        let categoriasArray = [];
        data.forEach((post) => {
          if (!categoriasArray.some((e) => e.categoria === post.Categoria)) {
            categoriasArray.push({
              categoria: post.Categoria,
              subcategorias: [],
            });
          }

          let index = categoriasArray.findIndex(
            (categoria) => categoria.categoria === post.Categoria
          );
          let subCategoriaExist = categoriasArray.some((categoria) =>
            categoria.subcategorias.some((e) => e === post.Subcategoria)//lo cambie
          );
          if (index > -1 && !subCategoriaExist) {
            categoriasArray[index].subcategorias.push(post.Subcategoria);//lo cambie
          }
        });
        setCategorias(categoriasArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function handleErrors(response) {
    if (!response.ok) {
      console.log((response.statusText))
      throw Error(response.statusText);
    }
    return response;
}
  

  const addInfo = (infoObject) => {

    setNotes([])
    setErrorMessage('se guardo exitosamente')

    if(envios.length<10){
      console.log('no se envia por el largo es', envios.length)
    }else{
      fetch(
        
        " https://storagesiglog4.blob.core.windows.net/putsfront/nuevosProductos/producto.json?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupyx&se=2022-12-16T10:34:51Z&st=2022-12-16T02:34:51Z&spr=https&sig=Z2KpVrx86eNkALHV7vng1Voy8EfqbtdlsKVbNWlDCro%3D",
        {
          method: "PUT",
          headers: {
            "x-ms-blob-type": "BlockBlob",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(envios),
        }
      )
        .then((response) => response.json())
        .then((response) => console.log(JSON.stringify(response)));
      setEnvios([])
    }

    //...................................................
    // fetch(
    //     "https://login.microsoftonline.com/" + TENANTID + "/oauth2/token", //DE LA APLICACION DE AAD
    //     {
    //       // mode: "cors",
    //       method: "POST",
    //       headers: {
    //         "Accept": "*/*",//toma lo que hay al principio de la barra y lo que haya despues
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Access-Control-Allow-Origin":"*"
    //       },
    //       body:(
    //         {
    //           "grant_type": "client_credentials",
    //           "client_id": "43c7e752-14dc-47a3-afae-932fcccd5a70",//id de la aplicacion
    //           "client_secret": "sj08Q~INNS0jDmRWwYtmCJAtI1Rzmk9W0DE~mbdf", //se busca en la llavesita, certificados  y secretos
    //           "resource": "https://management.azure.com/", //la aplicacion es como un usuario le tenes que dar el permiso
    //         }            
    //         ),
    //       // mode: "no-cors" 
    //     }

    //   )
    //       .then(response =>  console.log(response))
    //       .then(handleErrors)
    //       .then(function (response) {
    //         console.log("ok");
    //       }).catch(function (error) {
    //         console.log(error);
    //       });

    // fetch(
    //   "https://management.azure.com/subscriptions/"+SUSCRIPTIONID+"/resourceGroups/"+GRUPODERECURSOS+"/providers/Microsoft.DataFactory/factories"+DATAFACTORY+"/pipelines/"+BLOBPILELINE+"/createRun?api-version=2018-06-01", //DE LA APLICACION DE AAD
    //   {
    //     method: "POST",
    //     header: {
    //       'Accept': '*/*',//toma lo que hay al principio de la barra y lo que haya despues
    //       'Authorization': 'Bearer '+token1,
    //   }
    //   }
    // )
    //   .then((response) => response.json().access_token)
    //   .then((response) => console.log(JSON.stringify(response))
    // );

  };


  const filterConditions = (producto) => {
    let cumple = true;

    if (productosFilter !== ""  &&  !producto.Producto.toLowerCase().includes(productosFilter.toLowerCase())) cumple = false;

    
    if (Cod_Producto != "" && Cod_Producto !== producto.Categoria) cumple = false;
    if (Cod_SubCategoria != "" && Cod_SubCategoria !== producto.SubCategoria) cumple = false;

    return cumple;
  };
  // ************************************************************************************************
  // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalgoque no se que onda ahre es el AUTOCOMPLETAR
  // K

  // *******************************************************************************************************
  const [presidentes, setPresidentes] = useState(dataFiltrado);
  const [value, setValue] = useState("");
  const [presidenteSeleccionado, setPresidenteSeleccionado] = useState({});

  const onSuggestionsFetchRequested = ({ value }) => {
    setPresidentes(filtrarPresidentes(value));
  };

  const filtrarPresidentes = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = dataFiltrado.filter((Cod_Producto) => {
      var textoCompleto =
        Cod_Producto.Cod_Producto + " - " + Cod_Producto.Producto;

      if (
        textoCompleto
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)
      ) {
        return Cod_Producto;
      }
    });

    return inputLength === 0 ? [] : filtrado;
  };

  const onSuggestionsClearRequested = () => {
    setPresidentes([]);
  };

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.Cod_Producto} - ${suggestion.Producto}`;
  };

  const renderSuggestion = (suggestion) => (
    <div
      className="sugerencia"
      onClick={() => seleccionarPresidente(suggestion)}
    >
      {`${suggestion.Cod_Producto} - ${suggestion.Producto}`}
    </div>
  );

  const seleccionarPresidente = (Cod_Producto) => {
    setPresidenteSeleccionado(Cod_Producto);
  };

  const onChange = (e, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Producto",
    value,
    onChange,
  };

  const eventEnter = (e) => {
    if (e.key === "Enter") {
      var split = e.target.value.split("-");
      var Cod_Producto = {
        Cod_Producto: split[0].trim(),
        Producto: split[1].trim(),
      };
      seleccionarPresidente(Cod_Producto);
    }
  };
  // notasssssss ******************************************************
  // ******************************************
  const [notes, setNotes] = useState([]);
  const [envios, setEnvios] = useState([]);
  const [stock, setStock] = useState(0);

  const addNote = (note) => {
    const newNote = { ...note };
    newNote.stock = stock
    if (newNote.stock > 0) {

      setNotes(notes.concat(newNote))
      setErrorMessage('')
      setEnvios(envios.concat(newNote))
    }
  }
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
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = (e) => {
    setIsOpen(!isOpen);

  };


  const subirNuevoProducto = (infoObject) => {
    console.log("hola: ", infoObject)
    
   
        fetch(
          "https://storagesiglog4.blob.core.windows.net/putsfront/nuevosStocks/stock.json?sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupyx&se=2022-12-16T10:34:51Z&st=2022-12-16T02:34:51Z&spr=https&sig=Z2KpVrx86eNkALHV7vng1Voy8EfqbtdlsKVbNWlDCro%3D",
          {
            method: "PUT",
            headers: {
              "x-ms-blob-type": "BlockBlob"
            },
            body: JSON.stringify(infoObject),
          }
        )
          .then((response) => response.json())
          .then((response) => console.log(JSON.stringify(response)));
        setEnvios([])
      
  }

  

  let postFiltrados = posts.filter(filterConditions)
  if(postFiltrados.length === 0  && postsInvalido.length === 0){
     const nuevoFetchOQueSeYo = async()=>{
      console.log("responseJson")
      const response = await fetch("https://datalakesiglo21.blob.core.windows.net/getsfront/cuandoHayStock.json")
      const responseJson = await response.json()
      setPostsInvalido(responseJson)
      console.log("responseJson",responseJson)
    }
    nuevoFetchOQueSeYo();
  }
  


  return (
    <div className="App">
      <AuthenticatedTemplate>
        <ProfileContent />
        <Modal
          show={modalCargarCateg}
          fullscreen={true}
          onHide={() => setModalCargarCateg(false)}
        >
          <Modal.Header closeButton >
            <Modal.Title >Cargar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="App">
              <Autosuggest
                suggestions={presidentes}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={eventEnter}
              />
              <br />
              <input
                onChange={(e) => {

                  setStock(e.target.value);
                }}
                defaultValue={"stock"}
                type={"number"}
              ></input>
              <br />
              <br />
              <button
                className="btn btn-primary"
                onClick={() => addNote(presidenteSeleccionado)}
              >
                subir
              </button>
            </div>
            {notes.map((note) => (
              <div>
                <Note key={note.id} note={note} />
              </div>
            ))}
            <button className="btn btn-primary" onClick={() => addInfo(notes)}>
              guardar
            </button>
            {/* <Form2 onClick={addInfo} message={setErrorMessage} /> */}
            <h1>{errorMessage}</h1>
            <button className="btn btn-primary" onClick={() => togglePopup()}>agregar nuevo producto</button>
            {isOpen && (
              <Popup
                content={
                  <>
                    <h1>complete el formulario para agregar el nuevo producto...</h1>
                    <br></br>
                    <Form2 onClick = {subirNuevoProducto} />
                  </>
                }
                handleClose={togglePopup}
              />
            )}

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
                <Form.Control
                  onChange={(e) => setProductosFilter(e.currentTarget.value)}
                  placeholder=""
                  defaultValue=""
                />
              </Col>
            </Form.Group>
            <div className="botondesplegable">

            <Dropdown autoClose={"outside"}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categorias
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categorias.map((categoria) => (
                  <Dropdown.Item href="#/action-1">
                    <Dropdown as={ButtonGroup}>
                      <Button
                        variant="success"
                        onClick={() => {
                          setCod_Producto(categoria.categoria)
                          setCod_SubCategoria("")
                        }}
                      >
                        {categoria.categoria}{" "}
                      </Button>

                      <Dropdown.Toggle
                        split
                        variant="success"
                        id="dropdown-split-basic"
                      />

                      <Dropdown.Menu>
                        {categoria.subcategorias.map((subcategoria) => (
                          <Dropdown.Item
                            href="#/action-1"
                            onClick={() => {
                              setCod_Producto(categoria.categoria);
                              setCod_SubCategoria(subcategoria);
                            }}
                          >
                            {subcategoria}{" "}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <br></br>            
            <Button
              onClick={() => {
                setProductosFilter("");
                setCod_Producto("");
                setCod_SubCategoria("");
              }}
            >
              Borrar Filtros
            </Button>
            </div>
          </Form>
        </div>
        <DarkTable
          envios2={props.compra2}
          setEnvios2={props.setcompra2}
          posts={postFiltrados.length > 0 ? postFiltrados : postsInvalido}
          envios={props.compra}
          setEnvios={props.setcompra}
        />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  const [modalCargarCateg, setModalCargarCateg] = useState(false);
  const [compra, setCompra] = useState([])
  const [compra2, setCompra2] = useState([])
  return (
    <PageLayout
      // addInfo= {addcompra}
      compra={compra}
      setcompra={setCompra}
      modalCargarCateg={modalCargarCateg}
      compra2={compra2}
      setcompra2={setCompra2}
      setModalCargarCateg={setModalCargarCateg}
    >
      <MainContent
        compra={compra}
        setcompra={setCompra}
        compra2={compra2}
        setcompra2={setCompra2}
        modalCargarCateg={modalCargarCateg}
        setModalCargarCateg={setModalCargarCateg}
      />
    </PageLayout>
  );
}
