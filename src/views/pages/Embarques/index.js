// ** React Imports
import { Fragment, useEffect, useState  } from 'react'
import { getUserData } from '@utils'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// ** Third Party Components

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'

import { Search } from 'react-feather'

// Grafica Horas
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'

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

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../Utils/Spinner'

const Embarques = (props) => {
    
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
    const [modalDetalle, setmodalDetalle] = useState({ modal: false })
    const [modalParos, setmodalParos] = useState({ modal: false })
    const [ValueEmpresaSelect, setValueEmpresaSelect] = useState([])
    const [ValueEmpresa, setValueEmpresa] = useState(null)

    const [spinner, setspinner] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [shipName, setshipName] = useState("")
    const [ProductDetalle, setProductDetalle] = useState("")
  
    const token =  user.accessToken

    const GetBarcos = axios.create({
        baseURL: `http://10.10.21.5:8080/api/Ships/Export/ActiveByCustomer?customerId=${ValueEmpresa}`,
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })
  
    const toggleDetalle = (e, id, name, product) => {
        e.preventDefault()
        //setspinner(true)
        setmodalDetalle({ modal: !modalDetalle.modal })
        console.log("ID: ", id)
        console.log("name: ", name)
        setshipName(name)
        setProductDetalle(product)
        const GetBarcosDetalle = axios.create({
            baseURL:`http://10.10.21.5:8080/api/Exports/BinnacleDetails?exportBinnacleId=${id}`,
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })

        GetBarcosDetalle.get('')
        .then(response => {
           // setspinner(false)
            setValueRegistersDetalle(response.data.data)
            //return response.data
        })

        const GetParos = axios.create({
          baseURL:`http://10.10.21.5:8080/api/Exports/Stops?exportBinnacleId=${id}`,
          timeout: 0,
          headers: {Authorization: `Bearer ${token}`}
        })

        GetParos.get('')
        .then(response => {
            
            console.log("response.data Detalle barco: ", response.data)
            setvalueDetallesParos(response.data.data)
            setValueRegistersParos(response.data.data.stops)
            //return response.data
        })

    }

    const toggleParos = (e, id, name) => {
        e.preventDefault()
        setspinner(true)
        setmodalParos({ modal: !modalParos.modal })
        console.log("ID Paros: ", id)
        console.log("name: ", name)

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
            setspinner(true)
            const GetBitacoras = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Exports/Binnacles',
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })
              GetBitacoras.post('', {
                startDate: valueDateIn,
                endDate: valueDateFin,
                shipId: productos.codigo,
                customerId: ValueEmpresa
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

          }).catch(error => {

            if (error.response.status === 401) {
              
              dispatch(handleLogout())
              navigate('/Login')
              alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
            } 
    
          })
      }, [])     


    //   useEffect(() => {
    //     setValueRegisters([
    //         {
    //         name: 'Juan',
    //         dateLogin: '22/03/2023',
    //         dateLogout: '22/03/2023',
    //         activities: 'Delete user'
    //         },
    //         {
    //             name: 'Pedro',
    //             dateLogin: '22/03/2023',
    //             dateLogout: '22/03/2023',
    //             activities: 'Update user'
    //         }
    //     ])
    //   }, []) 

      const basicColumns = [
        {
          name: 'Fecha',
          sortable: true,
          minWidth: '225px',
          selector: row => row.date
        },
        {
          name: 'Categoria',
          sortable: true,
          minWidth: '310px',
          selector: row => row.itemCategory
        },
        {
          name: 'Cantidad',
          sortable: true,
          minWidth: '250px',
          selector: row => `${row.quantity} TM`
        },
        {
          name: 'Cantidad restante',
          sortable: true,
          minWidth: '250px',
          selector: row => `${row.remainingQuantity} TM`
        },
        {
            name: 'Barco',
            sortable: true,
            minWidth: '250px',
            selector: row => row.ship
        },
        {
            name: 'Acciones',
            cell:(row) => [<Button color='primary'  size="sm"  onClick={(e) => toggleDetalle(e, row.id, row.ship, row.itemCategory)} id={row.number}>Detalle</Button>/*, <Button style={{ margin: "10px" }} color="danger" size="sm" onClick={(e) => toggleParos(e, row.id, row.ship)} id={row.number}>Paros</Button>*/],
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
          minWidth: '225px',
          selector: row => row.date
        },
        {
          name: 'Hora',
          sortable: true,
          minWidth: '310px',
          selector: row => row.hour
        },
        {
          name: 'Cantidad',
          sortable: true,
          minWidth: '250px',
          selector: row => row.cumulativeQuantity
        },
        {
          name: 'Cantidad restante',
          sortable: true,
          minWidth: '250px',
          selector: row => row.remainingQuantity
        },
        {
            name: 'Rendimiento por hora',
            sortable: true,
            minWidth: '250px',
            selector: row => row.hourlyPerformance
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
        GetBarcos.get('')
        .then(response => {
            setspinner(false)
            console.log("response.data Barcos: ", response.data)
            //return response.data
            setCodigos(response.data.data)
        })  
       
    }, [ValueEmpresa])

  return (
    <Fragment>
        <SpinnerComp message="Cargando..." estado={spinner}  />
        <div>
            <Modal size="lg" style={{minWidth: '80%', width: '100%'}} isOpen={modalDetalle.modal} toggle={toggleDetalle} className={props.className}>
                <ModalHeader toggle={toggleDetalle}> Detalles Barco:  <span style={{fontWeight:"bold"}}>{shipName}</span> </ModalHeader>
                <ModalBody>
                <Card>
                        <CardBody>
                            <CardTitle>Detalles Bitacora: </CardTitle>
                            <p>Producto: <span style={{fontWeight:"bold"}}>{ProductDetalle}</span> </p>
                            <p>Fecha de llegada: <span style={{fontWeight:"bold"}}>{valueRegistersDetalle.arrivalDate}</span> </p>
                            <p>Fecha final: <span style={{fontWeight:"bold"}}>{valueRegistersDetalle.endDate}</span></p>
                            <p>Fecha de recepción: <span style={{fontWeight:"bold"}}>{valueRegistersDetalle.receptionDate}</span></p>
                            <p>Cantidad total: <span style={{fontWeight:"bold"}}>{valueRegistersDetalle?.totalQuantity?.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM</span></p>
                            {
                                valueRegistersDetalle?.movements?.length > 0 ?  <TableZeroConfig columns={basicColumnsDetalle} contenido={valueRegistersDetalle.movements} /> : <p style={{textAlign:"center", marginTop:"15px"}}> No hay registros </p>
                            }
                            
                           
                        </CardBody>
                    </Card>
                    
                    <Card>
                        <CardBody>
                            <CardTitle>Detalles Paros: </CardTitle>
                            <p>Hora de parada Almapac: <span style={{fontWeight:"bold"}}>{valueDetallesParos.almapacStopTime}</span></p>
                            <p>Hora de parada: <span style={{fontWeight:"bold"}}>{valueDetallesParos.cepaStopTime}</span></p>
                            <p>Otro tiempo de parada: <span style={{fontWeight:"bold"}}>{valueDetallesParos.otherStopTime}</span></p>
                            <p>Tiempo de parada total: <span style={{fontWeight:"bold"}}>{valueDetallesParos.totalStopTime}</span></p>
                            {
                                valueRegistersParos?.length > 0 ? <TableZeroConfig columns={basicColumnsParos} contenido={valueRegistersParos} /> : <p style={{textAlign:"center", marginTop:"15px"}}> No hay registros</p>
                            }
                            
                        </CardBody>
                    </Card>
                    
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"  onClick={toggleDetalle}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </div>
        <div>
            <Modal size="lg" style={{minWidth: '80%', width: '100%'}} isOpen={modalParos.modal} toggle={toggleParos} className={props.className}>
                <ModalHeader toggle={toggleParos}> Paros </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>
                            <CardTitle>Detalles</CardTitle>
                            <p>Hora de parada Almapac: {valueDetallesParos.almapacStopTime}</p>
                            <p>Hora de parada: {valueDetallesParos.cepaStopTime}</p>
                            <p>Otro tiempo de parada: {valueDetallesParos.otherStopTime}</p>
                            <p>Tiempo de parada total: {valueDetallesParos.totalStopTime}</p>
                            
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
            <CardTitle>Embarques</CardTitle>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
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
                </Col>
                {/* <Col lg='2' sm='6'>
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
                </Col> */}
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
                <Col lg='2' sm='4'>
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
                </Col>
                <Col lg='2' sm='4'>
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
            valueRegisters?.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueRegisters} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
        }
        </CardBody>
        </Card>

        
    </Fragment>
  )
}

export default Embarques
