// ** React Imports
import { useContext, Fragment, useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'
import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
//import { Link, useNavigate } from 'react-router-dom'

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
import { List, Eye} from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import Tabs from '@src/views/components/tabs'

// ** Utils
import { kFormatter, getUserData } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col, Card, 
        CardHeader, CardTitle, CardBody,
        TabContent, TabPane, 
        Nav, NavItem, NavLink, Input, Label, Button,  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// ** Demo Components
import InvoiceList from '@src/views/apps/invoice/list'
import Sales from '@src/views/ui-elements/cards/analytics/Sales'
import AvgSessions from '@src/views/ui-elements/cards/analytics/AvgSessions'
import CardAppDesign from '@src/views/ui-elements/cards/advance/CardAppDesign'
import SupportTracker from '@src/views/ui-elements/cards/analytics/SupportTracker'
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'
import SubscribersGained from '@src/views/ui-elements/cards/statistics/SubscribersGained'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'

import axios from 'axios'

import SpinnerComp from '../../pages/Utils/Spinner'

// ** Images
//import jsonImg from '@src/assets/images/icons/json.png'
//import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = (props) => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** State
  const [active, setActive] = useState('1')

  //Actual
  const [valueIng, setValueIng] = useState('')
  const [valueCategoria, setValueCategoria] = useState(null)
  const [valueData, setValuedata] = useState({data:[1,  2, 3]})
  const [valueDataCategoria, setValuedataCategoria] = useState({data:['']})
  const [valueProductos, setValueProductos]  = useState({data:{
    totalProducts: 0,
    totalUnits: 0,
    totalTransactions: 0,
    accumulatedWeightDifference:0,
    totalStorageContracts: 0,
    transactions: {
      inPreCheck: 0,
      inProgress: 0,
      dispatched: 0
    }
  }})

  const [valueFechaInicial, setValueFechaInicial] = useState(null)
  const [valueFechaFinal, setValueFechaFinal] = useState(null)

  const [valueVista, setValueVista] = useState('Actual')
  const [modalDetalle, setmodalDetalle] = useState({ modal: false })

  //Cuotas

  const [valueCuotas, setValueCuotas] = useState([])
  const [valueCuotasDetalle, setValueCuotasDetalle] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [spinner, setspinner] = useState(false)

  //Reset

  const handleClick = (a) => {
    
    if (a === '1') {
      setValueVista('Actual')
    } else {
      setValueVista('Historico')
    }
    
    if (a > 1) {
      setValueIng('seleccione')
    } else {
      setValueIng('seleccionar')
    }
    setValueFechaFinal(null)
    setValueFechaInicial(null)
    setValueCategoria(null)
    setValuedata({data:['']})
    setValuedataCategoria({data:['']})
    setValueProductos({data:{
      totalProducts: 0,
      totalUnits: 0,
      totalTransactions: 0,
      accumulatedWeightDifference:0,
      totalStorageContracts: 0,
      transactions: {
        inPreCheck: 0,
        inProgress: 0,
        dispatched: 0
      }
    }})
  }

  const handleChangeFecha = event => {
    
    if (event.target.id === "fechaInicial") {
        setValueFechaInicial(event.target.value)
    } else {
        setValueFechaFinal(event.target.value)
    }
    
  }

  const handleChange = event => {
    if (event.target.id === "Ingenio") {
      setValueIng(event.target.value)
    } else {
      setValueCategoria(event.target.value)
    }
    
    
  }
  const user = getUserData()
  
  const tokens =  user.accessToken
  

  const instance = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=1',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
  })

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )
  
   const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Transacciones '
      }
    }
  }
  
  const labels = ['Prechequeo', 'En proceso', 'Despachadas']
  
   const data = {
    labels,
    datasets: [
      {
        label: "Prechequeo",
        data: [valueProductos.data.transactions ? valueProductos.data.transactions.inPreCheck : 0, 0, 0],
        backgroundColor: '#F4D03F'
      },
      {
        label: "En proceso",
        data: [0, valueProductos.data.transactions ? valueProductos.data.transactions.inProgress : 0, 0],
        backgroundColor: '#F5B041'
      },
      {
        label: "Despachadas",
        data: [0, 0, valueProductos.data.transactions ? valueProductos.data.transactions.dispatched : 0],
        backgroundColor: '#EB984E'
      }
    ]
  }
  useEffect(() => {
      setspinner(true)
      instance.get('')
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
  }, [valueIng])

  const instance2 = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Summary/Categories',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })
  useEffect(() => {
      
      if (valueIng !== '') {
        setspinner(true)
        instance2.post('', {customerId: valueIng})
        .then(response => {
          setspinner(false)
          setValuedataCategoria(response.data)

        })
      }
      
  }, [valueIng])

  const instance3 = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Summary/ExporterProducts',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })


  useEffect(() => {
    const Historico = axios.create({
      baseURL: `http://10.10.21.5:8080/api/Summary/ExporterHistorical?customerId=${valueIng}&productCategoryId=${valueCategoria}&startDate=${valueFechaInicial}&finalDate=${valueFechaFinal}`,
      timeout: 0,
      headers: {Authorization: `Bearer ${tokens}`}
      
    })
      if (valueIng !== '', valueCategoria !== '') {
        
        //const dateinit = valueVista === 'Actual' ? "2022-01-09T18:41:07.119Z" : valueFechaInicial
        //const dateend = valueVista === 'Actual' ? "2023-02-09T18:41:07.119Z" : valueFechaFinal
        if (valueVista === 'Actual') {
          setspinner(true)
          instance3.post('', {
            //startDate: "2022-01-09T18:41:07.119Z",
            //finalDate: "2023-02-09T18:41:07.119Z",
            customerId: valueIng,
            productCategoryId: valueCategoria
          })
          .then(response => {
            setspinner(false)
            setValueProductos({data:{
              totalProducts: response.data.data.totalProducts,
              totalUnits: response.data.data.totalUnits,
              totalTransactions: 4000,
              transactions: response.data.data.transactions /*{
                inPreCheck: 100,
                inProgress: 200,
                dispatched: 300
              }*/
            }})
              //return response.data
          })
        } else if (valueFechaFinal && valueFechaInicial) {
          setspinner(true)
          Historico.get('')
          .then(response => {
            setspinner(false)
            // , {
            //   startDate: valueFechaInicial,
            //   finalDate: valueFechaFinal,
            //   customerId: valueIng,
            //   productCategoryId: valueCategoria
            // }
            setValueProductos({data:{
              totalProducts: response.data.data.totalProducts,
              totalUnits: response.data.data.totalUnits,
              totalTransactions: 4000,
              accumulatedWeightDifference: response.data.data.accumulatedWeightDifference,
              totalStorageContracts: response.data.data.totalStorageContracts
              /*transactions: {
                inPreCheck: 100,
                inProgress: 200,
                dispatched: 300
              }*/
            }})
              //return response.data
          })
        }
        
      }
      
  }, [valueIng, valueCategoria, valueFechaFinal, valueFechaInicial])

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

  const toggle = tab => {
    handleClick(tab)
    if (active !== tab) {
      setActive(tab)
    }
    

  }

  useEffect(() => {
    const InstasnceCoutas = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Storage/Contracts',
        timeout: 0,
        headers: {Authorization: `Bearer ${tokens}`}
      })
    setspinner(true)
    InstasnceCoutas.post('', {
        customerId: valueIng,
        productId: valueCategoria, //valueCategoria,
        storageId: null, //valueCuota,
        pageNumber: 1,
        pageSize: 200
    }
    ).then(response => {
            setspinner(false)
            setValueCuotas(response.data.data)
    })

}, [valueIng, valueCategoria])

    //Deshabilitar Usuario
    const toggleDetalle = (e, id) => {
      //&productCategoryId=${valueCategoria}&startDate=${valueFechaInicial}&finalDate=${valueFechaFinal}
      e.preventDefault()
      console.log(id)
      const DetalleCuota = axios.create({
        baseURL: `http://10.10.21.5:8080/api/Storage/ContractDetails?customerId=${valueIng}&storageId=${id}${valueFechaInicial ? `&startDate=${valueFechaInicial}` : ''}${valueFechaFinal ? `&finalDate=${valueFechaFinal}` : ''}&pageNumber=1&pageSize=200`, //'http://10.10.21.5:8080/api/Storage/Contracts',
        timeout: 0,
        headers: {Authorization: `Bearer ${tokens}`}
      })
      // DetalleCuota.post('', {
      //     customerId: valueIng,
      //     productId: valueCategoria, //valueCategoria,
      //     storageId: id, //valueCuota,
      //     pageNumber: 1,
      //     pageSize: 200
      // }
      // ).then(response => {
      //         console.log("Response****z: ", response.data.data)
      //         setValueCuotasDetalle(response.data.data)

      // })
      DetalleCuota.get('').then(response => {
              console.log("Response****z: ", response.data.data)
              setValueCuotasDetalle(response.data.data)

      })
      setmodalDetalle({ modal: !modalDetalle.modal })
  }

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
      minWidth: '150px',
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
      minWidth: '150px',
      selector: row => `${row.productStock.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
    },
    {
      name: 'Espacio disponible',
      sortable: true,
      minWidth: '150px',
      selector: row => `${row.availableSpace.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
    },
    {
      name: 'WR',
      sortable: true,
      minWidth: '150px',
      selector: row => `${row.warehouseQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
    },
    {
        name: 'Disponible para exportación',
        sortable: true,
        minWidth: '150px',
        selector: row => `${row.availableProductForExport.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
    },
    {
        name: 'Fecha de vencimiento',
        sortable: true,
        minWidth: '150px',
        selector: row => row.dueDate
    },
    {
        name: 'Fondo de tanque',
        sortable: true,
        minWidth: '150px',
        selector: row => `${row.tankBottomQuantity.toLocaleString("en-US", { minimumFractionDigits: 3 })} TM`
    }
    
  ]


  return (
    <Fragment>
      <SpinnerComp message="Cargando..." estado={spinner}  />
      {/* Modal detalle cuotas */}
      <div>
        <Modal size="lg" style={{minWidth: '80%', width: '100%'}} isOpen={modalDetalle.modal} toggle={toggleDetalle} className={props.className}>
        <ModalHeader toggle={toggleDetalle}>Detalle de couta</ModalHeader>
        <ModalBody>
        <Card>
            <CardBody>
            {
                valueCuotasDetalle.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueCuotasDetalle} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
            }
            </CardBody>
        </Card>
          
        </ModalBody>
        <ModalFooter>
            <Button color="primary"  onClick={toggleDetalle}>Cerrar</Button>
        </ModalFooter>
        </Modal>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            Actual
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
            
          >
            Historico
          </NavLink>
        </NavItem>
        {/*<NavItem>
          <NavLink disabled>Disabled</NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}
          >
            Account
          </NavLink>
        </NavItem>*/}
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
        <div id='dashboard-analytics'>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
              <Col lg='4' sm='6'>
                <Label for="exampleDatetime">Empresa</Label>
                <Input type='select' value={valueIng}
                  label='Controlled'
                  id='Ingenio'
                  onChange={handleChange}
                  >
                  <option key={8} value='home'>seleccionar</option>
                  {valueData.data.map((ing, index) => <option key={index + 100} value={ing.id}>{ing.name}</option>)
                  }
                  
                </Input>
              </Col>
              <Col lg='4' sm='6'>
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
              </Col>
            </Row>
            <Row className='match-height'>

              <Col lg='6' sm='6'>
                {/*<SubscribersGained kFormatter={kFormatter} />*/}
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalProducts} title="Total Toneladas Metricas - Productos" />
              </Col>
              <Col lg='6' sm='6'>
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalUnits} title="Total Unidades" />
              </Col>

            </Row>
            <Row className='match-height'>
              {/*<Col lg='6' xs='6'>
                <SupportTracker primary={colors.primary.main} danger={colors.danger.main}  />
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalUnits}  />
              </Col>*/}
              <Col lg='12' md='12' xs='12'>
              <div style={{background: "white" }}>
                  <Bar options={options} data={data} />
              </div>
              </Col>
            </Row>
            
            {/*<Row className='match-height'>
              <Col xs='12'>
                <InvoiceList />
              </Col>
            </Row>*/}
        </div>
        </TabPane>
        <TabPane tabId='2'>
        <div id='dashboard-analytics'>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
              <Col lg='4' sm='4'>
                <Label for="exampleDatetime">Empresa</Label>
                <Input type='select' value={valueIng}
                  label='Controlled'
                  id='Ingenio'
                  onChange={handleChange}
                  >
                  <option key={8} value='home'>seleccionar</option>
                  {valueData.data.map((ing, index) => <option key={index + 100} value={ing.id}>{ing.name}</option>)
                  }
                  
                </Input>
              </Col>
              <Col lg='4' sm='4'>
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
              </Col>
              <Col lg='4' sm='4'>
                <Row>
                  <Col lg='6' sm='6'>
                    <Label for="exampleDatetime">Inicio</Label>
                    <Input onChange={handleChangeFecha} 
                    value={valueFechaInicial} 
                    type="date" 
                    name="date" 
                    id="fechaInicial" 
                    placeholder="datetime placeholder"
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
                  </Col>
                  <Col lg='6' sm='6'>
                    <Label for="exampleDatetime">Fin</Label>
                    <Input  onChange={handleChangeFecha} 
                    value={valueFechaFinal} 
                    type="date"
                    name="date" 
                    id="fechaFinal" 
                    placeholder="datetime placeholder"
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
                  </Col>
                </Row>
                
              </Col>
              
            </Row>
            <Row className='match-height'>
              
              <Col lg='6' sm='6'>
                {/*<SubscribersGained kFormatter={kFormatter} />*/}
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalProducts} title="Total Toneladas Metricas - Productos" />
              </Col>
              <Col lg='6' sm='6'>
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalUnits} title="Total Unidades" />
              </Col>
              {
                valueCategoria === "3PL-011" ?               <Col lg='6' sm='6'>
                {/*<SubscribersGained kFormatter={kFormatter} />*/}
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.accumulatedWeightDifference} title="Diferencia de peso acumulado" />
              </Col> : null
              }

              <Col lg='6' sm='6'>
                {/*<SubscribersGained kFormatter={kFormatter} />*/}
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalStorageContracts} title="Total contratos de almacenamiento" />
              </Col>
            </Row>
            <Row className='match-height'>
              {/*<Col lg='6' xs='6'>
                <SupportTracker primary={colors.primary.main} danger={colors.danger.main}  />
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueProductos.data.totalUnits}  />
              </Col> ing, index*/}
                {valueCuotas.map((cuota, index) => <>
                  <Col lg='6' sm='12' md='6' xs='6' key={index}>
                    <Card>
                      <CardBody>
                      <SupportTracker 
                        primary={colors.primary.main} 
                        danger={colors.danger.main} 
                        disponibilidad={cuota.storageContractCapacity > 0 ? (cuota.productStock / cuota.storageContractCapacity) * 100 : 0}
                        name={cuota.storageName}  />
                        <div>
                          <Button
                            color='primary'
                            onClick={(e) => toggleDetalle(e, cuota.storageId)}
                          ><Eye/></Button>
                        </div>
                      </CardBody>
                    </Card>

                    
                </Col>
                </>)}
              
            </Row>
        </div>
        </TabPane>
        <TabPane tabId='3'>
          <p>
            Gingerbread cake cheesecake lollipop topping bonbon chocolate sesame snaps. Dessert macaroon bonbon carrot
            cake biscuit. Lollipop lemon drops cake gingerbread liquorice. Sweet gummies dragée. Donut bear claw pie
            halvah oat cake cotton candy sweet roll. Cotton candy sweet roll donut ice cream.
          </p>
          <p>
            Halvah bonbon topping halvah ice cream cake candy. Wafer gummi bears chocolate cake topping powder. Sweet
            marzipan cheesecake jelly-o powder wafer lemon drops lollipop cotton candy.
          </p>
        </TabPane>
      </TabContent>
    </Fragment>
    
  )
}

export default AnalyticsDashboard
