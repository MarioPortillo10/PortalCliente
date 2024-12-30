// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// ** Third Party Components

import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import { Search, Trash, Download } from 'react-feather'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../../Utils/Spinner'

const ActualizarArchivos = (props) => {
    
    const [valueIng, setValueIng] = useState('')
    const [valueFiles, setValueFiles] = useState([])
    const [valueRemolque, setValueRemolque] = useState('')
    const [valueDateIn, setValueDateIn] = useState('')
    const [valueDateFin, setValueDateFin] = useState('')
    const user = getUserData()
    const [valueError, setValueError] =  useState({producto: false, fechaIn: false, fechaFin: false, Remolque: false})
    const [dataFile, setDataFile] = useState({ client: "", dateIn:"", dateFin: "", name:"" })
    const [Empresas, setEmpresas] = useState([])
    const [modalDelete, setmodalDelete] = useState({ modal: false })
    const [userDelete, setuserDelete] = useState({name: '', number:''})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [spinner, setspinner] = useState(false)

  
    const token =  user.accessToken
  
    const instance = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
    })

    const handleChange = event => {

        if (event.target.id === "Client") {
            
            setDataFile({...dataFile, client: event.target.value})
        }


        if (event.target.id === "Ingenio") {
            setValueIng(event.target.value)
            if (!event.target.value) {
                    setValueError({...valueError, producto: true})
            } else {
                    setValueError({...valueError, producto: false})
            }
        } 

        if (event.target.id === "Remolque") {
            setValueRemolque(event.target.value)
            if (!event.target.value) {
                setValueError({...valueError, Remolque: true})
            } else {
                    setValueError({...valueError, Remolque: false})
            }
        }

        if (event.target.id === "fechaInicial") {
            setValueDateIn(event.target.value)
            if (!event.target.value) {
                setValueError({...valueError, fechaIn: true})
            } else {
                    setValueError({...valueError, fechaIn: false})
            }
        }

        if (event.target.id === "fechaFinal") {
            setValueDateFin(event.target.value)
            if (!event.target.value) {
                setValueError({...valueError, fechaFin: true})
            } else {
                    setValueError({...valueError, fechaFin: false})
            }
        }
        
      }

      const Transacciones = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })


      const ValidateError = () => {
        console.log("****************************: ", valueIng)
            const campos = {producto: false, fechaIn: false, fechaFin: false, Remolque: false}
            if (!valueIng) {
                campos.product = true
                setValueError(campos)
                console.log("****************************: ", valueIng)
                //return false
            } else {
                setValueError({...valueError, producto: false})
            }

            if (!valueRemolque) {
                campos.Remolque = true
                setValueError(campos)
                console.log("****************************: ", valueIng)
                //return false
            } else {
                setValueError({...valueError, Remolque: false})
            }

            if (!valueDateIn) {
                setValueError({...valueError, fechaIn: true})
                console.log("****************************: ", valueIng)
                //return false
            } else {
                setValueError({...valueError, fechaIn: false})
            }

            if (!valueDateFin) {
                console.log('valueError: ', valueError)
                setValueError({...valueError, fechaFin: true})
                //return false
            } else {
                setValueError({...valueError, fechaFin: false})
            }

            //return true
      }

      const instanceFilesList = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Files/DocumentList',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

      const handleAddEventClick = () => {
            setspinner(true)
            if (/*valueDateFin && valueDateIn && valueRemolque*/ true) {
                instanceFilesList.post('', {
                    startDate: new Date(valueDateIn), //"2023-02-24T14:21:17.141Z",
                    finalDate: new Date(valueDateFin), //"2023-02-24T14:21:17.141Z",
                    fileName: valueRemolque, //"string"
                    customerId: dataFile.client,
                    pageNumber: 1,
                    pageSize: 400
                      
                })
                  .then(response => {
                      setspinner(false)
                      setValueFiles(response.data.data)
        
                  })
            }
      }

      const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Files/Document', //'http://10.10.21.5:8080/api/File/GetDocument',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

      const handleReporte = (e, number, uploadDate, name) => {
            e.preventDefault()
            setspinner(true)
            ReporteDownload.post('', {
                number,
                uploadDate,
                name
              })
            .then(response => {
                setspinner(false)
                const linkSource = `data:application/pdf;base64,${response.data.data.base64FileContent}`
                const downloadLink = document.createElement("a")
                const fileName = name

                downloadLink.href = linkSource
                downloadLink.download = fileName
                downloadLink.click()
            })
      }

    //Get Empresas
    const empresas = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=3',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    }) 

    // Delete File:
    const handleReporteDelete = (e) => {

        e.preventDefault()
        setspinner(true)
        const ReporteDelete = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Files/Delete', //'http://10.10.21.5:8080/api/File/GetDocument',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })

        ReporteDelete.post('', {
            number: userDelete.number
          })
        .then(response => {
            console.log("Response: ", response)
            setspinner(false)
            setmodalDelete({ modal: !modalDelete.modal })
            instanceFilesList.post('', {
                startDate: null, //"2023-02-24T14:21:17.141Z",
                finalDate: null, //"2023-02-24T14:21:17.141Z",
                fileName: null, //"string"
                customerId: null,
                pageNumber: 1,
                pageSize: 400
                  
            })
              .then(response => {
                  console.log("Response: ", response)
                  setValueFiles(response.data.data)
    
              })
        })
    }


    const toggleDelete = (e, name, id) => {
        e.preventDefault()

        setuserDelete({name, number: id})
        setmodalDelete({ modal: !modalDelete.modal })
        if (false) {
            
            setmodalDelete({ modal: !modalDelete.modal })
        }
        
    }


    const handleChangeRemolque = event => {

        if (event.target.value) {
            setValueError({...valueError, producto: false})
            console.log("valueError: ", valueError)
        }
         console.log(event.target.value)
         setValueRemolque(event.target.value)
      }


    useEffect(() => {
        
          instance.post('', {
            productCategoryId: "3PL-012",
            startDate: "2020-02-10T00:00:00.004Z",
            finalDate: "2023-03-09T11:49:31.204Z",
            trailerNumber: "RE6317",
            pageNumber: 3,
            pageSize: 400
        })
          .then(response => {
              console.log("Response: ", response)

          })
      }, [])
   

      const basicColumns = [
        {
          name: 'Numero',
          sortable: true,
          minWidth: '100px',
          maxWidth: '150px',
          selector: row => row.number
        },
        {
          name: 'Fecha',
          sortable: true,
          minWidth: '250px',
          maxWidth: '250px',
          selector: row => row.uploadDate
        },
        {
          name: 'Nombre de documento',
          sortable: true,
          minWidth: '250px',
          maxWidth: '380px',
          selector: row => row.name
        },
        {
            name: 'Documento',
            cell:(row) => [<Button color='primary'  size="sm"  onClick={(e) => handleReporte(e, row.number, row.uploadDate, row.name)} id={row.number}><Download/></Button>, <Button style={{ margin: "10px" }} color="danger" size="sm" onClick={(e) => toggleDelete(e, row.name, row.number)} id={row.number}><Trash/></Button>],
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '250px'
        }
      ]

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

        instanceFilesList.post('', {
            startDate: null, //"2023-02-24T14:21:17.141Z",
            finalDate: null, //"2023-02-24T14:21:17.141Z",
            fileName: null, //"string"
            pageNumber: 1,
            pageSize: 100
              
        })
          .then(response => {
              setValueFiles(response.data.data)

          })

        // const dataTest = {
        //     data: [
        //         {
        //             number: "1b5df3f6-a091-4795-a91d-096cd714802f",
        //             name: "ESTIMACIÓN ACTIVIDADES CREACIÓN SEGUROS AXA.pdf",
        //             uploadDate: "2023-03-29T15:00:40.027"
        //         }
        //     ]
        // }

        // setValueFiles(dataTest.data)

    }, [])


    // Get Files
    useEffect(() => {
        instanceFilesList.post('', {
            startDate: "2023-01-03T00:48:48.862Z", //new Date(valueDateIn), //"2023-02-24T14:21:17.141Z",
            finalDate: "2023-03-30T00:48:48.862Z", //new Date(valueDateFin), //"2023-02-24T14:21:17.141Z",
            fileName: "", //valueRemolque//"string"
            pageNumber: 1,
            pageSize: 30
              
        })
          .then(response => {
              console.log("Response: ", response)
              //setValueFiles(response.data.data)

          })
    }, [])
      
  return (
    <Fragment>
        <SpinnerComp message="Cargando..." estado={spinner}  />
        {/* Modal para Deshabilitar usuario */}
        <div>
            <Modal isOpen={modalDelete.modal} toggle={toggleDelete} className={props.className}>
                <ModalHeader toggle={toggleDelete}>Deshabiltar Usuario </ModalHeader>
                <ModalBody>
                    ¿ Estas seguro que deseas Eliminar el archivo {userDelete.name} ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"  onClick={(e) => handleReporteDelete(e)}>Si</Button>
                    <Button color="secondary" onClick={toggleDelete}>No</Button>
                </ModalFooter>
            </Modal>
        </div>
        <Card style={{background: "#cce5fd"}}>
            <CardBody>
            <CardTitle>Archivos</CardTitle>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
                <Col lg='2' sm='6'>
                     <Label for='country' className='form-label'>
                         Cliente
                     </Label>
                     <Input type='select' value={dataFile.client}
                         label='Controlled'
                         id='Client'
                         onChange={handleChange}
                        
                     >
                         <option key={8} value="">seleccionar</option>
                         {Empresas.map((emp, index) => <option key={index + 100} value={emp.id}>{emp.name}</option>)
                     }
                     </Input>
                </Col>
                <Col lg='2' sm='6'>
                    <Label for="exampleSelect">Inicio</Label>
                    <Input  
                    type="date" 
                    name="date" 
                    id="fechaInicial" 
                    placeholder="datetime placeholder"
                    onChange={handleChange}
                    value={valueDateIn}
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}
                    />
                    { valueDateIn ? null : <FormFeedback>Ingresa una fecha inicial</FormFeedback>
                    }
                </Col>
                <Col lg='2' sm='6'>
                    <Label for="exampleSelect">Fin</Label>
                    <Input  
                    type="date" 
                    name="date" 
                    id="fechaFinal" 
                    placeholder="datetime placeholder"
                    onChange={handleChange}
                    value={valueDateFin}
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}//2023-02-22
                    />
                    { valueDateFin ? null : <FormFeedback>Ingresa una fecha final</FormFeedback>
                    }
                </Col>
                <Col lg='4' sm='6'>
                    <Row className='match-height'>
                        <Col lg='6' sm='6'> 
                            <Label for="exampleSelect">Documento</Label>
                            <Input type="text" 
                            name="select" 
                            id="Remolque"
                            value={valueRemolque}
                            onChange={handleChangeRemolque}
                            />
                            { valueRemolque ? null : <FormFeedback>Ingresa un documento valido</FormFeedback>
                            }
                        </Col>
                        <Col lg='6' sm='6' style={{justifyContent: "flex-end"}}> 
                            <Button
                                color='primary'
                                style={{marginTop:"15px"}}
                                size='sm'
                                onClick={() => handleAddEventClick()}
                            ><Search/></Button>
                        </Col>
                    </Row>
               </Col>
            </Row>

            </CardBody>
        </Card>
        <Card>
            <CardBody>
                {
                    valueFiles?.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueFiles} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
                }
            </CardBody>
        </Card>

        
    </Fragment>
  )
}

export default ActualizarArchivos
