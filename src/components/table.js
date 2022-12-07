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
            Cod_Producto
            </th>
            <th>
            Cod_SubCategoria
            </th>
            <th>
            Color
            </th>
          </tr>
    
      </thead>
      <tbody>
      {rows.map((row ,i)=>{
                
                return(
                  
                  <tr key = {i}>
                  <td>{row.Producto}</td>
                  <td>{row.Cod_Producto}</td>
                  <td>{row.Cod_SubCategoria}</td>
                  <td>{row.Color}</td>
                  </tr>
                )
      })}
      </tbody>
    </Table>
  );
}

export default DarkTable;