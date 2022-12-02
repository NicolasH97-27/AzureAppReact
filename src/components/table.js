import Table from 'react-bootstrap/Table';


function DarkTable(props) {
  
  const rows = props.posts
  return (
    <Table>
      <thead>
         <tr>
            <th>
             Producto
            </th>
            <th>
            Categoria
            </th>
            <th>
            SubCategoria
            </th>
            <th>
            Sucursal
            </th>
            <th>
            Cantidad
            </th>
          </tr>
    
      </thead>
      <tbody>
      {rows.map((row ,i)=>{
                
                return(
                  
                  <tr key = {i}>
                  <td>{row.Producto}</td>
                  <td>{row.Categoria}</td>
                  <td>{row.SubCategoria}</td>
                  <td>{row.Sucursal}</td>
                  <td>{row.Cantidad}</td>
                  </tr>
                )
      })}
      </tbody>
    </Table>
  );
}

export default DarkTable;