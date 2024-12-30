// ** React Imports
import { Fragment, useState/*, useCallback*/, useMemo, useEffect  } from 'react'
//import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button,
    Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form, Spinner, List
} from 'reactstrap'

//import { Edit, UserPlus, Copy, Circle, Box, Package, AlertTriangle, RotateCw, Server, Grid, Home, Truck, User, Clipboard, UserX } from 'react-feather'
// ** Third Party Components

//import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
//import axios from 'axios'
//import InputPasswordToggle from '@components/input-password-toggle'
import { useDropzone } from 'react-dropzone'
import { getUserData } from '@utils'
import axios from 'axios'
import Select from 'react-select'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'
import { Save, CheckCircle, XCircle } from 'react-feather'

import SpinnerComp from '../../Utils/Spinner'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
  }
  
  const focusedStyle = {
    borderColor: '#2196f3'
  }
  
  const acceptStyle = {
    borderColor: '#00e676'
  }
  
  const rejectStyle = {
    borderColor: '#ff1744'
  }

  
const SubirArchivos = (props) => {

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
      } = useDropzone({    
        maxFiles:3,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'application/pdf': [],
            'application/vnd.ms-excel': [],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
            'text/csv': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': []
        }
      })

    const user = getUserData()
    const token = user.accessToken
    const [Empresas, setEmpresas] = useState([])
    const [modal, setmodal] = useState({ modal: false })
    const [modalBody, setmodalBody] = useState({error: false, mensaje: "¡Archivo Enviado!", BlackList: []})
    const [dataFile, setDataFile] = useState({ client: "", description:"", listUsers:[], file: null, contacts:[] })
    const [ValueUsersMultiple, setUsersMultiple] = useState([])
    const [spinnerDownload, setspinnerDownload] = useState(false)
    const [spinner, setspinner] = useState(false)
            // {
        //     value: "002001-001",
        //     label: "Sandra Mendoza"
        // },
        // {
        //     value: "CO000338",
        //     label: "Andres Pulgarin"
        // }
    const [listaBlanca, setlistaBlanca] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEmpresasMultiple = e => {
        const trackingCustomersaux = []
        const aux = e.map(function(p) {
            trackingCustomersaux.push(p.value)
            return p
        })
        
        console.log("E: ", aux)
        setDataFile({...dataFile, listUsers: aux, contacts: trackingCustomersaux})
        console.log("trackingCustomers: ", trackingCustomersaux)
        if (false) {
            
            setlistaBlanca(trackingCustomersaux)
            
            console.log("trackingCustomers: ", trackingCustomersaux)
            console.log("ValueUsersMultiple: ", ValueUsersMultiple)
        }
        
    }


    const handleChange = event => {
        console.log("Entra a File 1")
        if (event.target.id === "Client") {
            
            setDataFile({...dataFile, client: event.target.value})
        }

        if (event.target.id === "Description") {
            
            setDataFile({...dataFile, description: event.target.value})
        }

        if (event.target.id === "file") {
            console.log("Entra a File")
            setDataFile({...dataFile, file: event.target.files[0] })
        }

        console.log("dataFile: ", dataFile)
        
    }
     
      console.log("acceptedFiles: ", acceptedFiles)

      const acceptedFileItems = acceptedFiles.map(file => (
        
        <li key={file.path}>
          {file.path} - {file.size} bytes
        </li>
      ))
    
      const fileRejectionItems = fileRejections.map(({ file, errors  }) => { 
       return (
         <li key={file.path}>
              {file.path} - {file.size} bytes
              <ul>
                {errors.map(e => <li key={e.code}>{e.message}</li>)}
             </ul>
    
         </li>
       ) 
      })

      const {
        //getRootProps,
       // getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
      } = useDropzone({accept: {'image/*': []}})
    
      const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isFocused,
        isDragAccept,
        isDragReject
      ])

      const toggle = (e) => {
        e.preventDefault()

        setmodal({ modal: !modal.modal })
    }

    //Get Empresas
    const empresas = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=3',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    }) 

    useEffect(() => {
        setspinner(true)
        empresas.get('')
        .then(response => {
            setspinner(false)
            setEmpresas(response.data.data)
        }).catch(error => {

            if (error.response.status === 401) {
              
              dispatch(handleLogout())
              navigate('/Login')
              alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
            } 
    
          })
    }, [])
   

    useEffect(() => {
        //Get usuarios por empresa
        setspinner(true)
        console.log("lista blanca: ", listaBlanca)
        const GetUsers = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Users/All',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })
        GetUsers.post('', {
            customerId: dataFile.client
        })
            .then(response => {
                setspinner(false)
                const responseget = response.data.data

                const formatresponse = responseget.map(item => {
                    const obj = {}
                    obj["value"] = item.id
        
        
                    obj["label"] = item.name
                    return obj
                  })
                  console.log(formatresponse)
                  //setUsersMultiple(formatresponse)

        })

        const Contactos = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Contacts', //007001-001
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })
    
        //Contactos
    
        Contactos.get(`ByCustomer?customerId=${dataFile.client}`)
            .then(response => {
                console.log("Response: ", response)
                
                const responseget = response.data.data

                const formatresponse = responseget.map(item => {
                    const obj = {}
                    obj["value"] = item.id
        
        
                    obj["label"] = item.name
                    return obj
                  })
                  setUsersMultiple(formatresponse)
                //setValueContratoSelect(response.data.data)
            })

        //Get lista blanca por empresa
        const GetlistaBlanca = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Contacts/InventoryNotification?customerId=${dataFile.client}`,
            headers: { Authorization: `Bearer ${token}` }
        }) 
        GetlistaBlanca.get('')
        .then(response => {
            console.log("response.data** Empresas: ", response.data)
            const responseget = response.data.data //[{id: "002001-001", name: "Sandra Mendoza", email: "harold.bartolo@techy-we.com"}]

            const formatresponse = responseget.map(item => {
                const obj = {}
                obj["value"] = item.id
    
    
                obj["label"] = item.name
                return obj
              })
            setDataFile({...dataFile, listUsers: formatresponse})
            //setlistaBlanca(response.data.data)
        })


        setlistaBlanca([
            {
                id: "CO000337",
                name: "Harold Andres Bartolo",
                email: "harold.bartolo@techy-we.com"
            },
            {
                id: "CO000338",
                name: "Andres Pulgarin",
                email: "andres.pulgarin@techy-we.com"
            }
        ])
    }, [dataFile.client])    

    // Insertar archivos al state del formulario
    useEffect(() => {
        const formData = new FormData()
        formData.append('file', acceptedFiles)
        // formData.append('description', acceptedFiles)
        // formData.append('customerId', acceptedFiles)
        setDataFile({...dataFile, file: acceptedFiles})
    }, [acceptedFiles])

    // Enviar Datos
    const SaveData = (e) => {
        setspinner(true)
        setspinnerDownload(true)
        e.preventDefault()
        if (dataFile.file && dataFile.client && dataFile.description) {
            const formDataSend = new FormData()
            
            formDataSend.append('Description', dataFile.description)
            formDataSend.append('CustomerId', dataFile.client)
            //formDataSend.append('Contacts', dataFile.contacts)

            for (let i = 0; i < acceptedFiles.length; i++) {
                formDataSend.append('Files', acceptedFiles[i])
            }
            if (dataFile.listUsers.length  > 0) {
                for (let i = 0; i < dataFile.listUsers.length; i++) {
                    formDataSend.append('Contacts', dataFile.listUsers[i].value)
                }
            } else {
                formDataSend.append('Contacts', null)
            }    
                
            
            const savefile = axios.create({
                //
                baseURL: 'http://10.10.21.5:8080/api/Files/Upload',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })

            savefile.post('', formDataSend)
            .then(response => {
                console.log("Respuesta***: ", response)
                if (response.data.header === 402) {
                    console.log("Error de correos")
                    setspinnerDownload(false)
                    setspinner(false)
                    setmodalBody({error: true, mensaje: "¡Archivo no Enviado!", BlackList: response.data.data})
                    setmodal({ modal: !modal.modal })
                    setDataFile({ client: "", description:"", file: null, listUsers:[] })
                } else {
                    setspinnerDownload(false)
                    setspinner(false)
                    setmodalBody({error: false, mensaje: "¡Archivo Enviado!", BlackList: response.data.data})
                    setmodal({ modal: !modal.modal })
                    setDataFile({ client: "", description:"", file: null, listUsers:[] })
                }
                
            }, error => {
                
                console.error('Función de rechazo llamada: ', error)
            })
            setDataFile({ client: "", description:"", file: null, listUsers:[] })
        }
    }
    
    return (
        <Fragment>
            <SpinnerComp message="Cargando..." estado={spinner}  />
            {/* Modal para Deshabilitar usuario */}
            <div>
                <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody style={{display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center"}}>
                    {
                        modalBody.error ? <XCircle width="30%" height="30%" color='red' style={{ marginTop: "15px" }} /> : <CheckCircle width="30%" height="30%" color='green' style={{ marginTop: "15px" }} />
                    }
                    
                    <p style={{ fontWeight: "bold",  marginTop: "15px" }}>{modalBody.mensaje}</p>

                    {
                        modalBody.error && 
                        <>
                        <p>Los siguientes usuarios no tienen correo asignado</p>
                        <List>
                            {modalBody.BlackList.map((user, index) => <li key={index}>{user}</li>)
                            }
                        </List>
                        </>

                    }
                    
                </ModalBody>
                <ModalFooter>
                    {/* <Button color="primary"  onClick={SaveData}>ok</Button>{' '} */}
                    <Button color="primary"  onClick={toggle}>Cerrar</Button>
                    {/* <Button color="secondary" onClick={toggle}>Cancelar</Button> */}
                </ModalFooter>
                </Modal>
            </div>
            <Card style={{background: "#cce5fd"}}>
                <CardBody>
                    <Row>
                        <div className='mb-2'>
                            <Label for='country' className='form-label'>
                                Cliente
                            </Label>
                            <Input type='select' value={dataFile.client}
                                label='Controlled'
                                id='Client'
                                onChange={handleChange}
                                invalid={!dataFile.client ? true : null}
                            >
                                <option key={8} value="">seleccionar</option>
                                {Empresas.map((emp, index) => <option key={index + 100} value={emp.id}>{emp.name}</option>)
                                }

                            </Input>
                        </div>
                        <div className='mb-2'>
                            <Label for='country' className='form-label'>
                                Usuarios
                            </Label>
                            <Select
                                // defaultValue={ listaBlanca ? listaBlanca.map(sub => ({ label: sub.name, value: sub.id})) : [{value:"prueba", label:"prueba"}]}
                                onChange={(e) => handleEmpresasMultiple(e)}
                                isMulti
                                name="colors"
                                options={ValueUsersMultiple.map(sub => ({ label: sub.label, value: sub.value}))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={dataFile.listUsers.map(sub => ({ label: sub.label, value: sub.value}))}
                                    
                            />
                        </div>
                        <div className='mb-2'>
                            <Label for="exampleText">Descripción</Label>
                            <Input 
                                type="textarea" 
                                name="text" 
                                id="Description"
                                value={dataFile.description}
                                onChange={handleChange} />
                        </div>
                        <div className='mb-2'>
                            <div {...getRootProps({ style })}>
                                <Input type="file" {...getInputProps()} id="file" onChange={handleChange}/>
                                <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
                                <em>(Maximo 3 archivo)</em>
                            </div>
                            <aside>
                                <p>Archivo seleccionado: </p>
                                <ul>{acceptedFileItems}</ul>
                                <p>Archivos rechazados: </p>
                                <ul>{fileRejectionItems}</ul>
                            </aside>
                        </div>
                        <Col style={{marginBottom:"20px", display:"none"}} sm="6" md={{ size: 6, offset: 4 }}>
                            <Button color="primary" md={{ size: 3, offset: 2 }} >Agregar Registros</Button>
                        </Col>
                            
                    </Row>

                    <Row>
                        <Col sm="6" md={{ size: 3, offset: 2 }}>
                            
                            <Button color="primary" onClick={SaveData}>
                            {
                                spinnerDownload ? <Spinner/> : <Save/> 
                            }</Button>
                        </Col>
                        <Col sm="6" md={{ size: 3, offset: 2 }}>
                            <Button color="secondary" onClick={toggle}>Cancelar</Button>
                        </Col>
                    </Row>
                    
                </CardBody>
            
            </Card>

            
        </Fragment>
    )
}

export default SubirArchivos
