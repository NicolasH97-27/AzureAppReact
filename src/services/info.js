import axios from 'axios'

const TENANTID = '71d929a5-af77-473e-bf1a-0d41e1affefe' //de active directory
const SUSCRIPTIONID = '9cd6251c-8a67-432f-a673-0c45fb77031c' //de active directory
const GRUPODERECURSOS = 'resourcenico2022n' //de active directory
const DATAFACTORY = 'adfPruebaAPI' //de active directory
const BLOBPILELINE = 'adfPruebaAPI' //de active directory


const baseUrl = "https://login.microsoftonline.com/"+TENANTID+"/oauth2/token"

let token = null

const getAll = () => {

  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl,config)

  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {
        "Accept": "*/*",//toma lo que hay al principio de la barra y lo que haya despues
        "Content-Type": "application/x-www-form-urlencoded",
      },
    body: JSON.stringify(
      {
        "grant_type": "client_credentials",
        "client_id":  "43c7e752-14dc-47a3-afae-932fcccd5a70",//id de la aplicacion
        "client_secret": "sj08Q~INNS0jDmRWwYtmCJAtI1Rzmk9W0DE~mbdf", //se busca en la llavesita, certificados  y secretos
        "resource": "https://management.azure.com/", //la aplicacion es como un usuario le tenes que dar el permiso
      })
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const metodos = { 
  getAll: getAll, 
  create: create, //Dado que los nombres de las claves y las variables asignadas son los mismos, 
                  //podemos escribir la definición del objeto con una sintaxis más compacta: {getAll,create,update}
  update: update,
}

export default metodos;