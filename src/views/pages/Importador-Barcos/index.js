// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button,
    Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form
} from 'reactstrap'

import { Edit, UserPlus, Eye, Download, Copy, Circle, Box, Package, AlertTriangle, RotateCw, Server, Grid, Home, Truck, User, Clipboard, UserX } from 'react-feather'
// ** Third Party Components

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import InputPasswordToggle from '@components/input-password-toggle'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../Utils/Spinner'

const ImportadorBarcos = (props) => {
    const user = getUserData()
    const [valueError, setValueError] = useState({ producto: false, fechaIn: false, fechaFin: false, Remolque: false })
    const [modal, setmodal] = useState({ modal: false })
    const [modalDelete, setmodalDelete] = useState({ modal: false })
    //const [UpdateUser, setUpdateUser] = useState({ name: "", roleId: 2, temporalPassword: "", username: "", email: "", pass:"",  trackingCustomers: [] })
    const [ValueRoles, setValueRoles] = useState([])
    const [valueBarcos, setvalueBarcos] = useState([])
    const [valueBarcosDetalle, setvalueBarcosDetalle] = useState([])

    //Customer Select
    const [valueCustomerSelect, setvalueCustomerSelect] = useState([{}])
    const [valueCustomer, setvalueCustomer] = useState(null)

    const [shipName, setshipName] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [spinner, setspinner] = useState(false)


    const token = user.accessToken

    const Transacciones = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })


    const ValidateError = () => {
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

    const toggle = (e, id, name) => {
        e.preventDefault()
        //http://10.10.21.5:8080/api/Ships/Dispatches
        setshipName(name)
        setspinner(true)
        const detalleBarco = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Ships/Dispatches?shipId=${id}&customerId=${valueCustomer}`,
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })

        detalleBarco.get('')
        .then(response => {
            setspinner(false)
            setvalueBarcosDetalle(response.data.data)
            console.log("response.data****** Barcos Detalle: ", response.data.data)
            //return response.data
        })

        setmodal({ modal: !modal.modal })
    }


    const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Files/Document',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

    // const handleReporte = () => {

    //         ReporteDownload.post('', {
    //             number: "string",
    //             uploadDate: "2023-02-24T15:27:08.665Z",
    //             name: "string"
    //           })
    //         .then(response => {
    //             console.log("Response: ", response.data.data)
    //             const linkSource = `data:application/pdf;base64,${response.data.data.base64FileContent}`
    //             //const linkSource = `data:application/pdf;base64,${documento}`
    //             const downloadLink = document.createElement("a")
    //             const fileName = "Transaction_Report_2023-02-20_19-57-14.xlsx"

    //             downloadLink.href = linkSource
    //             downloadLink.download = fileName
    //             downloadLink.click()
    //         })
    //         const linkSource = `data:application/pdf;base64,${documento}`
    //         const downloadLink = document.createElement("a")
    //         const fileName = "Transaction_Report_2023-02-20_19-57-14.xlsx"
    //         downloadLink.href = linkSource
    //         downloadLink.download = fileName
    //         downloadLink.click()
        
    // }

    const basicColumns = [

        // {
        //     name: 'Código',
        //     sortable: true,
        //     minWidth: '225px',
        //     selector: row => row.code
        // },
        {
            name: 'Nombre del barco',
            sortable: true,
            minWidth: '310px',
            selector: row => row.name
        },
        {
            name: 'Fecha',
            sortable: true,
            minWidth: '150px',
            selector: row => row.startDate
        },
        {
            name: 'Acciones',
            cell: (row) => [<Button color="primary" size="sm" onClick={(e) => toggle(e, row.code, row.name)} id={row.code}><Eye /></Button>],
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '250px'
        }
    ]

    // Columnas detalle del barco
    const basicColumnsDetails = [

        {
            name: 'Producto',
            sortable: true,
            minWidth: '250px',
            selector: row => row.product
        },
        {
            name: 'Cantidad recibida',
            sortable: true,
            minWidth: '250px',
            selector: row => `${row.receivedQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM` 
        },
        {
            name: 'Pendiente de pago proveedor',
            sortable: true,
            minWidth: '250px',
            selector: row => `$ ${row.pendingSupplierPayment.toLocaleString("en-US", { minimumFractionDigits: 3 })}`
        },
        {
            name: 'Pendiente de pago impuesto',
            sortable: true,
            minWidth: '250px',
            selector: row => `$ ${row.pendingTaxPayment.toLocaleString("en-US", { minimumFractionDigits: 3 })}`
        },
        {
            name: 'Total despachado',
            sortable: true,
            minWidth: '250px',
            selector: row => `${row.totalDispatched.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Pagado proveedor',
            sortable: true,
            minWidth: '250px',
            selector: row => `$ ${row.paidSupplier.toLocaleString("en-US", { minimumFractionDigits: 3 })}`
        },
        {
            name: 'Pagado impuesto',
            sortable: true,
            minWidth: '250px',
            selector: row => `$ ${row.taxPaid.toLocaleString("en-US", { minimumFractionDigits: 3 })}`
        },
        {
            name: 'Existencias',
            sortable: true,
            minWidth: '250px',
            selector: row =>  `${row.stock.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM` 
        },
        {
            name: 'Disponible retiro',
            sortable: true,
            minWidth: '250px',
            selector: row => `${row.availableToWithdraw.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        }
        // {
        //     name: 'Acciones',
        //     cell: (row) => [<Button color="primary" size="sm" onClick={(e) => handleReporte(e, row.role, row.username)} id={row.productId}><Download /></Button>],
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        //     minWidth: '150px'
        // }
    ]

    // Crear Usuarios
    const CreateUser = (e) => {
        e.preventDefault()
        if (UpdateUser.name !== "") {
            const create = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/User/Create',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })

            create.post('', {})
            .then(response => {
                console.log("USUARIO Creado: ", response.data)
                setmodal({ modal: !modal.modal })
            })
            setmodal({ modal: !modal.modal })
            setCreateUser({ name: "", roleId: "", temporalPassword: "", username: "", email: "", pass:"",  trackingCustomers: [] })
        }
    }

    // Actualizar Usuarios
    // const UpdateUserFunc = (e) => {
    //     e.preventDefault()
    //     if (UpdateUser.name !== "") {
    //         const Update = axios.create({
    //             baseURL: 'http://10.10.21.5:8080/api/User/Edit',
    //             timeout: 0,
    //             headers: { Authorization: `Bearer ${token}` }
    //         })

    //         Update.post('', UpdateUser)
    //         .then(response => {
    //             console.log("USUARIO ACTUALIZADO: ", response.data)
    //             setmodal({ modal: !modal.modal })
    //         })
    //         setmodal({ modal: !modal.modal })
    //     }
    // }

    //Get Roles

    const roles = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/User/Roles',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    //Add Roles 

    useEffect(() => {
        roles.get('')
            .then(response => {
                console.log("response.data******: ", response.data)
                setValueRoles(response.data.data)
                //return response.data
            })
    }, [])

    const Barcos = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Ships/Import/Active',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    useEffect(() => {
        setspinner(true)
        const valueDefault =  valueCustomer ? valueCustomer : valueCustomerSelect[0].id
        Barcos.post('', {
            customerId: valueDefault,
            pageNumber: 1,
            pageSize: 20
        })
            .then(response => {
                setspinner(false)
                setvalueBarcos(response.data.data)
            })
    }, [valueCustomer, valueCustomerSelect])


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
        const customers = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=2',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })
        customers.get('')
            .then(response => {

                setvalueCustomerSelect(response.data.data)
            }).catch(error => {

                if (error.response.status === 401) {
                  
                  dispatch(handleLogout())
                  navigate('/Login')
                  alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
                } 
        
              })
    }, [])

    return (
        <Fragment>
            <SpinnerComp message="Cargando..." estado={spinner}  />
            {/* Modal para actualizar usuario */}
            <div>
                <Modal size="lg" style={{maxWidth: '80%'}} isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Detalle Barco: <span style={{fontWeight:"bold"}}>{shipName}</span></ModalHeader>
                    <ModalBody>
                    <Card>
                        <CardBody>
                            <CardTitle>Detalles</CardTitle>
                            <p>Fecha de llegada: {valueBarcosDetalle.arrivalDate}</p>
                            <p>Fecha final: {valueBarcosDetalle.endDate}</p>
                            <p>Fecha de recepción: {valueBarcosDetalle.receptionDate}</p>
                            <p>Barco: {/*valueDetallesBitacora.shipName*/ shipName}</p>
                            <p>Cantidad total: {valueBarcosDetalle?.totalQuantity?.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM</p>
                        </CardBody>
                    </Card>
                        <TableZeroConfig columns={basicColumnsDetails} contenido={valueBarcosDetalle} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Cerrar</Button>
                    </ModalFooter>
                </Modal>
            </div>

            <Card id="card-filtros">
                <CardBody>
                    <CardTitle>Barcos</CardTitle>

                    <Row className='match-height' style={{ marginBottom: "20px" }}>
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Empresa</Label>
                            <Input type='select' value={valueCustomer}
                                label='Controlled'
                                id='Ingenio'
                                onChange={(e) => setvalueCustomer(e.target.value)}
                                invalid={!valueCustomer ? true : null}
                            >
                                <option key={8} value='home'>seleccionar</option>
                                {valueCustomerSelect.map((empresa, index) => <option key={index + 100} value={empresa.id}>{empresa.name}</option>)
                                }

                            </Input>
                            {valueCustomer ? null : <FormFeedback>Selecciona un producto</FormFeedback>
                            }

                        </Col>

                    </Row>

                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    {/* <Button color="primary" onClick={toggleCrear}><UserPlus/></Button> */}
                    {
                        valueBarcos.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueBarcos} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
                    }
                    
                </CardBody>
            </Card>
            
        </Fragment>
    )
}

export default ImportadorBarcos
