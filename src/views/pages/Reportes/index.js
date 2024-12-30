// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label
} from 'reactstrap'
// ** Third Party Components
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'
import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import { Value } from 'sass'
import SpinnerComp from '../Utils/Spinner'


const Reportes = () => {

    const [valueData, setValuedata] = useState({ data: [1, 2, 3] })
    const [valueIng, setValueIng] = useState('')
    const [valueCategoria, setValueCategoria] = useState(null)
    const [valueCategoriaSelect, setValueCategoriaSelect] = useState([1, 2, 3])
    const [valueCuotas, setValueCuotas] = useState([])
    const [valueCuota, setValueCuota] = useState(null)
    const [valueCoutasSelect, setValueCoutasSelect] = useState([])
    //const [valueRemolque, setValueRemolque] = useState('')

    const [valueFechaInicial, setValueFechaInicial] = useState(null)
    const [valueFechaFinal, setValueFechaFinal] = useState(null)

    const [spinner, setspinner] = useState(false)

    const dispatch = useDispatch()

    const user = getUserData()

    const token = user.accessToken

    const navigate = useNavigate()

    const handleChange = event => {
        if (event.target.id === "Ingenio") {
            if (event.target.value === "seleccionar") {
                setValueIng(null)
            } else {
                setValueIng(event.target.value)
            }
            
        } if (event.target.id === "Cuota") {
            if (event.target.value === "seleccionar") {
                setValueCuota(null)
            } else {
                setValueCuota(event.target.value)
            }
            
        }

        if (event.target.id === "Categoria") {
            if (event.target.value === "seleccionar") {
                setValueCategoria(null)
            } else {
                setValueCategoria(event.target.value)
            }
            
        }


    }

    const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/TransactionsReport',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    useEffect(() => {
        setspinner(true)
        const InstasnceCoutas = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Storage/ContractDetails?customerId=${valueIng}${valueCategoria ? `&productCategoryId=${valueCategoria}` : ''}${valueCuota ? `&storageId=${valueCuota}` : ''}${valueFechaInicial ? `&startDate=${valueFechaInicial}` : ''}${valueFechaFinal ? `&finalDate=${valueFechaFinal}` : ''}&pageNumber=1&pageSize=200`, //'http://10.10.21.5:8080/api/Storage/Contracts',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })
        InstasnceCoutas.get(''
        ).then(response => {
            setspinner(false)
            setValueCuotas(response.data.data)

        })

    }, [valueCuota, valueIng, valueCategoria, valueFechaFinal, valueFechaInicial])


    // Lista de cuotas select
    useEffect(() => {
        setspinner(true)
        const InstasnceCoutasSelect = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Storage/Types?customerId=${valueIng}&productCategoryId=${valueCategoria}&storageId=${valueCuota}&startDate=${valueFechaInicial}&finalDate=${valueFechaFinal}`,
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })
        InstasnceCoutasSelect.get('').then(response => {
            setspinner(false)
            setValueCoutasSelect(response.data.data)


        })

    }, [valueIng, valueCategoria, valueFechaFinal, valueFechaInicial])

    useEffect(() => {

        const ResumenCategoria = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Summary/Categories',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }

        })

        if (valueIng !== '') {
            setspinner(true)
            ResumenCategoria.post('', { customerId: valueIng })
                .then(response => {
                    setspinner(false)
                    setValueCategoriaSelect(response.data.data)

                })
        }
    }, [valueIng])


    const handleReporte = () => {
        navigate('/Transacciones-Ingenios')
    }

    /*const handleChangeRemolque = event => {
         console.log(event.target.value)
         setValueRemolque(event.target.value)
      }*/

    /*const respuesta = {
        data: [
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            },
            {
                productId: "MEL-001",
                product: "MELAZA",
                preCheckDate: "2020-02-25T03:27:07.487",
                admissionDate: "2020-02-25T09:31:15.793",
                waitTime: "06:04",
                departureDate: "2020-02-25T09:51:45.12",
                tareWeight: 16240.00000000000000000000,
                grossWeight: 48730.00000000000000000000,
                customerNetWeight: 32550.00000000000000000000,
                almapacNetWeight: 32490.00000000000000000000,
                weightDifference: -60.00000000000000000000,
                almapacScaleReceipt: "Comprobante de bascula ALMAPAC",
                remittanceNoteToWit: "Envío ingenio (Nota de remisión)",
                witName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V.",
                averageServiceTime: "06:24",
                plate: "Placa",
                trailer: "Remolque",
                transport: "Transporte",
                humidity: "Humedad",
                temperature: "Temperatura"
            }
            
        ]
    }*/

    const Customers = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=1',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })
    useEffect(() => {
        setspinner(true)
        Customers.get('')
            .then(response => {
                setspinner(false)
                setValuedata(response.data)
            }).catch(error => {
                setspinner(false)
                if (error.response.status === 401) {

                    dispatch(handleLogout())
                    navigate('/Login')
                    alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
                }

            })
    }, [])


    const basicColumns = [
        {
            name: 'Nombre de cuota',
            sortable: true,
            minWidth: '350px',
            selector: row => row.storageName
        },
        {
            name: 'Fecha inicio',
            sortable: true,
            minWidth: '200px',
            selector: row => row.startDate
        },
        {
            name: 'Total de la cuota',
            sortable: true,
            minWidth: '150px',
            selector: row => `${row.storageContractCapacity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM` 
        },
        {
            name: 'Total de producto en existencia',
            sortable: true,
            minWidth: '330px',
            selector: row => `${row.productStock.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Espacio disponible',
            sortable: true,
            minWidth: '300px',
            selector: row => `${row.availableSpace.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'WR',
            sortable: true,
            minWidth: '100px',
            selector: row => row.warehouseQuantity
        },
        {
            name: 'Disponible para exportación',
            sortable: true,
            minWidth: '300px',
            selector: row => `${row.availableProductForExport.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Fecha de vencimiento',
            sortable: true,
            minWidth: '250px',
            selector: row => row.dueDate
        },
        {
            name: 'Fondo de tanque',
            sortable: true,
            minWidth: '200px',
            selector: row => `${row.tankBottomQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        }

    ]

    return (
        <Fragment>
            <SpinnerComp message="Cargando..." estado={spinner}  />
            <Card style={{background: "#cce5fd"}}>
                <CardBody>
                    <CardTitle>Reportes</CardTitle>
                    <Row className='match-height' style={{ marginBottom: "20px" }}>
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Empresa</Label>
                            <Input type='select' value={valueIng}
                                label='Controlled'
                                id='Ingenio'
                                onChange={handleChange}
                            >
                                <option key={8} value={null}>seleccionar</option>
                                {valueData.data.map((ing, index) => <option key={index + 100} value={ing.id}>{ing.name}</option>)
                                }

                            </Input>
                        </Col>
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Productos</Label>
                            <Input type='select' value={valueCategoria}
                                label='Controlled'
                                id='Categoria'
                                onChange={handleChange}
                            >
                                <option key={8} value={null}>seleccionar</option>
                                {valueCategoriaSelect.map((ing, index) => <option key={index + 100} value={ing.id}>{ing.category}</option>)
                                }

                            </Input>
                        </Col>

                        <Col lg='3' sm='3'>
                            <Label for="exampleDatetime">Inicio</Label>
                            <Input onChange={(e) => setValueFechaInicial(e.target.value)}
                                value={valueFechaInicial}
                                type="date"
                                name="date"
                                id="fechaInicial"
                                placeholder="datetime placeholder"
                                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
                        </Col>
                        <Col lg='3' sm='3'>
                            <Label for="exampleDatetime">Fin</Label>
                            <Input onChange={(e) => setValueFechaFinal(e.target.value)}
                                value={valueFechaFinal}
                                type="date"
                                name="date"
                                id="fechaFinal"
                                placeholder="datetime placeholder"
                                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
                        </Col>

                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Cuotas</Label>
                            <Input type='select' value={valueCuota}
                                label='Controlled'
                                id='Cuota'
                                onChange={handleChange}
                            >
                                <option key={8} value={null}>seleccionar</option>
                                {valueCoutasSelect.map((ing, index) => <option key={index + 100} value={ing.id}>{ing.name}</option>)
                                }

                            </Input>
                        </Col>

                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Ir a transacciones/Ing</Label>
                            <Button
                                color='primary'
                                onClick={() => handleReporte()}
                            >Transacciones/Ing</Button>
                        </Col>
                    </Row>

                </CardBody>

            </Card>
            <Card>
            <CardBody>
            {
                valueCuotas.length > 0 ? <TableZeroConfig style={{textAlign:"center"}} columns={basicColumns} contenido={valueCuotas} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
            }
            </CardBody>
            </Card>
       
            
        </Fragment>
    )
}

export default Reportes
