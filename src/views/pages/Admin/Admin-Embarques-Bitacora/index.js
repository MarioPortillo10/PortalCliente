// ** React Imports
import { Fragment, useEffect, useState  } from 'react'
import { getUserData } from '@utils'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// ** Third Party Components

import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import { Search } from 'react-feather'
// Grafica Horas
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../../Utils/Spinner'

// Chart JS
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js'

import { Bar, Pie } from 'react-chartjs-2'

const AdmEmbarquesBitacora = (props) => {
    
    const [valueIng, setValueIng] = useState('')
    const [productos, setProductos] = useState({tipo: "", name: "", cantidad: "", codigo:null})
    const [Codigos, setCodigos] = useState([{name:"", code:''}])
    //const [valueFiles, setValueFiles] = useState([])
    const [valueRemolque, setValueRemolque] = useState(null)
    const [valueDateIn, setValueDateIn] = useState(null)
    const [valueDateFin, setValueDateFin] = useState(null)
    const user = getUserData()
    const [valueError, setValueError] =  useState({producto: false, fechaIn: false, fechaFin: false, Remolque: false})
    const [valueRegisters, setValueRegisters] = useState([])
    const [valueRegistersDetalle, setValueRegistersDetalle] = useState([])
    const [valueRegistersParos, setValueRegistersParos] = useState([])
    const [valueDetallesParos, setvalueDetallesParos] = useState({almapacStopTime: "", cepaStopTime: "", otherStopTime: "", totalStopTime:""})
    const [valueDetallesBitacora, setvalueDetallesBitacora] = useState({arrivalDate: "", endDate: "", receptionDate: "", shipName:"", totalQuantity:""})
    const [modalDetalle, setmodalDetalle] = useState({ modal: false })
    const [modalParos, setmodalParos] = useState({ modal: false })
    const [ValueEmpresaSelect, setValueEmpresaSelect] = useState([])
    const [ValueEmpresa, setValueEmpresa] = useState([])
    const [shipName, setshipName] = useState("")
    const [ProductDetalle, setProductDetalle] = useState("")

    const [spinner, setspinner] = useState(false)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token =  user.accessToken

    const GetBarcos = axios.create({
        baseURL: `http://10.10.21.5:8080/api/Ships/Export/ActiveByCustomer?customerId=${ValueEmpresa}`,
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })
  
    const toggleDetalle = (e, id, name, product) => {
        e.preventDefault()
        setmodalDetalle({ modal: !modalDetalle.modal })
        console.log("ID: ", id)
        console.log("name: ", name)
        setshipName(name)
        setProductDetalle(product)
        setspinner(true)
        const GetBarcosDetalle = axios.create({
            baseURL:`http://10.10.21.5:8080/api/Exports/BinnacleDetails?exportBinnacleId=${id}`,
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })

        GetBarcosDetalle.get('')
        .then(response => {
          setspinner(false)
            setvalueDetallesBitacora(response.data.data)
            setValueRegistersDetalle(response.data.data.movements)
            //return response.data
        })

    }

    const toggleParos = (e, id, name, product) => {
        e.preventDefault()
        setspinner(true)
        setmodalParos({ modal: !modalParos.modal })
        console.log("ID Paros: ", id)
        console.log("name: ", name)
        setshipName(name)
        setProductDetalle(product)
        const GetBarcosDetalle = axios.create({
            baseURL:`http://10.10.21.5:8080/api/Exports/Stops?exportBinnacleId=${id}`,
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })

        GetBarcosDetalle.get('')
        .then(response => {
            setspinner(false)
            setvalueDetallesParos(response.data.data)
            setValueRegistersParos(response.data.data.stops)
            //return response.data
        })

    }

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


      const handleAddEventClick = () => {

            // if (valueDateFin && valueDateIn && valueRemolque) {
            //     instanceFilesList.post('', {
            //         startDate: new Date(valueDateIn), //"2023-02-24T14:21:17.141Z",
            //         finalDate: new Date(valueDateFin), //"2023-02-24T14:21:17.141Z",
            //         fileName: valueRemolque//"string"
                      
            //     })
            //       .then(response => {
            //           console.log("Response: ", response)
            //           setValueFiles(response.data.data)
        
            //       })
            // }
            setspinner(true)
            const GetBitacoras = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Exports/Binnacles',
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })
              GetBitacoras.post('', {
                startDate: valueDateIn,
                endDate: valueDateFin,
                shipId: productos.codigo
              })
                .then(response => {
                  setspinner(false)
                    setValueRegisters(response.data.data)
                    
                    console.log("response.data Barcos: ", response.data)
                })
      }

      const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/File/GetDocument',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

        
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
            setValueEmpresaSelect(response.data.data)
              //return response.data
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
          minWidth: '250px',
          selector: row => row.date
        },
        {
          name: 'Categoria',
          sortable: true,
          minWidth: '250px',
          selector: row => row.itemCategory
        },
        {
          name: 'Cantidad',
          sortable: true,
          minWidth: '250px',
          selector: row =>  `${row.quantity.toLocaleString("en-US", { minimumFractionDigits: 4 })} TM`
        },
        {
          name: 'Cantidad restante',
          sortable: true,
          minWidth: '250px',
          selector: row => `${row.remainingQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Barco',
            sortable: true,
            minWidth: '250px',
            selector: row => row.ship
        },
        {
            name: 'Acciones',
            cell:(row) => [<Button color='primary'  size="sm"  onClick={(e) => toggleDetalle(e, row.id, row.ship, row.itemCategory)} id={row.number}>Detalle</Button>, <Button style={{ margin: "10px" }} color="danger" size="sm" onClick={(e) => toggleParos(e, row.id, row.ship, row.itemCategory)} id={row.number}>Paros</Button>],
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '250px'
        }
        
      ]


      const basicColumnsDetalle = [
        {
          name: 'Fecha',
          sortable: true,
          minWidth: '250px',
          selector: row => row.date
        },
        {
          name: 'Hora',
          sortable: true,
          minWidth: '250px',
          selector: row => row.hour
        },
        {
          name: 'Cantidad',
          sortable: true,
          minWidth: '250px',
          selector: row => `${row.cumulativeQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
          name: 'Cantidad restante',
          sortable: true,
          minWidth: '250px',
          selector: row => `${row.remainingQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
        },
        {
            name: 'Rendimiento por hora',
            sortable: true,
            minWidth: '250px',
            selector: row => `${row.hourlyPerformance.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM` 
        }
        
      ]

      const basicColumnsParos = [
        {
          name: 'Fecha Inicio',
          sortable: true,
          minWidth: '225px',
          selector: row => row.startDate
        },
        {
          name: 'Hora Inicio',
          sortable: true,
          minWidth: '310px',
          selector: row => row.startHour
        },
        {
          name: 'Fecha fin',
          sortable: true,
          minWidth: '250px',
          selector: row => row.endDate
        },
        {
          name: 'Hora Fin',
          sortable: true,
          minWidth: '250px',
          selector: row => row.endHour
        },
        {
            name: 'Causa paro',
            sortable: true,
            minWidth: '250px',
            selector: row => row.stopCause
        },
        {
            name: 'Tiempo paro',
            sortable: true,
            minWidth: '250px',
            selector: row => row.stopTime
        },
        {
            name: 'Tipo paro',
            sortable: true,
            minWidth: '250px',
            selector: row => row.stopType
        }
        
      ]

      useEffect(() => {
        setspinner(true)
        const GetBitacoras = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Exports/Binnacles',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          GetBitacoras.post('', {
            startDate: "2023-04-04T18:43:54.312Z",
            endDate: "2023-04-04T18:43:54.312Z",
            shipId: null
          })
            .then(response => {
              setspinner(false)
                setValueRegisters(response.data.data)
                
                console.log("response.data Barcos: ", response.data)
            })
      }, []) 

      useEffect(() => {
        setspinner(true)
        GetBarcos.get('')
        .then(response => {
          setspinner(false)
            setCodigos(response.data.data)
        })
        
       
    }, [ValueEmpresa])

  return (
    <Fragment>
      <SpinnerComp message="Cargando..." estado={spinner}  />
        <div>
            <Modal size="lg" style={{minWidth: '80%', width: '100%'}} isOpen={modalDetalle.modal} toggle={toggleDetalle} className={props.className}>
                <ModalHeader toggle={toggleDetalle}> Detalles Bitacora </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <CardTitle>Detalles Barco: <span style={{fontWeight:"bold"}}>{shipName}</span></CardTitle>
                            <p>Producto: <span style={{fontWeight:"bold"}}>{ProductDetalle}</span></p>
                            <p>Fecha de llegada: <span style={{fontWeight:"bold"}}>{valueDetallesBitacora.arrivalDate}</span></p>
                            <p>Fecha final: <span style={{fontWeight:"bold"}}>{valueDetallesBitacora.endDate}</span></p>
                            <p>Cantidad total: <span style={{fontWeight:"bold"}}>{valueDetallesBitacora.totalQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM</span></p>
                        </CardBody>
                    </Card>
                    <TableZeroConfig columns={basicColumnsDetalle} contenido={valueRegistersDetalle} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"  onClick={toggleDetalle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
        <div>
            <Modal size="lg" style={{minWidth: '80%', width: '100%'}} isOpen={modalParos.modal} toggle={toggleParos} className={props.className}>
                <ModalHeader toggle={toggleParos}> Paros Barco: <span style={{fontWeight:"bold"}}>{shipName}</span> </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <CardTitle>Detalles</CardTitle>
                            <p>Producto: <span style={{fontWeight:"bold"}}>{ProductDetalle}</span></p>
                            <p>Hora de parada Almapac: <span style={{fontWeight:"bold"}}>{valueDetallesParos.almapacStopTime}</span></p>
                            <p>Hora de parada: <span style={{fontWeight:"bold"}}>{valueDetallesParos.cepaStopTime}</span></p>
                            <p>Otro tiempo de parada: <span style={{fontWeight:"bold"}}>{valueDetallesParos.otherStopTime}</span></p>
                            <p>Tiempo de parada total: <span style={{fontWeight:"bold"}}>{valueDetallesParos.totalStopTime}</span></p>
                        </CardBody>
                    </Card>
                    <TableZeroConfig columns={basicColumnsParos} contenido={valueRegistersParos} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"  onClick={toggleParos}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
        <Card style={{background: "#cce5fd"}}>
            <CardBody>
            <CardTitle>Barcos</CardTitle>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
              <Col lg='2' sm='6'>
                <Label for="tipo">Empresa</Label>
                    <Input type='select'value={ValueEmpresa} 
                        onChange={(e) => setValueEmpresa(e.target.value)}
                        label='Controlled'
                        id='Client'
                    >
                    <option key={8} value="">seleccionar</option>
                    {ValueEmpresaSelect.map((emp, index) => <option key={index + 100} value={emp.id} >{emp.name}</option>)
                    }
                    </Input>
                </Col>    
                <Col lg='2' sm='6'>
                <Label for="tipo">Código Barco</Label>
                    <Input type='select'value={productos.codigo} 
                        onChange={(e) => setProductos({...productos, codigo: e.target.value })}
                        label='Controlled'
                        id='Client'
                    >
                    <option key={8} value="">seleccionar</option>
                    {Codigos.map((cod, index) => <option key={index + 100} value={cod.code} >{cod.code}</option>)
                    }
                    </Input>
                </Col>
                <Col lg='2' sm='6'>
                  <Label for="exampleSelect">Nombre Barco</Label>
                  <Input type='select'value={productos.codigo} 
                        onChange={(e) => setProductos({...productos, codigo: e.target.value })}
                        label='Controlled'
                        id='Client'
                    >
                    <option key={8} value="">seleccionar</option>
                    {Codigos.map((cod, index) => <option key={index + 100} value={cod.code} >{cod.name}</option>)
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
                <Col lg='2' sm='4'>
                    <Row className='match-height'>
                        
                        <Col lg='6' sm='6' style={{justifyContent: "flex-end"}}> 
                            <Button
                                style={{marginTop:"15px"}}
                                size='sm'
                                onClick={() => handleAddEventClick()}
                                color="primary"
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
                valueRegisters?.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueRegisters} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filttros para mostrar la información</p>
            }
            </CardBody>
        </Card>
        
    </Fragment>
  )
}

export default AdmEmbarquesBitacora
