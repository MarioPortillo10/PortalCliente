// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button,
    Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form, Spinner
} from 'reactstrap'

import { Download } from 'react-feather'
// ** Third Party Components

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import InputPasswordToggle from '@components/input-password-toggle'

//params
import { useParams, useNavigate } from "react-router-dom"

import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
//import { param } from 'jquery'

import SpinnerComp from '../Utils/Spinner'

const ImportadorReportesTransacciones = (props) => {
    const [valueIng, setValueIng] = useState('')
    const [valueRemolque, setValueRemolque] = useState('')
    const [valueDateIn, setValueDateIn] = useState(null)
    const [valueDateFin, setValueDateFin] = useState(null)
    const user = getUserData()
    const [valueError, setValueError] = useState({ producto: false, fechaIn: false, fechaFin: false, Remolque: false })
    const [ValueUsers, setValueUsers] = useState([])
    const [modal, setmodal] = useState({ modal: false })
    const [modalDelete, setmodalDelete] = useState({ modal: false })
    const [UpdateUser, setUpdateUser] = useState({ name: "", roleId: 2, temporalPassword: "", username: "", email: "", pass:"",  trackingCustomers: [] })
    const [ValueRoles, setValueRoles] = useState([])
    
    const [valueBarcosDetalle, setvalueBarcosDetalle] = useState([])
    const [valueReportesConsolidado, setvalueReporteConsolidado] = useState([])
    const [valueFilters, setvalueFilters] = useState({product: null, state: 'Prechequeo', dateIn: null, dateFin: null})
    const [valueSelect, setSelect] = useState({products: [
        {
            id: 2,
            name: "Maiz"
        },
        {
            id: 3,
            name: "Azucar"
        }
    ],
    states: [
    {
        id: 2,
        name: "Prechequeo"
    },
    {
        id: 3,
        name: "Despachado"
    }
    ]
})

const [ValueEmpresaSelect, setValueEmpresaSelect] = useState([])
const [ValueEmpresa, setValueEmpresa] = useState(null)

const [valueTransacciones, setvalueTransacciones] = useState(null)

//spinners
const [spinnerDownload, setspinnerDownload] = useState(false)

const [spinner, setspinner] = useState(false)

const [fileUrl, setFileUrl] = useState(null)

const dispatch = useDispatch()
const navigate = useNavigate()

    const token = user.accessToken

    //Get params
    const params = useParams()

    const handleChange = event => {

        if (event.target.id === "Ingenio") {
            setValueIng(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, producto: true })
            } else {
                setValueError({ ...valueError, producto: false })
            }
        }

        if (event.target.id === "Remolque") {
            setValueRemolque(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, Remolque: true })
            } else {
                setValueError({ ...valueError, Remolque: false })
            }
        }

        if (event.target.id === "fechaInicial") {
            setValueDateIn(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, fechaIn: true })
            } else {
                setValueError({ ...valueError, fechaIn: false })
            }
        }

        if (event.target.id === "fechaFinal") {
            setValueDateFin(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, fechaFin: true })
            } else {
                setValueError({ ...valueError, fechaFin: false })
            }
        }

    }

    const Transacciones = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })


    const ValidateError = () => {
        console.log("****************************: ", valueIng)
        const campos = { producto: false, fechaIn: false, fechaFin: false, Remolque: false }
        if (!valueIng) {
            campos.product = true
            setValueError(campos)
            console.log("****************************: ", valueIng)
            //return false
        } else {
            setValueError({ ...valueError, producto: false })
        }

        if (!valueRemolque) {
            campos.Remolque = true
            setValueError(campos)
            console.log("****************************: ", valueIng)
            //return false
        } else {
            setValueError({ ...valueError, Remolque: false })
        }

        if (!valueDateIn) {
            setValueError({ ...valueError, fechaIn: true })
            console.log("****************************: ", valueIng)
            //return false
        } else {
            setValueError({ ...valueError, fechaIn: false })
        }

        if (!valueDateFin) {
            console.log('valueError: ', valueError)
            setValueError({ ...valueError, fechaFin: true })
            //return false
        } else {
            setValueError({ ...valueError, fechaFin: false })
        }

        //return true
    }


    const instance3 = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/User/All',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    useEffect(() => {

        instance3.get('')
            .then(response => {
                setValueUsers(response.data.data)
                //return response.data
            })
    }, [valueIng])

    //Actualizar Usuario 

    const toggle = (e, rol, name) => {
        e.preventDefault()
        setvalueBarcosDetalle([
            {
                product: "C00022",
                CantidadRecibida: "10000k",
                PendientePagoProveedor: "50000k",
                PendientePagoImpuesto: "50000k",
                TotalDespachado: "50000k",
                PagoProveedor: "50000k",
                PagoImpuesto: "50000k",
                Existencias: "50000k",
                DisponibleRetiro: "50000k"
    
            }
        ])
        
        const template = UpdateUser
        template.name = name
        template.rol = rol
        setUpdateUser(template)
        setmodal({ modal: !modal.modal })
    }

    const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Files/Document',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

    
    const documento = "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"

    const handleReporte = () => {

            ReporteDownload.post('', {
                number: "string",
                uploadDate: "2023-02-24T15:27:08.665Z",
                name: "string"
              })
            .then(response => {
                console.log("Response: ", response.data.data)
                const linkSource = `data:application/pdf;base64,${response.data.data.base64FileContent}`
                //const linkSource = `data:application/pdf;base64,${documento}`
                const downloadLink = document.createElement("a")
                const fileName = "Transaction_Report_2023-02-20_19-57-14.xlsx"

                downloadLink.href = linkSource
                downloadLink.download = fileName
                downloadLink.click()
            })
            const linkSource = `data:application/pdf;base64,${documento}`
            const downloadLink = document.createElement("a")
            const fileName = "Transaction_Report_2023-02-20_19-57-14.xlsx"
            downloadLink.href = linkSource
            downloadLink.download = fileName
            downloadLink.click()
        
    }

    const basicColumns = [

        {
            name: 'Fecha prechequeo',
            sortable: true,
            minWidth: '225px',
            selector: row => row.preCheckDate
        },
        {
            name: 'Tiempo de espera',
            sortable: true,
            minWidth: '200px',
            selector: row => row.waitTime
        },
        {
            name: 'Fecha y hora de ingreso',
            sortable: true,
            minWidth: '300px',
            selector: row => row.admissionDate
        },
        // {
        //     name: 'Hora de ingreso',
        //     sortable: true,
        //     minWidth: '150px',
        //     selector: row => row.date
        // },
        {
            name: 'Fecha y hora de salida',
            sortable: true,
            minWidth: '300px',
            selector: row => row.departureDate
        },
        {
            name: 'Barco',
            sortable: true,
            minWidth: '150px',
            selector: row => row.shipName
        },
        // {
        //     name: 'Producto',
        //     sortable: true,
        //     minWidth: '150px',
        //     selector: row => row.date
        // },
        {
            name: 'Peso neto',
            sortable: true,
            minWidth: '150px',
            selector: row => `${row.netWeight.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Placa',
            sortable: true,
            minWidth: '150px',
            selector: row => row.plate
        },
        {
            name: 'Transporte',
            sortable: true,
            minWidth: '150px',
            selector: row => `${row.transport.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        }
        /*{
            name: 'Acciones',
            cell: (row) => [<Button color="primary" size="sm" onClick={(e) => toggle(e, row.role, row.deatil)} id={row.productId}><Eye /></Button>],
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '250px'
        }*/
    ]

    // Columnas detalle del barco
    const basicColumnsConsolidado = [

        {
            name: 'Descripcion',
            sortable: true,
            minWidth: '100px',
            selector: row => row.descripcion
        },
        {
            name: 'Resultado',
            sortable: true,
            minWidth: '100px',
            selector: row => row.resultado
        }
    ]

    //Get Roles

    const roles = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/User/Roles',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    //Add Roles 

    useEffect(() => {
        console.log("PARAMS: ----> ", params)
        roles.get('')
            .then(response => {
                console.log("response.data******: ", response.data)
                setValueRoles(response.data.data)
                //return response.data
            })
    }, [])

    // Disabled User

    const DisabledUser = (e) => {
        e.preventDefault()
        if (UpdateUser.name !== "") {
            const Update = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/User/Disable',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })

            Update.post('', {})
            .then(response => {
                console.log("USUARIO Eliminado: ", response.data)
                setmodalDelete({ modal: !modalDelete.modal })
            })
            setmodalDelete({ modal: !modalDelete.modal })
        }
    }

    useEffect(() => {
        setvalueReporteConsolidado([
            {
                descripcion: "Producto",
                resultado: valueTransacciones?.product ? valueTransacciones.product : null
            },
            {
                descripcion: "Filtro",
                resultado: valueTransacciones?.["filter"] ? valueTransacciones["filter"] : null
            },
            {
                descripcion: "Peso Neto ALMAPAC",
                resultado: valueTransacciones?.almapacNetWeight ? valueTransacciones.almapacNetWeight.toLocaleString("en-US", { minimumFractionDigits: 3 }) : null
            }
            // {
            //     descripcion: "Promedio",
            //     resultado: valueTransacciones?.average ? valueTransacciones.average.toLocaleString("en-US", { minimumFractionDigits: 3 }) : null
            // }
        ])
        console.log("valueTransacciones: ", valueTransacciones)
    }, [valueTransacciones])

    useEffect(() => {
        // if (params) {
        //     setvalueFilters({...valueFilters, product: 2 /*params.producto*/, state: 3 /*params.estado*/})
        // }
    }, [])

    const Empresas = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=2',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

    useEffect(() => {
        setspinner(true)
        Empresas.get('')
        .then(response => {
            setspinner(false)
          setValueEmpresaSelect(response.data.data)
            //return response.data
        }).catch(error => {

          if (error.response.status === 401) {
            
            dispatch(handleLogout())
            navigate('/Login')
            alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
          } 
  
        })
    }, []) 


    useEffect(() => {
        setspinner(true)
        const Productos = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Products/ByCustomer?customerId=${ValueEmpresa}`, //'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=2',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })

        Productos.get('')
        .then(response => {
            setspinner(false)
            setSelect({...valueSelect, products: response.data.data})
            //return response.data
        }).catch(error => {
            console.log("Error: ", error)
        })
    }, [ValueEmpresa])

    
    useEffect(() => {
        
        const Transacciones = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Arrivals/ImporterTransactions', //'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=2',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          
        if (ValueEmpresa && valueFilters.product && valueDateFin && valueDateIn) {
            setspinner(true)
            Transacciones.post('', {
                customerId: ValueEmpresa,
                productId: valueFilters.product,
                startDate: valueDateIn,
                finalDate: valueDateFin,
                pageNumber: 1,
                pageSize: 300
            })
            .then(response => {
                setspinner(false)
                //console.log()
                setvalueTransacciones(response.data.data)
                //return response.data
            }).catch(error => {
                console.log("Error: ", error)
            })
        }

    }, [ValueEmpresa, valueFilters.product, valueDateFin, valueDateIn])


    const handleDownload = () => {

        if (ValueEmpresa, valueFilters.product, valueDateFin, valueDateIn) {
            setspinnerDownload(true)
            setspinner(true)
            const Transacciones = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Arrivals/ImporterTransactionsReport',
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })
            console.log("valueDateIn: ", valueDateIn)
            Transacciones.post('', {
                customerId: ValueEmpresa,
                productId: valueFilters.product,
                startDate: valueDateIn,
                finalDate: valueDateFin,
                reportType: 1
                // customerId: "002001-001",
                // productId: "ARR-G-001",
                // startDate: "2020-02-10T00:00:00.004Z",
                // finalDate: "2023-03-09T11:49:31.204Z",
                // reportType: 1
            })
            .then(response => {
                
                const linkSource = `data:application/pdf;base64,${response.data.data.base64FileContent}`
                //const linkSource = `data:application/pdf;base64,${documento}`
                const downloadLink = document.createElement("a")
                const fileName = "Transaction_Report_2023-02-20_19-57-14.xlsx"

                downloadLink.href = linkSource
                downloadLink.download = fileName
                downloadLink.click()
                setspinnerDownload(false)
                setspinner(false)
    
            }).catch(error => {
                console.log("Error: ", error)
            })
        }

      }
      
      const handleFileLoad = (blob) => {
        //console.log("URL.createObjectURL(blob); ", URL.createObjectURL(blob))
        //setFileUrl(URL.createObjectURL(blob))
        setFileUrl(`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${blob}`)
      }

      
    useEffect(() => {
        if (fileUrl) {
            console.log("FILEURL: ---- ", fileUrl)
            window.print()
        }


    }, [fileUrl])

      const handlePrintReport = () => {

        if (ValueEmpresa, valueFilters.product, valueDateFin, valueDateIn) {
            setspinner(true)
            const Transacciones = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Arrivals/ImporterTransactionsReport',
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })
            
            Transacciones.post('', {
                customerId: ValueEmpresa,
                productId: valueFilters.product,
                startDate: valueDateIn,
                finalDate: valueDateFin
                // customerId: "002001-001",
                // productId: "ARR-G-001",
                // startDate: "2020-02-10T00:00:00.004Z",
                // finalDate: "2023-03-09T11:49:31.204Z",
                // reportType: 1
            })
            .then(response => {
                setspinner(false)
                // const byteCharacters = atob(response.data.data.base64FileContent)
                // const byteNumbers = new Array(byteCharacters.length)
                // for (let i = 0; i < byteCharacters.length; i++) {
                //   byteNumbers[i] = byteCharacters.charCodeAt(i)
                // }
                // const byteArray = new Uint8Array(byteNumbers)
                // const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                // handleFileLoad(blob)
                handleFileLoad(response.data.data.base64FileContent)
                
            }).catch(error => {
                console.log("Error: ", error)
            })
        }

      }

    return (
        <Fragment>
            <SpinnerComp message="Cargando..." estado={spinner}  />
            {/* Modal para actualizar usuario */}
            <div>
                <Modal size="lg" style={{maxWidth: '80%'}} isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Detalle Barco</ModalHeader>
                    <ModalBody>
                        <Button color="primary" onClick={handleReporte}>Cerrar</Button>
                        <TableZeroConfig columns={basicColumnsConsolidado} contenido={valueBarcosDetalle} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>
            
            <Card id="card-filtros">
                <CardBody>
                    <CardTitle>Reportes</CardTitle>
                    <Row className='match-height' style={{ marginBottom: "20px" }}>
                    <Col lg='2' sm='6'>
                <Label for="tipo">Empresa</Label>
                    <Input type='select'value={ValueEmpresa} 
                        onChange={(e) => setValueEmpresa(e.target.value)}
                        label='Controlled'
                        id='Client'
                        invalid={!ValueEmpresa ? true : null}
                    >
                    <option key={8} value="">seleccionar</option>
                    {ValueEmpresaSelect.map((emp, index) => <option key={index + 100} value={emp.id} >{emp.name}</option>)
                    }
                    </Input>
                    { ValueEmpresa ? null : <FormFeedback>Selecciona una Empresa</FormFeedback>
                    }
                </Col> 
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Productos</Label>
                            <Input type='select' value={valueFilters.product}
                                label='Controlled'
                                id='product'
                                onChange={(e) => setvalueFilters({...valueFilters, product: e.target.value })}
                                invalid={!valueFilters.product ? true : null}
                            >
                                <option key={8} value={null}>seleccionar</option>
                                {valueSelect.products.map((empresa, index) => <option key={index + 100} value={empresa.id}>{empresa.name}</option>)
                                }

                            </Input>
                            {valueIng ? null : <FormFeedback>Selecciona un producto</FormFeedback>
                            }

                        </Col>
                        {/* <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Estado</Label>
                            <Input type='select' value={valueFilters.state}
                                label='Controlled'
                                id='Ingenio'
                                onChange={handleChange}
                                invalid={!valueFilters.state ? true : null}
                            >
                                <option key={8} value='home'>seleccionar</option>
                                {valueSelect.states.map((empresa, index) => <option key={index + 100} value={empresa.id}>{empresa.name}</option>)
                                }

                            </Input>
                            {valueIng ? null : <FormFeedback>Selecciona un Estado</FormFeedback>
                            }

                        </Col> */}
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
                    invalid={!valueDateIn ? true : null}//{errors.loginEmail && true
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
                    invalid={!valueDateFin ? true : null}
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}//2023-02-22
                    />
                    { valueDateFin ? null : <FormFeedback>Ingresa una fecha final</FormFeedback>
                    }
                </Col>
                    </Row>

                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    {/* <Button color="primary" onClick={toggle}>Visualizar </Button> */}
                    {
                        ValueEmpresa && valueFilters.product && valueDateFin && valueDateIn && (
                            <Button color="primary" onClick={handleDownload}> 
                            {
                                spinnerDownload ? <Spinner/> : <Download/> 
                            }
                            
                            
                            </Button>
                        )
                        
                    }
                    
                    <Button style={{ display: 'none' }} color="primary" onClick={handlePrintReport}>Imprimir </Button>
                    <iframe src={fileUrl} title={"Test"} style={{ display: 'none' }} />

                    {
                        valueTransacciones?.importerTransactions.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueTransacciones ? valueTransacciones.importerTransactions : []} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
                    }
                    
                </CardBody>
            </Card>
            <Card style={{background: "transparent", boxShadow:"none"}}>
                <CardBody>
                    <CardTitle>Consolidado</CardTitle>
                    
                    {
                        valueReportesConsolidado?.length > 0 ? <TableZeroConfig columns={basicColumnsConsolidado} contenido={valueReportesConsolidado} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
                    }
                    
                    
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default ImportadorReportesTransacciones
