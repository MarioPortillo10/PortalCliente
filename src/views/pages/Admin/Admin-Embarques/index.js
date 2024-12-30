// ** React Imports
import { Fragment, useEffect, useState  } from 'react'
import { Col, Row, Label, Input, Button, Form, Table, Card, CardTitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap'
import { getUserData } from '@utils'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'
import { XCircle, CheckCircle, HelpCircle} from 'react-feather'
//import { types } from '@babel/core'
import SpinnerComp from '../../Utils/Spinner'

const AdmEmbarques = (props) => {
    const [productos, setProductos] = useState({tipo: "", name: "", cantidad: "", codigo:""})
    const [stopsData, setstopsData] = useState({tipo: "", name: "", cantidad: "", Observacion:"", horaIn:"", horaFin:"", fechaIn:"", fechaFin:"", otraCausa:""})
    const [Codigos, setCodigos] = useState([{name:"", code:''}])
    const [tipos, setTipo] = useState([])
    const [fecha, setFecha] = useState('')
    const [idBitacora, setidBitacora] = useState('')
    const [hora, setHora] = useState('')
    const [acumulado, setAcumulado] = useState('')
    const [rendimiento, setRendimiento] = useState('')
    const [faltante, setFaltante] = useState('')
    const [BitacoraActiva, setBitacoraActiva] = useState(null)
    const [TypesStop, setTypesStop] = useState([])
    const [Observacion, setObservacion] = useState([])

    const [ValueEmpresaSelect, setValueEmpresaSelect] = useState([])
    const [ValueEmpresa, setValueEmpresa] = useState([])
    const [modal, setmodal] = useState({ modal: false })
    const [modalAdd, setmodalAdd] = useState({ modal: false })
    const [modalBody, setmodalBody] = useState({ mensaje: "", titulo: "", type: 1, error: false})

    const [spinner, setspinner] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const [productosDetalle, setProductosDetalle] = useState([
    //     {
    //         fecha: "02/03/2023",
    //         hora:"5:20pm",
    //         acumulado: "5000",
    //         rendimiento:"500",
    //         faltante: "500"
    //     }
    // ])
    const [DetalleParos, setDetalleParos] = useState([
        {
            fecha: "02/03/2023",
            hora:"5:20pm",
            acumulado: "5000",
            rendimiento:"500",
            faltante: "500"
        }
    ])

    const [DetalleBitacora, setDetalleBitacora] = useState([])

    const user = getUserData()
    const token =  user.accessToken


    const GetBitracoraActiva = () => {
        setspinner(true)
        const BitacoraActiva = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Exports/ActiveBinnacle?shipId=${productos.codigo}&customerId=${ValueEmpresa}&productCategoryId=${productos.tipo}`,
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          BitacoraActiva.get('', {})
            .then(response => {
                if (response.data.data) {
                    setspinner(false)
                    console.log("response.data Barcos: ", response.data.data)
                    setBitacoraActiva(response.data.data)
                    setDetalleParos(response.data.data.stopCauses.stops)
                    setDetalleBitacora(response.data.data.binnacleDetails.movements)
                    setidBitacora(response.data.data.id)
                    console.log("Bitacora Creada")
                } else {
                    setspinner(false)
                    setBitacoraActiva(null)
                }

            })
      }

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    //     console.log("PRESIONA")
    //     const aux = productosDetalle
    //     aux.push(
    //         {
    //             fecha,
    //             hora,
    //             acumulado,
    //             rendimiento,
    //             faltante
    //         }
    //         )
    //     console.log("Aux: ", aux)
    //     setProductosDetalle(aux)
    //     console.log(fecha, hora, acumulado, rendimiento, faltante)
    //     console.log("Tabla: ", productosDetalle)
    //   }

      const handleSubmitStops = (event) => {
        event.preventDefault()
        setmodalAdd({ modal: !modalAdd.modal })
        const addStop = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Exports/AddStopCause',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          if (idBitacora, stopsData.fechaIn, stopsData.horaIn, stopsData.fechaFin, stopsData.horaFin, stopsData.Observacion) {
            setspinner(true)
            addStop.post('', {
                exportBinnacleId: idBitacora,
                startDate: stopsData.fechaIn,
                startHour: stopsData.horaIn,
                endDate: stopsData.fechaFin,
                endHour: stopsData.horaFin,
                exportStopCauseId: stopsData.Observacion,
                customStopCause: stopsData.otraCausa
            })
            .then(response => {
                setspinner(false)
                console.log("Creacion de registro Stops: ", response.data.data)
                GetBitracoraActiva()
                setmodalBody({ mensaje: "¡Registro insertado!", titulo: "", type: 2, error: false })
                setmodal({ modal: !modal.modal })
            })
          } else {
            setspinner(false)
            setmodalBody({ mensaje: "Todos los campos son obligatorios", titulo: "Detalle Paros", type: 1, error: true })
            setmodal({ modal: !modal.modal })
          }
      }

      const handleSubmitBitacora = (event) => {
        event.preventDefault()
        setmodalAdd({ modal: !modalAdd.modal })
        const addBitacora = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Exports/AddBinnacleDetail',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          if (idBitacora && fecha && hora && rendimiento) {
            setspinner(true)
            addBitacora.post('', {
                exportBinnacleId: idBitacora,
                date: fecha,
                hour: hora,
                quantity: rendimiento
            })
            .then(response => {
                console.log("Creacion de registro Bitacora: ", response.data)
                setspinner(false)
                GetBitracoraActiva()
                setmodalBody({ mensaje: "¡Registro insertado!", titulo: "", type: 2, error: false })
                setmodal({ modal: !modal.modal })
            })
          } else {
            setspinner(false)
            setmodalBody({ mensaje: "Todos los campos son obligatorios", titulo: "Detalle Barcos", type: 1, error: true })
            setmodal({ modal: !modal.modal })
            console.log("faltan campos")
          }
      }

      const handleIniciarReporte = (event) => {
        event.preventDefault()
        setmodalAdd({ modal: !modalAdd.modal })
        const Crearbitacora = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Exports/CreateBinnacle',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          if (productos.codigo && productos.tipo && productos.cantidad && ValueEmpresa) {
            setspinner(true)
            Crearbitacora.post('', {
                shipId: productos.codigo,
                itemCategoryId: productos.tipo,
                quantity: productos.cantidad,
                customerId: ValueEmpresa
              })
                .then(response => {
                    setspinner(false)
                    setBitacoraActiva(response.data.data)
                    setDetalleParos([])
                    setDetalleBitacora([])
                    //setidBitacora([])
                    setmodalBody({ mensaje: "¡Registro insertado!", titulo: "Crear Bitacora", type: 3, error: false })
                    setmodal({ modal: !modal.modal })
                })
          } else {
            setspinner(false)
            setmodalBody({ mensaje: "Todos los campos son obligatorios", titulo: "Crear Bitacora", type: 3, error: true })
            setmodal({ modal: !modal.modal })
          }

        
      }

      useEffect(() => {
            const nombreBarco = Codigos.filter(barco => barco.code === productos.codigo)
            if (nombreBarco.length > 0) {
                console.log("NOMBREBARCO: ", nombreBarco[0].name)
                setProductos({...productos, name: nombreBarco[0].name ? nombreBarco[0].name : ''})
            } else {
                setProductos({...productos, name: ''})
            }
            

            console.log("PRODUCTO: ", productos)
        }, [productos.codigo])

        const GetBarcos = axios.create({
            baseURL: `http://10.10.21.5:8080/api/Ships/Export/ActiveByCustomer?customerId=${ValueEmpresa}`,
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })

        const GetCategorias = axios.create({
          baseURL: 'http://10.10.21.5:8080/api/exports/ProductCategories',
          timeout: 0,
          headers: {Authorization: `Bearer ${token}`}
        })

        useEffect(() => {
            setspinner(true)
            GetBarcos.get('')
            .then(response => {
                setspinner(false)
                setCodigos(response.data.data)
            })

            GetCategorias.get('')
            .then(response => {
                
                console.log("response.data Barcos: ", response.data)
            })

            const categoria = {
                data: [
                    {
                        id: "3PL-011",
                        category: "AZÚCAR"
                    },
                    {
                        id: "3PL-012",
                        category: "MELAZA"
                    }
                ],
                header: {
                    code: 200,
                    message: null
                }
            }

            setTipo(categoria.data)
            
           
        }, [ValueEmpresa])


        // Formulario Paros
        useEffect(() => {
            setspinner(true)
            const tipos = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Exports/StopTypes',
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })

            tipos.get('')
              .then(response => {
                    setspinner(false)
                    setTypesStop(response.data.data)
              })

        }, [])

        useEffect(() => {
            setspinner(true)
            const causas = axios.create({
                baseURL: `http://10.10.21.5:8080/api/Exports/StopCauses?exportStopTypeId=${stopsData.tipo}`,
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })

            causas.get('')
              .then(response => {
                setspinner(false)
                setObservacion(response.data.data)
              })

         }, [stopsData.tipo])


        useEffect(() => {
            setspinner(true)
            const BitacoraActivaGet = axios.create({
                baseURL: `http://10.10.21.5:8080/api/Exports/ActiveBinnacle?shipId=${productos.codigo}&customerId=${ValueEmpresa}&productCategoryId=${productos.tipo}`,
                timeout: 0,
                headers: {Authorization: `Bearer ${token}`}
              })
              BitacoraActivaGet.get('', {})
                .then(response => {
                    console.log("RESPONSE ---: ", response)
                    if (response.data.data) {
                        setspinner(false)
                        setBitacoraActiva(response.data.data)
                        setDetalleParos(response.data.data.stopCauses.stops)
                        setDetalleBitacora(response.data.data.binnacleDetails.movements)
                        setidBitacora(response.data.data.id)
                        console.log("Bitacora Creada")
                    } else {
                        setspinner(false)
                        setBitacoraActiva(null)
                        setDetalleParos([])
                        setDetalleBitacora([])
                        //setidBitacora([])
                    }

                }).catch(error => {
                    setspinner(false)
                    console.log(error)
                    setBitacoraActiva(null)
                    setDetalleParos([])
                    setDetalleBitacora([])
                  })
         }, [productos.codigo, ValueEmpresa, productos.tipo])

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
                    setspinner(false)
                  dispatch(handleLogout())
                  navigate('/Login')
                  alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
                } 
        
              })
          }, []) 

      const toggle = (e) => {
        e.preventDefault()
        
        setmodal({ modal: !modal.modal })
        setmodalBody({ mensaje: "¿ Estas seguro que deseas agregar el registro ?", titulo: "Detalle Barcos", type: 1, error: false })
    }

    const toggleAdd = (e, tipo) => {
        e.preventDefault()

        
        setmodalAdd({ modal: !modalAdd.modal })
        setmodalBody({ mensaje: "¿ Estas seguro que deseas agregar el registro ?", titulo: tipo, type: tipo === "Detalle Paro" ? 1 : tipo === "Detalle Barco" ? 2 : 3, error: false })
    }

  return (
    <Fragment>
        <SpinnerComp message="Cargando..." estado={spinner}  />
        <div>
            <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
            <ModalHeader toggle={toggle}>{modalBody.titulo}</ModalHeader>
            <ModalBody style={{display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center"}}>
                {modalBody.error ? <XCircle width="30%" height="30%" color='red' style={{ marginTop: "15px" }} /> : <CheckCircle width="30%" height="30%" color='green' style={{ marginTop: "15px" }} />}
                {modalBody.mensaje}
            </ModalBody>
            <ModalFooter>
                {/* {
                    modalBody.type === 1 ? <> <Button color="primary"  onClick={(e) => handleSubmitBitacora(e)}>Si</Button>{' '}
                    <Button color="secondary" onClick={toggle}>No</Button></> :  null
                } */}
                <Button color="secondary" onClick={toggle}>Cerrar</Button>
            </ModalFooter>
            </Modal>

        </div>
        <div>
            <Modal isOpen={modalAdd.modal} toggle={toggleAdd} className={props.className}>
            <ModalHeader toggle={toggleAdd}>{modalBody.titulo}</ModalHeader>
            <ModalBody style={{display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center"}}>
                <HelpCircle width="30%" height="30%" color='#008aff' style={{ marginTop: "15px" }} />
                {modalBody.mensaje}
            </ModalBody>
            <ModalFooter>
                {
                    modalBody.type === 2 ? <Button color="primary"  onClick={(e) => handleSubmitBitacora(e)}>Si</Button> : modalBody.type === 1 ? <Button color="primary"  onClick={(e) => handleSubmitStops(e)}>Sii</Button> : <Button color="primary"  onClick={(e) => handleIniciarReporte(e)}>Siii</Button>
                }
                <Button color="secondary" onClick={toggleAdd}>No</Button>
                    {/* <Button color="primary"  onClick={(e) => handleSubmitStops(e)}>Si</Button>{' '}
                    <Button color="secondary" onClick={toggleAdd}>No</Button> */}

            </ModalFooter>
            </Modal>

        </div>
        <Card style={{background: "#cce5fd"}}>
            <CardBody>
                <CardTitle>Información Barco</CardTitle>
                <Form onSubmit={(e) => toggleAdd(e, "Crear Bitacora")}>

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
                    <Label for="tipos">Tipo de producto</Label>
                    <Input type='select' 
                        value={productos.tipo} 
                        onChange={(e) => setProductos({...productos, tipo: e.target.value })}
                        label='Controlled'
                        id='Tipos'
                    >
                    <option key={8} value="">seleccionar</option>
                        {tipos.map((cod, index) => <option key={index + 100} value={cod.id}>{cod.category}</option>)
                        }
                    </Input>

                    <Label htmlFor="name">Nombre Del Barco</Label>
                    <Input type="text" id="name" name="name" value={productos.name} disabled >

                    </Input>
                    {
                        BitacoraActiva ? <><Label htmlFor="name">Cantidad Restante</Label> <Input type="text" id="name" name="name" value={BitacoraActiva?.remainingQuantity} disabled /></> :  <> <Label htmlFor="acumulado">Cantidad:</Label> <Input type="number" id="acumulado" name="acumulado" value={productos.cantidad} onChange={(e) => setProductos({...productos, cantidad: e.target.value })} /> <Button color='primary' type="submit" style={{margin: "10px"}}>Iniciar reporte</Button> </> 
                    }
                    
                    {/* {!BitacoraActiva ? <> <Label htmlFor="acumulado">Cantidad:</Label> <Input type="number" id="acumulado" name="acumulado" value={productos.cantidad} onChange={(e) => setProductos({...productos, cantidad: e.target.value })} /> <Button color='primary' type="submit" style={{margin: "10px"}}>Iniciar reporte</Button> </> :  null
                    } */}


                </Form>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle>Detalle Barcos</CardTitle>
                <Form onSubmit={(e) => toggleAdd(e, "Detalle Barco")}>
                    <Label htmlFor="fecha">Fecha:</Label>
                    <Input type="date" id="fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />

                    <Label htmlFor="hora">Hora:</Label>
                    <Input type="time" id="hora" name="hora" value={hora} onChange={(e) => setHora(e.target.value)} />

                    <Label style={{display:"none"}} htmlFor="acumulado">Acumulado:</Label>
                    <Input style={{display:"none"}} type="number" id="acumulado" name="acumulado" value={acumulado} onChange={(e) => setAcumulado(e.target.value)} />

                    <Label htmlFor="rendimiento">Rendimiento:</Label>
                    <Input type="number" id="rendimiento" name="rendimiento" value={rendimiento} onChange={(e) => setRendimiento(e.target.value)} />

                    <Label style={{display:"none"}} htmlFor="faltante">Faltante:</Label>
                    <Input style={{display:"none"}} type="number" id="faltante" name="faltante" value={faltante} onChange={(e) => setFaltante(e.target.value)} />

                    <Button color='primary' type="submit" style={{margin: "10px"}}>Agregar</Button>
                </Form>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acumulado total.TM</th>
                        <th>Rendimiento por hora. TM/H</th>
                        <th>Faltante</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            DetalleBitacora.map((data, index) => <tr key={index}>
                                <td>{data.date}</td>
                                <td>{data.hour}</td>
                                <td>{data.cumulativeQuantity}</td>
                                <td>{data.hourlyPerformance}</td>
                                <td>{data.remainingQuantity}</td>
                            </tr>
                          )

                        }
                        
                    
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle>Información Paros</CardTitle>
                <Form onSubmit={(e) => toggleAdd(e, "Detalle Paro")}>
                    <Label for="tipo">Tipos de paro</Label>
                    <Input type="select" name="tipo" id="tipo"  value={stopsData.tipo} onChange={(e) => setstopsData({...stopsData, tipo: e.target.value })}>
                    <option key={8} value="">seleccionar</option>
                    {TypesStop.map((cod, index) => <option key={index + 100} value={cod.id} >{cod.description}</option>)
                    }
                    </Input>
                    <Label for="tipo">Observación</Label>
                    <Input type="select" name="tipo" id="tipo"  value={stopsData.Observacion} onChange={(e) => setstopsData({...stopsData, Observacion: e.target.value })}>
                    <option key={8} value="">seleccionar</option>
                    {Observacion.map((cod, index) => <option key={index + 100} value={cod.id} >{cod.description}</option>)
                    }
                    </Input>

                    {stopsData.Observacion === "40" || stopsData.Observacion === "24" || stopsData.Observacion === "50"  ? <><Label htmlFor="name">Otra causa</Label><Input type="text" id="name" name="name" value={stopsData.otraCausa} /> </> :  null
                    
                    }

                    <Label style={{display:"none"}} htmlFor="acumulado">Cantidad:</Label>
                    <Input style={{display:"none"}} type="number" id="acumulado" name="acumulado" value={stopsData.cantidad} onChange={(e) => setstopsData({...stopsData, cantidad: e.target.value })} />
                    
                    <Label htmlFor="horaIn">Hora de inicio:</Label>
                    <Input type="time" id="horaIn" name="horaIn" value={stopsData.horaIn} onChange={(e) => setstopsData({...stopsData, horaIn: e.target.value })} />

                    <Label htmlFor="HoraFin">Hora de Fin:</Label>
                    <Input type="time" id="HoraFin" name="HoraFin" value={stopsData.horaFin} onChange={(e) => setstopsData({...stopsData, horaFin: e.target.value })} />
                    
                    <Label htmlFor="fecha">Fecha inicio:</Label>
                    <Input type="date" id="fecha" name="fecha" value={stopsData.fechaIn} onChange={(e) => setstopsData({...stopsData, fechaIn: e.target.value })} />
                    
                    <Label htmlFor="fecha">Fecha Fin:</Label>
                    <Input type="date" id="fecha" name="fecha" value={stopsData.fechaFin} onChange={(e) => setstopsData({...stopsData, fechaFin: e.target.value })} />

                    <Label style={{display:"none"}} htmlFor="TiempoTotal">Tiempo acumulado Hr:min:</Label>
                    <Input style={{display:"none"}} type="number" id="TiempoTotal" name="TiempoTotal" value={rendimiento} onChange={(e) => setRendimiento(e.target.value)} />

                    <Button color='primary' type="submit" style={{margin: "10px"}}>Agregar</Button>
                </Form>
            </CardBody>
        </Card>
        <Card>
            <CardBody>
                <CardTitle>Detalle Paros</CardTitle>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Hora de inicio</th>
                        <th>Hora de fin</th>
                        <th>Tipo de paro</th>
                        <th>Observación</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        
                        {/* <th>Tiempo acumulado Hr:min</th> */}
                    </tr>
                    </thead>
                    <tbody>
                        {
                            DetalleParos.map((data, index) => <tr key={index}>
                                <td>{data.startHour}</td>
                                <td>{data.endHour}</td>
                                <td>{data.stopType}</td>
                                <td>{data.stopCause}</td>
                                <td>{data.startDate}</td>
                                <td>{data.endDate}</td>
                                
                                {/* <td>{data.endDate}</td> */}
                            </tr>
                          )

                        }
                        
                    
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        <Card style={{display:"none"}}>
            <CardBody>
                <CardTitle>
                    Enviar Informacion
                </CardTitle>
                <Button color='primary' type="submit" style={{margin: "10px"}}>Cerrar reporte</Button>
            </CardBody>
            
        </Card>
    </Fragment>
  )
}

export default AdmEmbarques
