// ** React Imports
import { /*useContext,*/ Fragment, useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
// ** Icons Imports
import { List, Eye, CameraOff } from 'react-feather'

import './css/style.css'

// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import Tabs from '@src/views/components/tabs'

// ** Utils
import { /*kFormatter, */getUserData } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import {
  Row, Col, Card,
  CardHeader, CardTitle, CardBody,
  TabContent, TabPane,
  Nav, NavItem, NavLink, Input, Label, Button, Table, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'

// ** Demo Components
import InvoiceList from '@src/views/apps/invoice/list'
import Sales from '@src/views/ui-elements/cards/analytics/Sales'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'


import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'

import SpinnerComp from '../Utils/Spinner'

//import axios from 'axios'

// ** Images
//import jsonImg from '@src/assets/images/icons/json.png'
//import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

import axios from 'axios'

const HomeImportador = (props) => {
  // ** Context
  //const { colors } = useContext(ThemeColors)
  const [ValueEmpresaSelect, setValueEmpresaSelect] = useState([{}])
  const [ValueEmpresa, setValueEmpresa] = useState(null)
  const [ValueProducts, setValueProducts] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = getUserData()
  const token = user.accessToken

  const [modalDetalle, setmodalDetalle] = useState({ modal: false })
  const [ValueProductsDetalle, setValueProductsDetalle] = useState(null)

  const [valueFechaInicial, setValueFechaInicial] = useState(null)
  const [valueFechaFinal, setValueFechaFinal] = useState(null)

  const [spinner, setspinner] = useState(false)

  // ** State
  //const [active, setActive] = useState('1')

  //Actual
  /*const [valueProductos, setValueProductos]  = useState({data:{
    totalProducts: 40000,
    totalUnits: 2000,
    totalTransactions: 0,
    transactions: {
      inPreCheck: 0,
      inProgress: 0,
      dispatched: 0
    }
  }})*/

  //const user = getUserData()

  //const tokens =  user.accessToken

  const valueProductos = [
    {
      data: {
        totalProducts: 40000,
        totalUnits: 2000,
        totalTransactions: 0,
        producto: "Azucar",
        transactions: {
          inPreCheck: 8,
          inProgress: 5,
          dispatched: 4,
          ingresadas: 6
        }
      }
    },
    {
      data: {
        totalProducts: 80000,
        totalUnits: 2000,
        totalTransactions: 0,
        producto: "Melaza",
        transactions: {
          inPreCheck: 8,
          inProgress: 5,
          dispatched: 4,
          ingresadas: 6
        }
      }
    },
    {
      data: {
        totalProducts: 30000,
        totalUnits: 5000,
        totalTransactions: 0,
        producto: "Azucar",
        transactions: {
          inPreCheck: 8,
          inProgress: 5,
          dispatched: 4,
          ingresadas: 6
        }
      }
    }
  ]

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  /*const [productos, SetProductos] = useState(
    {
      data: {
    products: [
      {
        id: "1",
        categoryId: "Categoria 5",
        description: "Categoria 1",
        quantity: 0
      },
      {
        id: "2",
        categoryId: "Categoria 5",
        description: "Categoria 1",
        quantity: 0
      },
      {
        id: "3",
        categoryId: "Categoria 5",
        description: "Categoria 1",
        quantity: 0
      },
      {
        id: "4",
        categoryId: "Categoria 5",
        description: "Categoria 1",
        quantity: 0
      },
      {
        id: "5",
        categoryId: "Categoria 5",
        description: "Categoria 1",
        quantity: 0
      }
    ]
  }})*/


  // ** Vars
  /*const avatarGroupArr = [
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Billy Hopkins',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Amy Carson',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-6.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Brandon Miles',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Daisy Weber',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-7.jpg').default
    },
    {
      imgWidth: 33,
      imgHeight: 33,
      title: 'Jenny Looper',
      placement: 'bottom',
      img: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default
    }
  ]*/
  /*const data = [
    {
      title: '12 Invoices have been paid',
      content: 'Invoices have been paid to the company.',
      meta: '',
      metaClassName: 'me-1',
      customContent: (
        <div className='d-flex align-items-center'>
          <img className='me-1' src={jsonImg} alt='data.json' height='23' />
          <span>data.json</span>
        </div>
      )
    },
    {
      title: 'Client Meeting',
      content: 'Project meeting with john @10:15am.',
      meta: '',
      metaClassName: 'me-1',
      color: 'warning',
      customContent: (
        <div className='d-flex align-items-center'>
          <Avatar img={ceo} />
          <div className='ms-50'>
            <h6 className='mb-0'>John Doe (Client)</h6>
            <span>CEO of Infibeam</span>
          </div>
        </div>
      )
    },
    {
      title: 'Create a new project for client',
      content: 'Add files to new design folder',
      color: 'info',
      meta: '',
      metaClassName: 'me-1',
      customContent: <AvatarGroup data={avatarGroupArr} />
    },
    {
      title: 'Create a new project for client',
      content: 'Add files to new design folder',
      color: 'danger',
      meta: '',
      metaClassName: 'me-1'
    }
  ]*/
  const labels = ['', '', '']
  const dataset = valueProductos.map(function (x) {
    return {
      label: "Prechequeo",
      data: [x.data.transactions ? x.data.transactions.inPreCheck : 0, 0, 0],
      backgroundColor: '#F4D03F'
    }
  })

  console.log(dataset)
  const data = {
    labels,
    datasets: [

      {
        label: "Prechequeo",
        data: [valueProductos[0].data.transactions ? valueProductos[0].data.transactions.inPreCheck : 0, 0],
        backgroundColor: '#F4D03F'
      },
      {
        label: "Despachadas",
        data: [0, valueProductos[0].data.transactions ? valueProductos[0].data.transactions.dispatched : 0],
        backgroundColor: '#EB984E'
      },
      {
        label: "Ingresadas",
        data: [0, 0, valueProductos[0].data.transactions ? valueProductos[0].data.transactions.ingresadas : 0],
        backgroundColor: '#EB984E'
      }
    ]
  }

  console.log(data)


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Estados'
      }
    }
  }
  const Empresas = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=2',
    timeout: 0,
    headers: { Authorization: `Bearer ${token}` }
  })

  useEffect(() => {
    setspinner(true)
    Empresas.get('')
      .then(response => {
        setspinner(false)
        setValueEmpresaSelect(response.data.data)

      }).catch(error => {
        setspinner(false)
        if (error.response.status === 401) {

          dispatch(handleLogout())
          navigate('/Login')
          alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
        }

      })
  }, [])

  useEffect(() => {
    setspinner(true)
    const valuedefault = ValueEmpresa ? ValueEmpresa : ValueEmpresaSelect[0].id
    const Productos = axios.create({
      baseURL: `http://10.10.21.5:8080/api/Summary/ImporterProducts?customerId=${valuedefault}${valueFechaInicial ? `&startDate=${valueFechaInicial}` : ''}${valueFechaFinal ? `&finalDate=${valueFechaFinal}` : ''}`, //002001-001
      timeout: 0,
      headers: { Authorization: `Bearer ${token}` }
    })
    Productos.get('')
      .then(response => {
        setspinner(false)
        const respuesta = {
          data: [
            {
              id: "ARR-B-001",
              name: "ARROZ BLANCO EN SACO",
              imageUrl: null,
              dispatchedQuantity: 0,
              availableQuantity: 0,
              units: {
                inPreCheck: 5,
                entered: 6,
                dispatched: 2
              }
            },
            {
              id: "MB-001",
              name: "MAÍZ BLANCO ",
              imageUrl: "http://10.10.21.5:8080/api/Sections/Image/20230403232339_853416_seccion 5.jpg",
              dispatchedQuantity: 0,
              availableQuantity: 0,
              units: {
                inPreCheck: 1,
                entered: 4,
                dispatched: 8
              }
            }
          ]
        }
        console.log(respuesta)
        //setValueProducts(respuesta.data)
        setValueProducts(response.data.data)


        //setValueEmpresaSelect(response.data.data)

      }).catch(error => {
        setspinner(false)
        if (error.response.status === 401) {

          dispatch(handleLogout())
          navigate('/Login')
          alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
        }

      })
  }, [ValueEmpresa, ValueEmpresaSelect, valueFechaFinal, valueFechaInicial])

  const Detalle = (e, status, product) => {
    e.preventDefault()
    setspinner(true)
    const DetalleProduct = axios.create({
      baseURL: `http://10.10.21.5:8080/api/Summary/ImporterProductsByStatus?customerId=${/*"002001-001*/ValueEmpresa}&productId=${product}&transactionStatus=${/*3*/status}${valueFechaInicial ? `&startDate=${valueFechaInicial}` : ''}${valueFechaFinal ? `&finalDate=${valueFechaFinal}` : ''}`, //002001-001
      timeout: 0,
      headers: { Authorization: `Bearer ${token}` }
    })

    DetalleProduct.get('')
      .then(response => {
        setspinner(false)
        setValueProductsDetalle(response.data.data)
      }).catch(error => {
        setspinner(false)
        if (error.response.status === 401) {

          dispatch(handleLogout())
          navigate('/Login')
          alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
        }

      })

    setmodalDetalle({ modal: !modalDetalle.modal })
  }

  const basicColumns = [
    {
      name: 'Tiempo prechequeo',
      sortable: true,
      minWidth: '150px',
      selector: row => row.preCheckTime
    },
    {
      name: 'tiempo de admision',
      sortable: true,
      minWidth: '150px',
      selector: row => row.admissionTime
    },
    {
      name: 'Hora de salida',
      sortable: true,
      minWidth: '150px',
      selector: row => row.departureTime
    },
    {
      name: 'Estado',
      sortable: true,
      minWidth: '150px',
      selector: row => row.status
    },
    {
      name: 'Placa',
      sortable: true,
      minWidth: '150px',
      selector: row => row.plate
    },
    {
      name: 'Producto',
      sortable: true,
      minWidth: '150px',
      selector: row => row.product
    }

  ]

  return (
    <Fragment>
      <SpinnerComp message="Cargando..." estado={spinner}  />
      {/* Modal detalle productos */}
      <div>
        <Modal size="lg" style={{ minWidth: '80%', width: '100%' }} isOpen={modalDetalle.modal} toggle={Detalle} className={props.className}>
          <ModalHeader toggle={Detalle}>Detalle de producto</ModalHeader>
          <ModalBody>
            <Card>
              <CardBody>
                {
                  ValueProductsDetalle?.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={ValueProductsDetalle} /> : <p style={{ textAlign: "center" }}> Por favor utilizar los filtros para mostrar la información</p>
                }
              </CardBody>
            </Card>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={Detalle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </div>
      <Card id="card-filtros">
        <CardBody>
          <Row>
            <Col lg='4' sm='4'>
              <Label for="tipo">Empresa</Label>
              <Input type='select' value={ValueEmpresa}
                onChange={(e) => setValueEmpresa(e.target.value)}
                label='Controlled'
                id='Client'
                invalid={!ValueEmpresa ? true : null}
              >
                <option key={8} value="">seleccionar</option>
                {ValueEmpresaSelect?.map((emp, index) => <option key={index + 100} value={emp.id} >{emp.name}</option>)
                }
              </Input>
              {ValueEmpresa ? null : <FormFeedback>Selecciona una empresa</FormFeedback>
              }
            </Col>
            <Col lg='4' sm='4'>
              <Label for="exampleDatetime">Inicio</Label>
              <Input onChange={(e) => setValueFechaInicial(e.target.value)}
                value={valueFechaInicial}
                type="date"
                name="date"
                id="fechaInicial"
                placeholder="datetime placeholder"
                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
            </Col>
            <Col lg='4' sm='4'>
              <Label for="exampleDatetime">Fin</Label>
              <Input onChange={(e) => setValueFechaFinal(e.target.value)}
                value={valueFechaFinal}
                type="date"
                name="date"
                id="fechaFinal"
                placeholder="datetime placeholder"
                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
            </Col>
          </Row>

        </CardBody>
      </Card>
      <div id='dashboard-analytics'>


        {/*<SubscribersGained kFormatter={kFormatter} />*/}
        <Row>
          {ValueProducts?.length > 0 ? ValueProducts.map((product/*, index*/) => <>
            
            <Col lg='6' sm='12' xs='12' md='6' /*md={{ span: 6, order: index }}*/ style={{ display: "flex", flexDirection:"column" }} >
            <Label style={{marginBottom:"10px"}}><span style={{fontWeight:"bold", marginLeft:"15px", marginBottom:"10px"}}>Producto:</span> {product.name}</Label>
              <Card >
                <CardBody>
                  {/* <CardTitle>Producto: {product.name}</CardTitle> */}
                  <Row>
                    <Col lg='12' sm='12' xs='12' md='12' /*md={{ span: 6, order: index + 2 }}*/ style={{ textAlign: "center" }}>
                      <Table style={{textAlign:"left"}}>
                        <thead >
                          <tr> 
                            <th style={{backgroundColor:"transparent", fontWeight:"bold"}}>Cantidad disponible</th>
                            <th style={{backgroundColor:"transparent", fontWeight:"bold"}}>Cantidad despachada</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{product.availableQuantity}</td>
                            <td>{product.dispatchedQuantity}</td>
                          </tr>
                        </tbody>
                      </Table>
                      {/* <OrdersReceived style={{display:"none"}} key={index} kFormatter={kFormatter} warning={colors.warning.main} total={product.availableQuantity} title="Toneladas Metricas" />
                      <OrdersReceived style={{display:"none"}} key={index} kFormatter={kFormatter} warning={colors.warning.main} total={product.dispatchedQuantity} title="Toneladas Metricas" /> */}
                    </Col>
                    <Col lg='12' sm='12' xs='12' md='12' /*md={{ span: 6, order: index + 1 }}*/ style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                      {
                        product.imageUrl ? <img src={product.imageUrl} alt='Product' width="60%" style={{ borderRadius: "10%", marginTop: "15px" }} /> : <CameraOff width="40%" height="40%" style={{ marginTop: "15px" }} />
                      }

                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col lg='6' sm='12' xs='12' md='6' /*md={{ span: 6, order: index + 1 }}*/>
            <Label style={{marginBottom:"10px"}}><span style={{fontWeight:"bold", marginLeft:"15px", marginBottom:"10px"}}>Estados</span></Label>
              <Card >
                <CardBody>
                  <div style={{ background: "white" }}>
                    <Bar options={options} data={/*data*/
                      {
                        labels,
                        datasets: [

                          {
                            label: "Prechequeo",
                            data: [product.units.inPreCheck ? product.units.inPreCheck : 0, 0],
                            backgroundColor: '#F4D03F'
                          },
                          {
                            label: "Despachadas",
                            data: [0, product.units.dispatched ? product.units.dispatched : 0],
                            backgroundColor: '#EB984E'
                          },
                          {
                            label: "Ingresadas",
                            data: [0, 0, product.units.entered ? product.units.entered : 0],
                            backgroundColor: '#EB984E'
                          }
                        ]
                      }
                    } />

                  </div>
                  <Row>
                    <Col lg='4' sm='4' xs='4'>
                      {/* <Label>Prechequeo: </Label> */}
                      {/* <Button color='primary' style={{margin: '10px'}} size="sm"><Eye/></Button> */}
                      <Button
                        id="Prechequeo-btn"
                        size='sm'
                        color='primary'
                        style={{ margin: "5px" }}
                        onClick={(e) => Detalle(e, 1, product.id)}
                      ><Eye /> Prechequeo</Button>
                    </Col>
                    <Col lg='4' sm='4' xs='4'>
                      {/* <Label>Despachadas: </Label> */}
                      {/* <Button color='primary' style={{margin: '10px'}} size="sm"><Eye/></Button> */}
                      <Button
                        size='sm'
                        color='primary'
                        style={{ margin: "5px" }}
                        onClick={(e) => Detalle(e, 3, product.id)}
                      ><Eye /> Despachadas</Button>
                    </Col>
                    <Col lg='4' sm='4' xs='4'>
                      {/* <Label>Ingresadas: </Label> */}
                      {/* <Button color='primary' style={{margin: '10px'}} size="sm"><Eye/></Button> */}
                      <Button
                        size='sm'
                        color='primary'
                        style={{ margin: "5px" }}
                        onClick={(e) => Detalle(e, 2, product.id)}
                      ><Eye /> Ingresadas</Button>
                    </Col>

                  </Row>
                </CardBody>
              </Card>
            </Col>

          </>
          ) : <Card>
            <CardBody>
              <p style={{ textAlign: "center" }}> Por favor utilizar los filtros para mostrar la información</p>
            </CardBody>
          </Card>
          }
        </Row>


        {/*<Col lg='6' sm='6'>
                <Card >
                    <CardBody>
                      <h4 className='fw-bolder mt-1'>Producto: Melaza</h4>
                      <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos[0].data.totalProducts} title="Toneladas Metricas" />
                    </CardBody>
                </Card>
              </Col>*/}


      </div>
    </Fragment>

  )
}

export default HomeImportador
