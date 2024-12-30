// ** React Imports
//import { Link, useNavigate } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
// ** Styles
import '@styles/react/pages/page-authentication.scss'

const Panel = () => {

    const dataStorage = JSON.parse(localStorage.getItem("userData"))
    console.log("LOCAL STORAGE: ", localStorage.getItem("userData"))
    console.log("LOCAL STORAGE Role: ", dataStorage)
    const navigate = useNavigate()
    const DisabledUser = (e, Rol) => {
        e.preventDefault()

        if (Rol === "Administrador") {
            dataStorage.role = "Administrador"
            localStorage.setItem("userData", JSON.stringify(dataStorage))
            navigate('/admin/modificar-usuarios')
        }
        
        if (Rol === "Importador") {
            dataStorage.role = "Máster Importador"
            localStorage.setItem("userData", JSON.stringify(dataStorage))
            navigate('/Importador-Home')
        }

        if (Rol === "Exportador") {
            dataStorage.role = "Máster Exportador"
            localStorage.setItem("userData", JSON.stringify(dataStorage))
            navigate('/dashboard/analytics')
        }
    }

  return (
    <div className="d-flex p-5 justify-content-center">
        <Row>
            <Button color='primary' style={{ margin: "10px" }} onClick={(e) => DisabledUser(e, "Administrador")}> Administrador </Button>
            <Button color='primary' style={{ margin: "10px" }} onClick={(e) => DisabledUser(e, "Importador")}> Importador </Button>
            <Button color='primary' style={{ margin: "10px" }} onClick={(e) => DisabledUser(e, "Exportador")}> Exportador </Button>
        </Row>
        
    </div>
  )
}

export default Panel
