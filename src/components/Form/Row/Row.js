import "../form.css"

const ageValidator = (value) => {
    return value>=0 && value<= 10000
}
const Row = ({register,errors,message,handleChange,selected}) =>{

    return(
        <div  className='rows'>
            <div className="txt_field">
                <input type="text"  {...register('Producto', {
                    required: true
                })}/>
                <span></span>
                <label>Producto:</label>
            </div>
            <div className="txt_field">
                <input  type="text"   {...register('Cantidad', {
                    required: true,
                    validate:ageValidator
                })}/>
                <span></span>
                <label>Cantidad:</label>
                {errors.age  && message("Colocar bien la cantidad")}
            </div>
            </div>
    )
}





export default Row

