// ** React Imports
import { Fragment, useState, useEffect } from 'react'

//import { Link, useNavigate } from 'react-router-dom'
import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'

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
import { Search } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import Timeline from '@components/timeline'
import AvatarGroup from '@components/avatar-group'
import Tabs from '@src/views/components/tabs'

// ** Utils
import { getUserData } from '@utils'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Reactstrap Imports
import { Row, Col, Card, 
        CardHeader, CardTitle, CardBody,
        TabContent, TabPane, 
        Nav, NavItem, NavLink, Input, Label, Button } from 'reactstrap'

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

// ** Images
//import jsonImg from '@src/assets/images/icons/json.png'
//import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const Embarques = () => {
  // ** Context
  //const { colors } = useContext(ThemeColors)

  // ** State
  const [active, setActive] = useState('1')

  //Actual
  const [valueIng, setValueIng] = useState('')
  const [valueCategoria, setValueCategoria] = useState('')
  //const [valueData, setValuedata] = useState({data:[1,  2, 3]})
  // [valueDataCategoria, setValuedataCategoria] = useState({data:['']})
  /*const [valueProductos, setValueProductos]  = useState({data:{
    totalProducts: 0,
    totalUnits: 0,
    totalTransactions: 0,
    transactions: {
      inPreCheck: 0,
      inProgress: 0,
      dispatched: 0
    }
  }})*/

  const [valueFechaInicial, setValueFechaInicial] = useState('')
  const [valueFechaFinal, setValueFechaFinal] = useState('')
  const [valueShipment, setValueShipment] = useState('')

  const [valueVista, setValueVista] = useState('Actual')
  const [valueTable, setValueTable] = useState([])
  const [valueTable8am, setValueTable8am] = useState([])
  const [valueTable1pm, setValueTable1pm] = useState([])
  const [valueTable5pm, setValueTable5pm] = useState([])
  const [valueTableHistorico, setValueTableHistorico] = useState([])

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
    setValueFechaFinal('')
    setValueFechaInicial('')
    setValueCategoria('')
    //setValuedata({data:['']})
    //setValuedataCategoria({data:['']})
    /*setValueProductos({data:{
      totalProducts: 0,
      totalUnits: 0,
      totalTransactions: 0,
      transactions: {
        inPreCheck: 0,
        inProgress: 0,
        dispatched: 0
      }
    }})*/
  }

  const basicColumns = [
    {
      name: 'ID',
      sortable: true,
      maxWidth: '100px',
      selector: row => row.productId
    },
    {
      name: 'Nombre del barco',
      sortable: true,
      minWidth: '225px',
      selector: row => row.shipName
    },
    {
      name: 'Pendiente de embarque',
      sortable: true,
      minWidth: '310px',
      selector: row => row.pendingAmountToShip
    },
    {
      name: 'Cantidad embarcado',
      sortable: true,
      minWidth: '250px',
      selector: row => row.amountShipped
    },
    {
      name: 'Flujo de la ultima hora',
      sortable: true,
      minWidth: '100px',
      selector: row => row.lastHourFlow
    },
    {
      name: 'Flujo promedio',
      sortable: true,
      minWidth: '175px',
      selector: row => row.averageFlow
    }
  ]

  const user = getUserData()
  
  const tokens =  user.accessToken

  const instanceHistorico = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Shipment/Historical',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
  })
  const handleChangeFecha = event => {
    
    if (event.target.id === "fechaInicial") {
        setValueFechaInicial(event.target.value)
    } else {
        setValueFechaFinal(event.target.value)
    }
    
  }

  const handleName = event => {
    setValueShipment(event.target.value)
  }

  const handleAddEventClick = () => {
    if (valueFechaFinal && valueFechaInicial) {
          
      /*setValueTableHistorico([
        {
        shipName: "MT. RUBY T",
        amountShipped: 1379.924,
        pendingAmountToShip: 0,
        lastHourFlow: 275.976,
        averageFlow: 197.132,
        shippingDate: "2023-03-01T18:41:22.309Z",
        factoryName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V. - MELAZA"}
        ])*/
      instanceHistorico.post('', {
        startDate: valueFechaInicial, //"2022-03-01T18:42:30.444Z",
        finalDate: valueFechaFinal, //"2023-03-01T18:42:30.444Z",
        shipName: valueShipment, //"MT. RUBY T",
        pageNumber: 1,
        pageSize: 25
      })
        .then(response => {
            if (response.data.data) {
              setValueTableHistorico(response.data.data)
            }
            
            //return response.data
            console.log("valueTableHistorico: ", response)
        })
        
    }
  }

  /*const handleChange = event => {
    if (event.target.id === "Ingenio") {
      setValueIng(event.target.value)
    } else {
      setValueCategoria(event.target.value)
    }
    
    
  }*/
  
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
  
  useEffect(() => {
      instance.get('')
      .then(response => {
          //setValuedata(response.data)
          console.log(response)
      })
  }, [valueIng])

  const instance2 = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Summary/Categories', //'http://10.10.21.5:8080/api/Summary/ProductCategories',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })
  useEffect(() => {
      
      if (valueIng !== '') {
        instance2.post('', {customerId: valueIng})
        .then(response => {
          //setValuedataCategoria(response.data)
            //return response.data
            console.log(response)
        })
      }
      
  }, [valueIng])

  const instance3 = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Summary/Products',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })

  const instance4 = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Summary/Historical',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })
  useEffect(() => {
      
      if (valueIng !== '', valueCategoria !== '') {
        
        //const dateinit = valueVista === 'Actual' ? "2022-01-09T18:41:07.119Z" : valueFechaInicial
        //const dateend = valueVista === 'Actual' ? "2023-02-09T18:41:07.119Z" : valueFechaFinal
        if (valueVista === 'Actual') {
          instance3.post('', {
            //startDate: "2022-01-09T18:41:07.119Z",
            //finalDate: "2023-02-09T18:41:07.119Z",
            customerId: valueIng,
            productCategoryId: valueCategoria
          })
          .then(response => {
            
            /*setValueProductos({data:{
              totalProducts: response.data.data.totalProducts,
              totalUnits: response.data.data.totalUnits,
              totalTransactions: 4000,
              transactions: response.data.data.transactions /*{
                inPreCheck: 100,
                inProgress: 200,
                dispatched: 300
              }
            }})*/
              //return response.data
              console.log(response)
          })
        } else if (valueFechaFinal !== '' && valueFechaInicial !== '') {
          instance4.post('', {
            startDate: valueFechaInicial,
            finalDate: valueFechaFinal,
            customerId: valueIng,
            productCategoryId: valueCategoria
          })
          .then(response => {
            
            setValueProductos({data:{
              totalProducts: response.data.data.totalProducts,
              totalUnits: response.data.data.totalUnits,
              totalTransactions: 4000
              /*transactions: {
                inPreCheck: 100,
                inProgress: 200,
                dispatched: 300
              }*/
            }})
              //return response.data
              console.log(response)
          })
        }
        
      }
      
  }, [valueIng, valueCategoria, valueFechaFinal, valueFechaInicial])

  const toggle = tab => {
    handleClick(tab)
    if (active !== tab) {
      setActive(tab)
    }
    

  }

  const instanceActual = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Shipment/Active',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })
  useEffect(() => {
    instanceActual.get('')
      .then(response => {
        console.log("Datas: ", response.data)
        setValueTable(response.data.data)
      })
      /*setValueTable([
        {
        shipName: "MT. RUBY T",
        amountShipped: 1379.924,
        pendingAmountToShip: 0,
        lastHourFlow: 275.976,
        averageFlow: 197.132,
        shippingDate: "2023-03-01T18:41:22.309Z",
        factoryName: "INGENIO CHAPARRASTIQUE, S.A. DE C.V. - MELAZA"}
        ])*/

      }, [])

      useEffect(() => {
        if (valueTable) {
            const result8 = valueTable.filter(item => new Date(item.shippingDate).getHours() <= 8 &&  new Date(item.shippingDate).getHours() > 17)
            const result1 = valueTable.filter(item => new Date(item.shippingDate).getHours() > 8 &&  new Date(item.shippingDate).getHours() <= 13)
            const result5 = valueTable.filter(item => new Date(item.shippingDate).getHours() > 13 &&  new Date(item.shippingDate).getHours() <= 17)
            setValueTable8am(result8)
            setValueTable1pm(result1)
            setValueTable5pm(result5)
        }
            
          }, [valueTable])

  return (
    <Fragment>
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
      </Nav>
      <TabContent className='py-50' activeTab={active}>
        <TabPane tabId='1'>
        <div id='dashboard-analytics'>
            <Row className='match-height'>
              <Col lg='12' sm='12'>
                <TableZeroConfig columns={basicColumns} contenido={valueTable8am} title={"8 AM"} />
              </Col>
              <Col lg='12' sm='12'>
                <TableZeroConfig columns={basicColumns} contenido={valueTable1pm} title={"1 AM"}/>
              </Col>
              <Col lg='12' sm='12'>
                <TableZeroConfig columns={basicColumns} contenido={valueTable5pm} title={"5 AM"}/>
              </Col>
            </Row>
        </div>
        </TabPane>
        <TabPane tabId='2'>
        <div id='dashboard-analytics'>
            <Row className='match-height' style={{marginBottom: "20px"}}> 
              {/*<Col lg='4' sm='4'>
                <Label for="exampleDatetime">Ingenio</Label>
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
                <Label for="exampleDatetime">Categoria</Label>
                <Input type='select' value={valueCategoria}
                  label='Controlled'
                  id='Categoria'
                  onChange={handleChange}
                  >
                  <option key={1} value='home'>seleccionar</option>
                  {valueDataCategoria.data.map((ing, index) => <option key={index + 1} value={ing.id}>{ing.category}</option>)
                  }
                  
                </Input>
              </Col>*/}
              <Col lg='12' sm='12'>
                <Row>
                  <Col lg='3' sm='3'>
                    <Label for="exampleDatetime">Inicio</Label>
                    <Input onChange={handleChangeFecha} 
                    value={valueFechaInicial} 
                    type="date" 
                    name="date" 
                    id="fechaInicial" 
                    placeholder="datetime placeholder" 
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}/>
                  </Col>
                  <Col lg='3' sm='3'>
                    <Label for="exampleDatetime">Final</Label>
                    <Input  onChange={handleChangeFecha} 
                    value={valueFechaFinal} 
                    type="date" 
                    name="date" 
                    id="fechaFinal" 
                    placeholder="datetime placeholder"
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()} />
                  </Col>
                  <Col lg='3' sm='3'>
                    <Label for="exampleDatetime">Nombre</Label>
                    <Input  onChange={handleName} value={valueShipment} type="text" name="ship" id="ship" placeholder="Nombre" />
                  </Col>
                  <Col lg='3' sm='3'>
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
            <Row className='match-height'>
              <Col lg='12' sm='12'>
                <TableZeroConfig columns={basicColumns} contenido={valueTableHistorico} />
              </Col>
              
            </Row>
        </div>
        </TabPane>
      </TabContent>
    </Fragment>
    
  )
}

export default Embarques
