import { useForm } from "react-hook-form"
import "./form.css"
import { useState, useEffect} from "react"
import Row from "./Row/Row"


const Form = ({info,onClick,message}) =>{
    
    
    const {register,formState : {errors}, handleSubmit} = useForm()
    const [selected,setSelected] = useState()
    
    

    const onSubmit = (data) =>{
        onClick(data)   
        message("Guardaste tu producto")
        setTimeout(() => {
            message(null)
        }, 5000)
        
    }

    const errorMessege = (data) => {
        message(data)
    }

    const handleChange = event => {
        setSelected(event.target.value);
    };
    const rows = [0]
    return  (
        <form  onSubmit={handleSubmit(onSubmit)}>
            <div className="conteiner-formulario">

            <div className="colums">
            {rows.map(rows=>{
                return(
                    <Row
                    key={rows}
                    register={register}
                    errors={errors}
                    message={errorMessege}
                    handleChange={handleChange}
                    selected={selected}
                    />
                )
            })}
            </div>
            <input className="guardar" type="submit" value="guardar cambios"/>
            </div>
        </form>
       

    )
}

export default Form