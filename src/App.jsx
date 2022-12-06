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

  const [productosFilter, setProductosFilter] = useState("");
  const [Cod_Producto, setCod_Producto] = useState("");
  const [Cod_SubCategoria, setCod_SubCategoria] = useState("");

  const [categorias, setCategorias] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [k, setk] = useState(1);

  useEffect(() => {
    fetch("https://strnico.blob.core.windows.net/productos/testoutput.json")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
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
    if(infoObject.length>0){
      console.log("ATENCION: no se puede enviar")
    }else{
      fetch(
        "https://strnico.blob.core.windows.net/input/" +
          k +
          ".json?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupyx&se=2022-11-30T20:27:35Z&st=2022-11-30T12:27:35Z&spr=https&sig=XD%2BVqNAyPcKXVbu9lUuukBIpguwyhi5FSBnQ469LqMs%3D",
        {
          method: "PUT",
          headers: {
            "x-ms-blob-type": "BlockBlob",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infoObject),
        }
      )
        .then((response) => response.json())
        .then((response) => console.log(JSON.stringify(response)));
      console.log("hola", infoObject);
      setNotes([])
      setErrorMessage('se guardo exitosamente')
    }
  };


  const filterConditions = (producto) => {
    let cumple = true;

    if (productosFilter !== "" && !producto.Producto.includes(productosFilter))
      cumple = false;
    if (Cod_Producto !== "" && Cod_Producto !== producto.Cod_Producto)
      cumple = false;
    if (
      Cod_SubCategoria !== "" &&
      Cod_SubCategoria !== producto.Cod_SubCategoria
    )
    cumple = false;

    return cumple;
  };
  // ************************************************************************************************
  // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaalgoque no se que onda ahre es el AUTOCOMPLETAR
  // K

  // *******************************************************************************************************
  const [presidentes, setPresidentes] = useState(data);
  const [value, setValue] = useState("");
  const [presidenteSeleccionado, setPresidenteSeleccionado] = useState({});

  const onSuggestionsFetchRequested = ({ value }) => {
    setPresidentes(filtrarPresidentes(value));
  };

  const filtrarPresidentes = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    var filtrado = data.filter((Cod_Producto) => {
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
  const [stock,setStock] = useState(0)

  const addNote = (newNote) => {
    newNote.stock = stock 
    console.log(newNote)
    setNotes(notes.concat(newNote))
    setErrorMessage('')
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
            </Button>
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
