// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback } from 'reactstrap'
// ** Third Party Components
import { Search, Download } from 'react-feather'

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../Utils/Spinner'

const Transacciones = () => {

    const [valueData, setValuedata] = useState({data:[1,  2, 3]})
    const [valueIng, setValueIng] = useState(null)
    const [valueRemolque, setValueRemolque] = useState(null)
    const [valueDateIn, setValueDateIn] = useState(null)
    const [valueDateFin, setValueDateFin] = useState(null)
    const user = getUserData()
    const [valueError, setValueError] =  useState({producto: false, fechaIn: false, fechaFin: false, Remolque: false})
    const [valueTable, setValueTable] = useState([])
    const [valueCategoria, setValueCategoria] = useState(null)
    const [valueDataCategoria, setValuedataCategoria] = useState({data:['']})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [spinner, setspinner] = useState(false)
  
    const token =  user.accessToken
  
    /*const instance = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
    })*/

    const handleChange = event => {

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

        if (event.target.id === "Categoria") {
            setValueCategoria(event.target.value)
            
        }
        
      }

      const Transacciones = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/ExporterTransactions',
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

      const handleAddEventClick = () => {
            
            ValidateError()
            const fecha = valueDateIn ? new Date(valueDateIn) : new Date()
            const fechaFin =  valueDateFin ? new Date(valueDateFin) : new Date()
            if (valueIng && valueCategoria) {
                setspinner(true)
                Transacciones.post('', {
                    CustomerId: valueIng,
                    productCategoryId: valueCategoria, //"3PL-012",
                    startDate: fecha, //"2020-02-10T00:00:00.004Z",
                    finalDate: fechaFin, //"2023-03-09T11:49:31.204Z",
                    trailerNumber: valueRemolque, //"RE6317",
                    pageNumber: 1,
                    pageSize: 200
                })
                .then(response => {
                    setspinner(false)
                    setValueTable(response.data.data)
    
                })
            }

            
      }

      const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/ExporterTransactionsReport', //'http://10.10.21.5:8080/api/Arrivals/TransactionsReport',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

      const handleReporte = () => {
            const fecha = new Date(valueDateIn)
            const fechaFin = new Date(valueDateFin)
            if (valueTable.length > 0 && valueIng) {
                setspinner(true)
                ReporteDownload.post('', {
                    customerId: valueIng,
                    productCategoryId: valueCategoria,
                    startDate: fecha,
                    finalDate: fechaFin,
                    reportType: 1
                })
                .then(response => {
                    setspinner(false)
                    const linkSource = `data:application/pdf;base64,${response.data.data.base64FileContent}`
                    const downloadLink = document.createElement("a")
                    const fileName = "Transaction_Report_2023-02-20_19-57-14.xlsx"
    
                    downloadLink.href = linkSource
                    downloadLink.download = fileName
                    downloadLink.click()
                })
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

      const Empresas = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=1',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })
      useEffect(() => {
        setspinner(true)
        Empresas.get('')
          .then(response => {
            setspinner(false)
              setValuedata(response.data)
          }).catch(error => {

            if (error.response.status === 401) {
              
              dispatch(handleLogout())
              navigate('/Login')
              alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
            } 
    
          })
      }, [])

      /* Get Categorias */
      const instanceCategoria = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Summary/Categories',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })


      useEffect(() => {
          
          if (valueIng !== '') {
            setspinner(true)
            instanceCategoria.post('', {customerId: valueIng})
            .then(response => {
                setspinner(false)
              setValuedataCategoria(response.data)
                //return response.data
            })
          }
          
      }, [valueIng])

      const basicColumns = [
        {
          name: 'Producto',
          sortable: true,
          minWidth: '250px',
          selector: row => row.product
        },
        {
          name: 'Prechequeo',
          sortable: true,
          minWidth: '250px',
          selector: row => row.preCheckDate
        },
        {
          name: 'Fecha y hora de entrada',
          sortable: true,
          minWidth: '250px',
          selector: row => row.admissionDate
        },
        {
          name: 'Espera',
          sortable: true,
          minWidth: '250px',
          selector: row => row.waitTime
        },
        {
          name: 'Fecha y hora de salida',
          sortable: true,
          minWidth: '250px',
          selector: row => row.departureDate
        },
        {
            name: 'Tiempo entre entrada y salida',
            sortable: true,
            minWidth: '250px',
            selector: row => row.admissionDepartureTime
        },
        {
          name: 'Peso tara',
          sortable: true,
          minWidth: '100px',
          selector: row => `${row.tareWeight.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Peso bruto',
            sortable: true,
            minWidth: '100px',
            selector: row => `${row.grossWeight.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Peso neto cliente',
            sortable: true,
            minWidth: '100px',
            selector: row => `${row.customerNetWeight.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Peso neto ALMAPAC',
            sortable: true,
            minWidth: '100px',
            selector: row => `${row.almapacNetWeight.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Diferencia de peso',
            sortable: true,
            minWidth: '100px',
            selector: row => `${row.weightDifference.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Comprobante de bascula ALMAPAC',
            sortable: true,
            minWidth: '340px',
            selector: row => `${row.almapacScaleReceipt.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Envió ingenio',
            sortable: true,
            minWidth: '100px',
            selector: row => `${row.remittanceNoteToWit.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Nombre del ingenio',
            sortable: true,
            minWidth: '230px',
            selector: row => row.witName
        },
        {
            name: 'Tiempo promedio del servicio',
            sortable: true,
            minWidth: '295px',
            selector: row => row.averageServiceTime
        },
        {
            name: 'Placa',
            sortable: true,
            minWidth: '100px',
            selector: row => row.plate
        },
        {
            name: 'Remolque',
            sortable: true,
            minWidth: '100px',
            selector: row => row.trailer
        },
        {
            name: 'Transporte',
            sortable: true,
            minWidth: '100px',
            selector: row => row.transport
        },
        {
            name: 'humedad',
            sortable: true,
            minWidth: '100px',
            selector: row => row.humidity.toString().concat("%")
        },
        {
            name: 'Temperatura',
            sortable: true,
            minWidth: '100px',
            selector: row => row.temperature
        },
        {
            name: 'Observación',
            sortable: true,
            minWidth: '100px',
            selector: row => row.comment
        }
      ]
      
  return (
    <Fragment>
        <SpinnerComp message="Cargando..." estado={spinner}  />
        <Card style={{background: "#cce5fd"}}>
            <CardBody>
            <CardTitle>Registros / Transacciones</CardTitle>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
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
                    { valueIng ? null : <FormFeedback>Selecciona una Empresa</FormFeedback>
                    }
                    
                </Col>
                <Col lg='2' sm='4'>
                <Label for="exampleDatetime">Producto</Label>
                <Input type='select' value={valueCategoria}
                  label='Controlled'
                  id='Categoria'
                  onChange={handleChange}
                  >
                  <option key={1} value='home'>seleccionar</option>
                  {valueDataCategoria.data.map((ing, index) => <option key={index + 1} value={ing.id}>{ing.category}</option>)
                  }
                  
                </Input>
                { valueCategoria !== 'home' ? null : <FormFeedback>Ingresa una categoria</FormFeedback>
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
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}
                    />
                    { valueDateFin ? null : <FormFeedback>Ingresa una fecha final</FormFeedback>
                    }
                </Col>
                <Col lg='3' sm='4'>
                    <Row className='match-height'>
                        <Col lg='7' sm='7'> 
                            <Label for="exampleSelect">Remolque</Label>
                            <Input type="text" 
                            name="select" 
                            id="Remolque"
                            value={valueRemolque}
                            onChange={handleChangeRemolque}
                            />

                        </Col>
                        <Col lg='5' sm='5' style={{justifyContent: "flex-start"}}> 
                            <Button
                                color='primary'
                                size='sm'
                                style={{marginTop:'15px'}}
                                onClick={() => handleAddEventClick()}
                            ><Search/></Button>
                        </Col>
                    </Row>
               </Col>
            </Row>
            
            <Button
                color='primary'
                onClick={() => handleReporte()}
            ><Download/></Button>


            </CardBody>
        </Card>
        
        <Card>
            <CardBody>
            {
                valueTable.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueTable} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
            }
            </CardBody>
        </Card>

        
    </Fragment>
  )
}

export default Transacciones
