import Table from "react-bootstrap/Table";
import { useState } from "react";

function DarkTable(props) {
  const rows = props.posts;
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  const Popup = props => {
    return (
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>
    );
  };
  return (
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
                  onClick={togglePopup}
                />
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <b>esta es tu compra</b>
                        <p>
                          el producto esta bueno
                          
                        </p>
                      </>
                    }
                    handleClose={togglePopup}
                  />
                )}
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
  );
}

export default DarkTable;
