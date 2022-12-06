const Note = (note) => {
  
    return  (
    <li className="note">
    <span>{note.note.Producto} - {note.note.stock} </span> 
    
  </li>)
  
  }
export default Note;