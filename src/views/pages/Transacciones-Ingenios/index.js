// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback, Table
} from 'reactstrap'
// ** Third Party Components

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../Utils/Spinner'

const TransaccionesIngenios = () => {

    const [valueData, setValuedata] = useState({ data: [1, 2, 3] })
    const [valueIng, setValueIng] = useState(null)
    const [valueRemolque, setValueRemolque] = useState(null)
    const [valueDateIn, setValueDateIn] = useState(null)
    const [valueDateFin, setValueDateFin] = useState(null)
    const user = getUserData()
    const [valueError, setValueError] = useState({ producto: false, fechaIn: false, fechaFin: false, Remolque: false })
    const [valueTable, setValueTable] = useState([])
    //const [valueCategoria, setValueCategoria] = useState('')
    //const [valueDataCategoria, setValuedataCategoria] = useState({data:['']})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [spinner, setspinner] = useState(false)


    const token = user.accessToken

    /*const instance = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
    })*/

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

        if (event.target.id === "Categoria") {
            setValueCategoria(event.target.value)

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

    const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/TransactionsReport',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    const instance2 = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=1',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })
    useEffect(() => {
        setspinner(true)
        instance2.get('')
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
            name: 'Fecha',
            sortable: true,
            minWidth: '225px',
            selector: row => row.transactionDate
        },
        {
            name: 'Transacción',
            sortable: true,
            minWidth: '310px',
            selector: row => row.document
        },
        {
            name: 'Ingreso',
            sortable: true,
            minWidth: '250px',
            selector: row => (row.income ? `${row.income.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM` : row.income)
        },
        {
            name: 'Salida',
            sortable: true,
            minWidth: '100px',
            selector: row => (row.output ? `${row.output.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM` : row.output)
        },
        {
            name: 'Estado',
            sortable: true,
            minWidth: '175px',
            selector: row => row.status
        },
        {
            name: 'Descripción',
            sortable: true,
            minWidth: '100px',
            selector: row => row.description
        }

    ]

    const foot = {
        name: "Title",
        selector: "title"
    }


    useEffect(() => {
        
        const ingenioDefault = valueIng ? valueIng : valueData.data[0].id

        const TransaccionesIng = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Arrivals/MillTransactions?customerId=${ingenioDefault}&startDate=${valueDateIn}&finalDate=${valueDateFin}&pageNumber=1&pageSize=2000`,
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })
        if (valueData && valueIng && valueDateFin && valueDateIn) {
            setspinner(true)
            TransaccionesIng.get('')
            .then(response => {
                setspinner(false)
                setValueTable(response.data.data)
            }).catch(error => {

                if (error.response.status === 401) {

                    dispatch(handleLogout())
                    navigate('/Login')
                    alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
                }

            })
        }

    }, [valueData, valueIng, valueDateFin, valueDateIn])

    return (
        <Fragment>
            <SpinnerComp message="Cargando..." estado={spinner}  />
            <Card style={{background: "#cce5fd"}}>
                <CardBody>
                    <CardTitle>Transacciones Entre Ingenios</CardTitle>
                    <Row className='match-height' style={{ marginBottom: "20px" }}>
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Empresa</Label>
                            <Input type='select' value={valueIng}
                                label='Controlled'
                                id='Ingenio'
                                onChange={handleChange}
                                invalid={!valueIng ? true : null}
                            >
                                <option key={8} value='home'>seleccionar</option>
                                {valueData.data.map((ing, index) => <option key={index + 100} value={ing.id}>{ing.name}</option>)
                                }

                            </Input>
                            {valueIng ? null : <FormFeedback>Selecciona una Empresa</FormFeedback>
                            }

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
                                invalid={!valueDateIn ? true : null}//{errors.loginEmail && true
                            />
                            {valueDateIn ? null : <FormFeedback>Ingresa una fecha inicial</FormFeedback>
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
                                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}
                            />
                            {valueDateFin ? null : <FormFeedback>Ingresa una fecha final</FormFeedback>
                            }
                        </Col>
                    </Row>

                </CardBody>
            </Card>

            <Card>
                <CardBody>
                    {
                        valueTable?.millTransactions?.length > 0 ? <>
                            <Table style={{textAlign: "center"}}>
                                <tbody>
                                    <tr>
                                        <td>Ingresos Totales:</td>
                                        <td>Salidas Totales:</td>
                                    </tr>
                                    <tr>
                                        <td><span style={{ fontWeight: "bold" }}>{valueTable.totalIncomes.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM</span></td>
                                        <td><span style={{ fontWeight: "bold" }}>{valueTable.totalOutputs.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM</span></td>
                                    </tr>
                                </tbody>
                            </Table>
                            <TableZeroConfig columns={basicColumns} contenido={valueTable.millTransactions} title={"Transacciones"} footer={foot} /></> : <p style={{ textAlign: "center" }}> Por favor completar los filtros para mostrar la información</p>
                    }
                </CardBody>
            </Card>


        </Fragment>
    )
}

export default TransaccionesIngenios
