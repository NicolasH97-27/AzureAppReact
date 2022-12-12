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


  


  const increaseByOne = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)
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
  const addNote = (note) => {
    const newEnvios = { ...note };
    newEnvios.stock = counter
    if(newEnvios.stock>0){
      props.setEnvios((props.envios).concat(newEnvios))
      props.setEnvios2((props.envios2).concat(newEnvios))
      setToZero()
      console.log(props.envios)
      
    }
    
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
                Color: {listac.Color}
                <br />
                Cod_Producto: {listac.Cod_Producto}
                <br />
                Cod_SubCategoria: {listac.Cod_SubCategoria}
                <br />
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
            <th>Producto</th>
            <th>Codigo Producto</th>
            <th>Codigo SubCategoria</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            return (
              <tr key={i}>
                <td>
                  <input
                    type="button"
                    value="comprar"
                    onClick={() => {
                      setListac(row);
                      togglePopup();
                    }}
                  />
                </td>
                <td>{row.Producto}</td>
                <td>{row.Cod_Producto}</td>
                <td>{row.Cod_SubCategoria}</td>
                <td>{row.Color}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default DarkTable;
