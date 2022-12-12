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

const data = [
  // {producto: 'bicicleta', codigo: '456846'}

  { Producto: "Casco deportivo: 100, rojo", Cod_Producto: "213" },
  { Producto: "Calcetines para bicicleta de montaña, M", Cod_Producto: "218" },
];

const parseoParaDataFiltrada = (productoAFiltrar) => {
    return {
      Producto:productoAFiltrar.Producto,
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
  const [posts2, setPosts2] = useState([]);
  const [modal, setModal] = useState(false);

  const { modalCargarCateg, setModalCargarCateg } = props;

  const [dataFiltrado,setDataFiltrado] = useState([])
  const [productosFilter, setProductosFilter] = useState("");
  const [Cod_Producto, setCod_Producto] = useState("");
  const [Cod_SubCategoria, setCod_SubCategoria] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [k, setk] = useState(1);

  useEffect(() => {
    fetch("https://strnico2022n.blob.core.windows.net/output/salidaprod (6).json")
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
            categoria.subcategorias.some((e) => e === post.SubCategoria)
          );
          if (index > -1 && !subCategoriaExist) {
            categoriasArray[index].subcategorias.push(post.SubCategoria);
          }
        });
        setCategorias(categoriasArray);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const addInfo = (infoObject) => {
    
    setk(k + 1);
    console.log("hola", infoObject);
    console.log(envios)
    setNotes([])
    setErrorMessage('se guardo exitosamente')
    if(envios.length<10){
      console.log('no se envia por el largo es', envios.length)
    }else{
      fetch(
        "https://strnicoaccount1012.blob.core.windows.net/input/salida.json?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupyx&se=2022-12-11T04:11:15Z&st=2022-12-10T20:11:15Z&spr=https&sig=uqsRVFVAXd2cUC1K75Nhi9nEd6KyvWJUZlafqYh9g9Y%3D",
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
  };


  const filterConditions = (producto) => {
    let cumple = false;
    if(productosFilter === "") cumple=true ;
    if (producto.Producto.toLowerCase().includes(productosFilter.toLowerCase()))   cumple = true;
    if (productosFilter == producto.Cod_Producto)  cumple = true;
    if (productosFilter == producto.Cod_SubCategoria )  cumple = true;

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
  const [stock,setStock] = useState(0);

  const addNote = (note) => {
    const newNote = { ...note };
    newNote.stock = stock
    if(newNote.stock>0){

      setNotes(notes.concat(newNote))
      setErrorMessage('')
      setEnvios(envios.concat(newNote))
    }
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
          <Modal.Header closeButton>
            <Modal.Title>Cargar producto</Modal.Title>
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
              <input onChange={(e)=>{console.log("asdsadasda",e.target.value);setStock(e.target.value)}}defaultValue={"stock"} type={"number"}></input>
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
              <button
                className="btn btn-primary"
                onClick={() => addInfo(notes)}
              >
                guardar
              </button>
            {/* <Form2 onClick={addInfo} message={setErrorMessage} /> */}
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
                <Form.Control
                  onChange={(e) => setProductosFilter(e.currentTarget.value)}
                  placeholder=""
                  defaultValue=""
                />
              </Col>
            </Form.Group>

            {/* <Dropdown autoClose={"outside"}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categorias
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {categorias.map((categoria) => (
                  <Dropdown.Item href="#/action-1">
                    <Dropdown as={ButtonGroup}>
                      <Button
                        variant="success"
                        onClick={() => setCod_Producto(categoria.categoria)}
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

            <Button
              onClick={() => {
                setProductosFilter("");
                setCod_Producto("");
                setCod_SubCategoria("");
              }}
            >
              Borrar Filtros
            </Button> */}
          </Form>
        </div>
        <DarkTable posts={posts.filter(filterConditions) } envios = {posts2} setEnvios = {() => setEnvios} />
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function App() {
  const [modalCargarCateg, setModalCargarCateg] = useState(false);

  return (
    <PageLayout
      // addInfo= {addcompra}
      // compra = {posts2}
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
