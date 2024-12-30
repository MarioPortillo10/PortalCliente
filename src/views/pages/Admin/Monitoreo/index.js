// ** React Imports
import { Fragment, useEffect, useState, useContext } from 'react'
import { kFormatter, getUserData } from '@utils'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap'
// ** Third Party Components

import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'

// Grafica Horas
import OrdersReceived from '@src/views/ui-elements/cards/statistics/OrdersReceived'

import { ThemeColors } from '@src/utility/context/ThemeColors'
import { Eye, Search } from 'react-feather'

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

const Monitoreo = (props) => {

  const [valueIng, setValueIng] = useState('')
  //const [valueFiles, setValueFiles] = useState([])
  const [valueRemolque, setValueRemolque] = useState('')
  const [valueDateIn, setValueDateIn] = useState(null)
  const [valueDateFin, setValueDateFin] = useState(null)
  const user = getUserData()
  const [valueError, setValueError] = useState({ producto: false, fechaIn: false, fechaFin: false, Remolque: false })
  const [valueRegisters, setValueRegisters] = useState([
    {
      username: "AD1Harold",
      loginDate: "2023-03-24T01:44:58.107",
      logoutDate: "2023-03-24T12:11:19.18",
      activities: [
        {
          activity: "Consulta de usuarios del portal",
          date: "2023-03-24T01:44:58.107"
        }
      ]
    }
  ])

  const [dataDetail, setdataDetail] = useState({ activity: "", date: "" })
  const [dataActividad, setActividad] = useState({ client: null, description: "", user: null })
  const [userDetail, setuserDetail] = useState('')

  const { colors } = useContext(ThemeColors)
  const [Empresas, setEmpresas] = useState([])
  const [ValueUsers, setValueUsers] = useState([])
  const [modalCreate, setmodalCreate] = useState({ modal: false })
  const [valueHoras, setvalueHoras] = useState(0.000)
  const [valueHorasEmpresas, setvalueHorasEmpresas] = useState({listaEmpresas: [""], horasEmpresas:[""]})

  const [spinner, setspinner] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = user.accessToken

  // Detalle Actividades
  const toggle = (e, actividades, name) => {
    e.preventDefault()
    setdataDetail(actividades)
    setuserDetail(name)
    console.log(actividades)
    setmodalCreate({ modal: !modalCreate.modal })
  }

  const handleChange = event => {

    if (event.target.id === "Client") {
      setActividad({ ...dataActividad, client: event.target.value })
    }
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

  const sessions = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Monitoring/UserSessions',
    timeout: 0,
    headers: { Authorization: `Bearer ${token}` }
  })

  const handleAddEventClick = () => {
    setspinner(true)
    sessions.post('', {
      customerId: dataActividad.client,
      startDate: valueDateIn,
      endDate: valueDateFin,
      username: dataActividad.user
  })
      .then(response => {
        setspinner(false)
        console.log("Response: ", response)
        setValueFiles(response.data.data)
      })
  }

  const basicColumns = [
    {
      name: 'Usuario',
      sortable: true,
      minWidth: '225px',
      selector: row => row.username
    },
    {
      name: 'Fecha inicio sesion',
      sortable: true,
      minWidth: '310px',
      selector: row => row.loginDate
    },
    {
      name: 'Fecha finalizacion sesion',
      sortable: true,
      minWidth: '250px',
      selector: row => row.logoutDate
    },
    {
      name: 'Actividades',
      cell: (row) => <Button color='primary' size="sm" onClick={(e) => toggle(e, row.activities, row.username)} id={row.number}><Eye /></Button>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: '250px'
    }

  ]

  //Detalle de actividades 
  const basicColumnsDetails = [
    {
      name: 'Actividad',
      sortable: true,
      minWidth: '200px',
      selector: row => row.activity
    },
    {
      name: 'Fecha',
      sortable: true,
      minWidth: '200px',
      selector: row => row.date
    }

  ]


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  )
  // const labels = ['Enero', 'Febrero', 'Marzo', 'Abril']
  // const data = {
  //   labels,
  //   datasets: [

  //     {
  //       label: "Enero",
  //       data: [0, 0, 0],
  //       backgroundColor: '#F4D03F'
  //     },
  //     {
  //       label: "Febrero",
  //       data: [0, 6, 0],
  //       backgroundColor: '#F5B041'
  //     },
  //     {
  //       label: "Marzo",
  //       data: [0, 0,  5],
  //       backgroundColor: '#EB984E'
  //     },
  //     {
  //       label: "Abril",
  //       data: [0, 0, 0],
  //       backgroundColor: '#EB984E'
  //     }
  //   ]
  // }

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Uso de la app'
      }
    }
  }

  const dataPie = {
    labels: valueHorasEmpresas.listaEmpresas, //['Empresa 1', 'Empresa 2', 'Empresa 3', 'Empresa 4', 'Empresa 5', 'Empresa 6'],
    datasets: [
      {
        label: '# of Votes',
        data: valueHorasEmpresas.horasEmpresas, //[12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  //Get Empresas
  const empresas = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=3',
    timeout: 0,
    headers: { Authorization: `Bearer ${token}` }
  })


  // Get actividades de usuario
  useEffect(() => {
    setspinner(true)
    empresas.get('')
      .then(response => {
        setspinner(false)
        setEmpresas(response.data.data)
      }).catch(error => {

        if (error.response.status === 401) {
          setspinner(false)
          dispatch(handleLogout())
          navigate('/Login')
          alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
        } 

      })
  }, [])

  useEffect(() => {
    setspinner(true)
    sessions.post('', {
      customerId: dataActividad.client,
      startDate: valueDateIn,
      endDate: valueDateIn,
      username: dataActividad.user,
      pageNumber: 1,
      pageSize: 20
    })
      .then(response => {
        setspinner(false)
        setValueRegisters(response.data.data)
      })
  }, [dataActividad])

  useEffect(() => {
    setspinner(true)
    sessions.post('', {
      customerId: dataActividad.client,
      startDate: valueDateIn,
      endDate: valueDateIn,
      username: dataActividad.user,
      pageNumber: 1,
      pageSize: 20
    })
      .then(response => {
        console.log("response.data** Sesiones: ", response.data)
        setspinner(false)
        setValueRegisters(response.data.data)
      })
  }, [])

  const GetUserSelect = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Users/All',
    timeout: 0,
    headers: { Authorization: `Bearer ${token}` }
  })

  useEffect(() => {
    console.log("dataActividad.client ----> ", dataActividad.client)
    GetUserSelect.post('', {
      customerId: dataActividad.client !== '' ? dataActividad.client : null
    })
      .then(response => {
        setValueUsers(response.data.data)

      })
  }, [dataActividad.client])

  useEffect(() => {
    GetUserSelect.post('', {
      customerId: dataActividad.client !== 'seleccionar' ? dataActividad.client : null
    })
      .then(response => {
        setValueUsers(response.data.data)

      })
  }, [])


  const GetGraficaHoras = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Monitoring/TotalUseHours',
    timeout: 0,
    headers: { Authorization: `Bearer ${token}` }
  })

  const GetGraficaEmpresas = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Monitoring/UseHoursByCustomer',
    timeout: 0,
    headers: { Authorization: `Bearer ${token}` }
  })

  useEffect(() => {
    GetGraficaHoras.post('', {
      customerId: dataActividad.client !== 'seleccionar' ? dataActividad.client : null,
      startDate: null,
      endDate: null,
      username: null,
      pageNumber: 1,
      pageSize: 20
    })
      .then(response => {
        console.log("GRAFICA HORAS: ", response.data)
        setvalueHoras(response.data.data)
        //setValueUsers(response.data.data)

      })

      GetGraficaEmpresas.post('', {
        customerId: dataActividad.client !== 'seleccionar' ? dataActividad.client : null,
        startDate: null,
        endDate: null,
        username: null,
        pageNumber: 1,
        pageSize: 20
      })
        .then(response => {
          console.log("GRAFICA EMPRESA TORTA: ", response.data)
          const listEmpresas = []
          const listEmpresasHoras = []
          response.data.data.map(function(x) {
            listEmpresas.push(x.customerName)
            listEmpresasHoras.push(x.useHours)
         })
          setvalueHorasEmpresas({listaEmpresas: listEmpresas, horasEmpresas: listEmpresasHoras})
  
        })
  }, [])

  useEffect(() => {

    console.log("DATA GRAFICA: ", valueHorasEmpresas)
  }, [valueHorasEmpresas])
  useEffect(() => {
    GetGraficaHoras.post('', {
      customerId: dataActividad.client !== 'seleccionar' ? dataActividad.client : null,
      startDate: valueDateIn,
      endDate: valueDateFin,
      username: dataActividad.user !== 'seleccionar' ? dataActividad.user : null,
      pageNumber: 1,
      pageSize: 20
    })
      .then(response => {
        console.log("GRAFICA HORAS: ", response.data)
        setvalueHoras(response.data.data)
        //setValueUsers(response.data.data)

      })

      GetGraficaEmpresas.post('', {
        customerId: dataActividad.client !== 'seleccionar' ? dataActividad.client : null,
        startDate: valueDateIn,
        endDate: valueDateFin,
        username: dataActividad.user !== 'seleccionar' ? dataActividad.user : null,
        pageNumber: 1,
        pageSize: 20
      })
        .then(response => {
          console.log("GRAFICA EMPRESA TORTA: ", response.data)
          const listEmpresas = []
          const listEmpresasHoras = []
          response.data.data.map(function(x) {
            listEmpresas.push(x.customerName)
            listEmpresasHoras.push(x.useHours)
         })
          setvalueHorasEmpresas({listaEmpresas: listEmpresas, horasEmpresas: listEmpresasHoras})
  
        })
  }, [dataActividad, valueDateIn, valueDateFin])


  return (
    <Fragment>
      <SpinnerComp message="Cargando..." estado={spinner}  />
      {/* Modal Detalle Actividades */}
      <div>
        <Modal size='lg' isOpen={modalCreate.modal} toggle={toggle} className={props.className}>
          <ModalHeader toggle={toggle}>Usuario: <span style={{fontWeight:"bold"}}>{userDetail}</span></ModalHeader>
          <ModalBody>
            {
                      dataDetail?.length > 0 ? <TableZeroConfig columns={basicColumnsDetails} contenido={dataDetail} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
            }
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </div>
      <Card style={{background: "#cce5fd"}}>
        <CardBody>
          <CardTitle>Monitoreo</CardTitle>
          <Row className='match-height' style={{ marginBottom: "20px" }}>
            <Col lg='2' sm='6'>
              <Label for='country' className='form-label'>
                Cliente
              </Label>
              <Input type='select' value={dataActividad.client}
                label='Controlled'
                id='Client'
                onChange={handleChange}
                //invalid={!dataActividad.client ? true : null}
              >
                <option key={8} value={null}>seleccionar</option>
                {Empresas.map((emp, index) => <option key={index + 100} value={emp.id}>{emp.name}</option>)
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
                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}
                value={valueDateIn}
                //invalid={!valueDateIn ? true : null}//{errors.loginEmail && true
              />
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
                //invalid={!valueDateFin ? true : null}
                min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}//2023-02-22
              />

            </Col>
            <Col lg='4' sm='6'>
              <Row className='match-height'>

                <Col lg='6' sm='6' style={{ justifyContent: "flex-end" }}>
                  <Button
                    style={{marginTop:"15px", display:"none"}}
                    size='sm'
                    color='primary'
                    onClick={() => handleAddEventClick()}
                  ><Search/></Button>
                </Col>
              </Row>
            </Col>
          </Row>

        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Row>
            {/* <Col lg='6' sm='6' md='6'>
                    <Bar options={options} data={data} />
                </Col> */}
            <Col lg='6' sm='6' md='6' style={{display:"flex", alignItems: "center", justifyContent: "center"}}>
              <div>
                <h3>Horas de uso</h3>
                <OrdersReceived kFormatter={kFormatter} warning={colors.warning.main} total={valueHoras.toFixed(2)} title="Horas" />
              </div>

            </Col>
            <Col lg='6' sm='6' md='6'>
              <Pie options={options} data={dataPie} />
            </Col>

          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <CardTitle>
            Actividad
          </CardTitle>
          <div className='mb-2'>
            <Label for='country' className='form-label'>
              Usuarios
            </Label>
            <Input type='select' value={dataActividad.user}
              label='Controlled'
              id='Client'
              onChange={(e) => setActividad({ ...dataActividad, user: e.target.value })}
              //invalid={!dataActividad.user ? true : null}
            >
              <option key={8} value="">seleccionar</option>
              {ValueUsers.map((emp, index) => <option key={index + 100} value={emp.username}>{emp.name}</option>)
              }
            </Input>

          </div>
          {
                    valueRegisters?.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueRegisters} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
          }
          
        </CardBody>
      </Card>

    </Fragment>
  )
}

export default Monitoreo
