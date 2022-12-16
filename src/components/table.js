import Table from "react-bootstrap/Table";
import { useState } from "react";
import Note from "./Note";
import { set } from "react-hook-form";

function DarkTable(props) {
  const rows = props.posts;
  const [isOpen, setIsOpen] = useState(false);
  const [listac, setListac] = useState();
  const [note, setNote] = useState();
  const [counter, setCounter] = useState(0)
  //alvaro
  const [productoloco,setProductoloco] =useState([]);
  const [listaFiltrada,setListaFiltrada] = useState([]);
  const [maximo,setMaximo] = useState(0);
  const [mensaje,setmensaje] = useState('');
  
  


  const increaseByOne = () => {
    setmensaje(counter >= maximo ? 'No hay mas stock': '')
    setCounter(counter < maximo ? counter + 1 : counter)
  }
    
  const setToZero = () => setCounter(0)
  const togglePopup = (e) => {
    setIsOpen(!isOpen);
    setCounter(0)
    setmensaje('')
    
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
  const addNote = (note) => {
    const newEnvios = { ...note };
    newEnvios.stock = counter
    if(newEnvios.stock>0){
      props.setEnvios((props.envios).concat(newEnvios))
      props.setEnvios2((props.envios2).concat(newEnvios))
      setToZero()
      
      
    }
    
  }

  function hayStock(codigoProducto) {

    fetch("https://datalakesiglo21.blob.core.windows.net/getsfront/cuandoHayStock.json")
  
      .then((response) => response.json())

      .then((data) => {
        console.log('data', data[0].Cod_Producto)
        const filterdata = data.filter((x) => x.Cod_Producto === codigoProducto).sort((a,b) => b.StockReal - a.StockReal)
        console.log('codigo producto: ',codigoProducto)
        console.log('filterdata: ',filterdata)
        
        
        if(filterdata.length>0){
          setMaximo(filterdata[0].StockReal)
          
        }else{
          setMaximo(0)
        }
        })
 
      .catch((err) => {
        console.log(err.message);
      });
  }



  return (
    <div>
      {isOpen && (
        <Popup
          content={
            <>
              <b>esta es tu compra</b>
              <p>
                <br />
                Tu producto: {listac.Producto}
   
                <br />
                Cod_Producto: {listac.Cod_Producto}
                <br />
              <div>
                  <div>{counter}</div>
                  <button onClick={increaseByOne}>plus</button>
                  <button onClick={setToZero}>zero</button>
                </div>
                <br />

                <button
                  className="btn btn-primary"
                  onClick={() => addNote(listac)}
                >
                comprar
                </button>
                <br></br>
                <br></br>
                <br></br>
                <h3>
                  {mensaje}

                </h3>
                
              </p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>{rows[0]?.Sucursal ? 'Producto con stock' : 'Productos' }</th>
            <th>{rows[0]?.Sucursal ? 'StockReal' : 'Categoria' }</th>
            <th>{rows[0]?.Sucursal ? 'Sucursal' : 'Subcategoria'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            if(i<20){

              return (
               
                  <tr key={i}>
                    <td>
                      <input
                        type="button"
                        value="comprar"
                        onClick={() => {
                          hayStock(row.Cod_Producto);//producto
                          setListac(row);
                          togglePopup();
                        }}
                      />
                    </td>
                    <td>{row.Producto}</td>
                    <td>{row.StockReal ? row.StockReal :row.Categoria}</td>
                    <td>{row.StockReal ? row.Sucursal :row.SubCategoria}</td>
                  </tr> )
            }else{
              return('')
            }
            
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DarkTable;
