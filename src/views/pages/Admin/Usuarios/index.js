// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button,
    Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form
} from 'reactstrap'

import { Edit, UserPlus, UserX, Search } from 'react-feather'

import SpinnerComp from '../../Utils/Spinner'
// ** Third Party Components

import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import InputPasswordToggle from '@components/input-password-toggle'
import Select from 'react-select'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'


const Usuarios = (props) => {

    const user = getUserData()
    const [valueError, setValueError] = useState({ producto: false, fechaIn: false, fechaFin: false, Remolque: false })
    const [ValueUsers, setValueUsers] = useState([])
    const [modal, setmodal] = useState({ modal: false })
    const [modalDelete, setmodalDelete] = useState({ modal: false })
    const [UpdateUser, setUpdateUser] = useState({ username:"", roleId: "", temporalPassword: null, trackingCustomers: [] })
    const [ValueRoles, setValueRoles] = useState([])
    const [spinner, setspinner] = useState(false)
    
    const [createUser, setCreateUser] = useState({ roleId: "", temporalPassword: null, contactId:"",  trackingCustomers: [] })
    const [modalCreate, setmodalCreate] = useState({ modal: false })
    const [ValueEmpresa, setValueEmpresa] = useState([])
    const [ValueEmpresaInput, setValueEmpresaInput] = useState()
    const [ValueNameInput, setValueValueNameInput] = useState()
    const [ValueRolesInput, setValueValueRolesInput] = useState()
    const [ValueEmail, setValueEmail] = useState("")
    const [mensajeAlerta, setmensajeAlerta] = useState("")
    const [modalAlert, setmodalAlert] = useState({ modal: false })
    

    //Crear usuario
    const [ValueEmpresaInputModal, setValueEmpresaInputModal] = useState("")
    const [ValueContratoSelect, setValueContratoSelect] = useState([])
    const [ValueEmpresasMultiple, setEmpresasMultiple] = useState([
        {
            value: 'Maiz 1', 
            label: 'Maiz 1'
        },
        {
            value: 'Maiz 2', 
            label: 'Maiz 2'
        },
        {
            value: 'Maiz 3', 
            label: 'Maiz 3'
        }
    ])

    //Desactivar usuario
    const [userDelete, setuserDelete] = useState({name: '', username:''})

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = user.accessToken

    // const instanceUsers = axios.create({
    //     baseURL: 'http://10.10.21.5:8080/api/Users/All',
    //     timeout: 0,
    //     headers: { Authorization: `Bearer ${token}` }
    // })

    const handleChange = event => {

        if (event.target.id === "Empresa") {
            setValueEmpresaInput(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, producto: true })
            } else {
                setValueError({ ...valueError, producto: false })
            }
        }

        if (event.target.id === "Nombre") {
            setValueValueNameInput(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, Remolque: true })
            } else {
                setValueError({ ...valueError, Remolque: false })
            }
        }

        if (event.target.id === "Rol") {
            if (event.target.value === "seleccionar") {
                setValueValueRolesInput(null)
            } else {
                setValueValueRolesInput(event.target.value)
                console.log("ROL: ", ValueRolesInput)
            }

            if (!event.target.value) {
                setValueError({ ...valueError, fechaIn: true })
            } else {
                setValueError({ ...valueError, fechaIn: false })
            }
        }

        if (event.target.id === "RolModal") {
            
            setCreateUser({...createUser, roleId: event.target.value})
        }

        if (event.target.id === "EmpresaModal") {
            console.log("EmpresaModal", ValueEmpresaInputModal)
            setValueEmpresaInputModal(event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, fechaFin: true })
            } else {
                setValueError({ ...valueError, fechaFin: false })
            }
        }

        if (event.target.id === "Contratos") {
            setCreateUser({...createUser, contactId: event.target.value})
        }

        if (event.target.id === "temporalPassword") {
            setCreateUser({...createUser, temporalPassword: event.target.value})
            console.log("PASSWORD: ", event.target.value)
            if (!event.target.value) {
                setValueError({ ...valueError, fechaFin: true })
            } else {
                setValueError({ ...valueError, fechaFin: false })
            }
        }

        //Edit

        if (event.target.id === "RolEdit") {
            setUpdateUser({...UpdateUser, roleId: event.target.value})
        }

        if (event.target.id === "temporalPasswordEdit") {
            setUpdateUser({...UpdateUser, temporalPassword: event.target.value})
        }


    }

    const Transacciones = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Arrivals/Transactions',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })


    const ValidateError = () => {
        console.log("****************************: ", ValueEmpresaInput)
        const campos = { producto: false, fechaIn: false, fechaFin: false, Remolque: false }
        if (!ValueEmpresaInput) {
            campos.product = true
            setValueError(campos)
            console.log("****************************: ", ValueEmpresaInput)
            //return false
        } else {
            setValueError({ ...valueError, producto: false })
        }

        if (!valueRemolque) {
            campos.Remolque = true
            setValueError(campos)
            console.log("****************************: ", ValueEmpresaInput)
            //return false
        } else {
            setValueError({ ...valueError, Remolque: false })
        }

        if (!valueDateIn) {
            setValueError({ ...valueError, fechaIn: true })
            console.log("****************************: ", ValueEmpresaInput)
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
        baseURL: 'http://10.10.21.5:8080/api/File/GetDocument',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    // useEffect(() => {

    //     instanceUsers.get('')
    //         .then(response => {
    //             console.log("Response: ", response)
    //             console.log(valueFiles)
    //         })
    // }, []) 

    const instance3 = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Users/All',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    useEffect(() => {
        setspinner(true)
        instance3.post('', {})
            .then(response => {
                console.log("response.data******: ", response.data)
                setspinner(false)
                setValueUsers(response.data.data)
                //return response.data
            })
    }, [])

    const handleAddEventClick = () => {
        setspinner(true)
        instance3.post('', {
            name: ValueNameInput ? ValueNameInput : null,
            customerId: ValueEmpresaInput ? ValueEmpresaInput : null,
            roleId: ValueRolesInput ? ValueRolesInput : null
        })
            .then(response => {
                setspinner(false)
                setValueUsers(response.data.data)
            })
    }


    //Actualizar Usuario 

    const GetEditUser = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Users/All',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    const toggle = (e, rol, name) => {
        e.preventDefault()
        if (!modal.modal) {
            setspinner(true)
            GetEditUser.post('', {
                name,
                roleId: rol,
                customerId: null
    
            })
            .then(response => {
                setspinner(false)
                const aux = response.data.data[0]
                setUpdateUser({ username: aux.username, roleId: aux.roleId, temporalPassword: null, trackingCustomers: [] })
            })
        }
        
        const template = UpdateUser
        template.name = name
        template.rol = rol
        //setUpdateUser(template)
        setmodal({ modal: !modal.modal })
    }

    //Deshabilitar Usuario
    const toggleDelete = (e, nameUser, idUser) => {
        e.preventDefault()

        setuserDelete({name: nameUser, username: idUser})
        setmodalDelete({ modal: !modalDelete.modal })
    }

    //Alerta para creacion y edicion de usuarios
    const toggleAlert = (tipo) => {
        if (tipo) {
            setmensajeAlerta(tipo)
        }

        setmodalAlert({ modal: !modalAlert.modal })
    }

    //Crear Usuario
    const toggleCrear = (e) => {
        e.preventDefault()
        
        setmodalCreate({ modal: !modalCreate.modal })
    }

    const basicColumns = [

        {
            name: 'Nombre',
            sortable: true,
            minWidth: '225px',
            selector: row => row.username
        },
        {
            name: 'Empresa',
            sortable: true,
            minWidth: '310px',
            selector: row => row.customerName
        },
        {
            name: 'Rol',
            sortable: true,
            minWidth: '150px',
            selector: row => row.role
        },
        {
            name: 'Acciones',
            cell: (row) => [<Button color="primary" size="sm" onClick={(e) => toggle(e, row.roleId, row.username)} id={row.productId}><Edit /></Button>, <Button style={{ margin: "10px" }} color="danger" size="sm" onClick={(e) => toggleDelete(e, row.username, row.id)} id={row.productId + 1 }><UserX /></Button>],
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '250px'
        }
    ]

    // Crear Usuarios
    const CreateUser = (e) => {
        console.log("Data a enviar: ", createUser, " ROLES: ", ValueRolesInput)
        e.preventDefault()
        if (createUser.contactId && createUser.roleId && createUser.temporalPassword) {
            const create = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Users/Create',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })
            setspinner(true)
            create.post('', {
                contactId: createUser.contactId,
                roleId: createUser.roleId,
                temporalPassword: createUser.temporalPassword,
                trackingCustomers: createUser.trackingCustomers
              })
            .then(response => {
                setspinner(true)
                if (!response.data.data) {
                    console.log("ERROR!!!")
                    toggleAlert("Error al crear usuario")
                } else {
                    instance3.post('', {})
                    .then(response => {

                        setValueUsers(response.data.data)

                    })
                    setmodalCreate({ modal: !modalCreate.modal })
                    toggleAlert("El usuario fue creado exitosamente")
                    
                }
                
            }, error => {
                
                console.error('Función de rechazo llamada: ', error)
                toggleAlert("Error al crear usuario")
            })
            setCreateUser({ contactId:"", roleId: "", temporalPassword: null,  trackingCustomers: [] })
        }
    }

    // Actualizar Usuarios
    const UpdateUserFunc = (e) => {
        console.log("Data a enviar: ", UpdateUser)
        e.preventDefault()
        setspinner(true)
            const Edit = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Users/Edit',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })

            Edit.post('', UpdateUser)
            .then(response => {
                setspinner(false)
                console.log("USUARIO EDITADO: ", response.data)
                instance3.post('', {})
                .then(response => {
                    setValueUsers(response.data.data)
                    toggleAlert("El usuario fue editado exitosamente")
                    
                //return response.data
                })
                setmodal({ modal: !modal.modal })
                
                
            }, error => {
                
                console.error('Función de rechazo llamada: ', error)
            })
            //setCreateUser({ contactId:"", roleId: "", temporalPassword: "",  trackingCustomers: [] })
        
    }

    //Get Roles

    const roles = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Roles/All',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    //Get Empresas
    const empresas = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=3',
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    //Add Roles 

    useEffect(() => {
        roles.get('')
            .then(response => {
                console.log("response.data******: ", response.data)
                setValueRoles(response.data.data)
                //return response.data
            })

        empresas.get('')
        .then(response => {
            console.log("response.data** Empresas: ", response.data)
            setValueEmpresa(response.data.data)
            setEmpresasMultiple(response.data.data)
        }).catch(error => {

            if (error.response.status === 401) {
              
              dispatch(handleLogout())
              navigate('/Login')
              alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
            } 
    
          })
    }, [])


    // Disabled User

    const DisabledUser = (e) => {
        e.preventDefault()
        setspinner(true)

            const Disable = axios.create({
                baseURL: 'http://10.10.21.5:8080/api/Users/Disable',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })

            Disable.post('', {username: userDelete.name})
            .then(response => {
                console.log("USUARIO Eliminado: ", response.data)
                setspinner(true)
                instance3.post('', {})
                .then(response => {
                    setValueUsers(response.data.data)
                })
                setmodalDelete({ modal: !modalDelete.modal })
            })
            setmodalDelete({ modal: !modalDelete.modal })
        
    }

    const Contactos = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Contacts', //007001-001
        timeout: 0,
        headers: { Authorization: `Bearer ${token}` }
    })

    //Contratos

    useEffect(() => {
        setspinner(true)
        Contactos.get(`ByCustomer?customerId=${ValueEmpresaInputModal}`)
            .then(response => {
                setspinner(false)
                setValueContratoSelect(response.data.data)
            })

        console.log("ValueEmpresaInputModal: ", ValueEmpresaInputModal)

    }, [ValueEmpresaInputModal])


    const handleEmpresasMultiple = e => {
        const trackingCustomersaux = []
        const aux = e.map(function(p) {
            trackingCustomersaux.push(p.value)
            return p
        })

        console.log("E: ", aux)
        console.log("trackingCustomers: ", trackingCustomersaux)
        setCreateUser({...createUser, trackingCustomers: trackingCustomersaux})
        setUpdateUser({...UpdateUser, trackingCustomers: trackingCustomersaux})
    }

    useEffect(() => {
        const Email = ValueContratoSelect.filter(email => email.id === createUser.contactId)
        console.log("EMAIL----: ", Email)
        console.log("ValueContratoSelect----: ", ValueContratoSelect)
        if (Email.length > 0) {
            setValueEmail(Email[0].email)
        } else {
            setValueEmail('')
        }
    }, [createUser.contactId])

    useEffect(() => {
        console.log("UpdateUser.roleId: ", UpdateUser.roleId, "2")
    }, [UpdateUser.roleId])
    return (
        <Fragment>

            {/* Modal para alertas de usuario */}
            <Modal isOpen={modalAlert.modal} toggle={toggleAlert} className={props.className}>
                <ModalBody>
                   {mensajeAlerta}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => setmodalAlert({ modal: !modalAlert.modal })}>Cerrar</Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Deshabilitar usuario */}
            <div>
                <Modal isOpen={modalDelete.modal} toggle={toggleDelete} className={props.className}>
                <ModalHeader toggle={toggleDelete}>Deshabiltar Usuario</ModalHeader>
                <ModalBody>
                    ¿ Estas seguro que deseas Deshabiltar el usuario {userDelete.name} ?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"  onClick={(e) => DisabledUser(e)}>Si</Button>{' '}
                    <Button color="secondary" onClick={toggleDelete}>No</Button>
                </ModalFooter>
                </Modal>
            </div>

            {/* Modal para actualizar usuario */}
            <div>
                <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Editar Usuario</ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Rol
                                </Label>
                                <Input type='select' value={UpdateUser.roleId}
                                    label='Controlled'
                                    id='RolEdit'
                                    onChange={handleChange}
                                    invalid={!UpdateUser.roleId ? true : null}
                                >
                                    <option key={8} value="">seleccionar</option>
                                    {ValueRoles.map((rol, index) => <option key={index + 100} value={rol.id}>{rol.name}</option>)
                                    }

                                </Input>
                            </div>

                            {
                                UpdateUser.roleId === 2 || UpdateUser.roleId === 4 ? <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Permisos
                                </Label>
                                <Select
                                    onChange={(e) => handleEmpresasMultiple(e)}
                                    isMulti
                                    name="colors"
                                    options={ValueEmpresasMultiple.map(sub => ({ label: sub.name, value: sub.id}))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    
                                />
                            </div> : null

                            }

                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Contraseña Temporal
                                </Label>
                                <InputPasswordToggle className='input-group-merge' id="temporalPasswordEdit" value={UpdateUser.temporalPassword} onChange={handleChange} /*invalid={errors.password && true} {...field}*/ />
                            </div>
                            
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => UpdateUserFunc(e)}>Cerrar</Button>
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

            {/* Modal Crear Usuario */}
            <div>
                <Modal isOpen={modalCreate.modal} toggle={toggleCrear} className={props.className}>
                    <ModalHeader toggle={toggleCrear}>Crear Usuario</ModalHeader>
                    <ModalBody>
                        <Form>
                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Rol
                                </Label>
                                <Input type='select' value={createUser.roleId}
                                    label='Controlled'
                                    id='RolModal'
                                    onChange={handleChange}
                                    invalid={!createUser.roleId ? true : null}
                                >
                                    <option key={8} value=''>seleccionar</option>
                                    {ValueRoles.map((rol, index) => <option key={index + 100} value={rol.id}>{rol.name}</option>)
                                    }

                                </Input>
                            </div>

                            {
                                createUser.roleId === '2' || createUser.roleId === '4' ? <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Permisos
                                </Label>
                                <Select
                                    onChange={(e) => handleEmpresasMultiple(e)}
                                    isMulti
                                    name="colors"
                                    options={ValueEmpresasMultiple.map(sub => ({ label: sub.name, value: sub.id}))}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    
                                />
                            </div> : null

                            }
                            
                            
                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Empresa
                                </Label>
                                <Input type='select' value={ValueEmpresaInputModal}
                                    label='Controlled'
                                    id='EmpresaModal'
                                    onChange={handleChange}
                                    invalid={!ValueEmpresaInputModal ? true : null}
                                >
                                    <option key={8} value={UpdateUser.roleId}>seleccionar</option>
                                    {ValueEmpresa.map((rol, index) => <option key={index + 100} value={rol.id}>{rol.name}</option>)
                                    }

                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Contacto
                                </Label>
                                <Input type='select' value={createUser.contactId}
                                    label='Controlled'
                                    id='Contratos'
                                    onChange={handleChange}
                                    invalid={!createUser.contactId ? true : null}
                                >
                                    <option key={8} value="">seleccionar</option>
                                    {ValueContratoSelect.map((rol, index) => <option key={index + 100} value={rol.id}>{rol.name}</option>)
                                    }

                                </Input>
                            </div>
                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Email
                                </Label>
                                <Input type='tezt' value={ValueEmail}
                                    label='Controlled'
                                    id='Email'
                                    disabled
                                />
                            </div>
                            <div className='mb-2'>
                                <Label for='country' className='form-label'>
                                    Contraseña Temporal
                                </Label>
                                <InputPasswordToggle className='input-group-merge' id="temporalPassword" value={createUser.temporalPassword} onChange={handleChange} />
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={(e) => CreateUser(e)}>Crear</Button>
                        <Button color="secondary" onClick={toggleCrear}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
            <Card style={{background: "#cce5fd"}}>
                <CardBody>
                    <CardTitle>Usuarios</CardTitle>
                    <Row className='match-height' style={{ marginBottom: "20px" }}>
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Empresa</Label>
                            <Input type='select' value={ValueEmpresaInput}
                                label='Controlled'
                                id='Empresa'
                                onChange={handleChange}
                                invalid={!ValueEmpresaInput ? true : null}
                            >
                                <option key={8} value=''>seleccionar</option>
                                {ValueEmpresa.map((empresa, index) => <option key={index + 100} value={empresa.id}>{empresa.name}</option>)
                                }

                            </Input>
                            {ValueEmpresaInput ? null : <FormFeedback>Selecciona una empresa</FormFeedback>
                            }

                        </Col>
                        <Col lg='3' sm='6'>
                            <Label for="exampleSelect">Rol</Label>
                            <Input type='select' value={ValueRolesInput}
                                label='Controlled'
                                id='Rol'
                                onChange={handleChange}
                                invalid={!ValueRoles ? true : null}
                            >
                                <option key={8} value={null}>seleccionar</option>
                                {ValueRoles.map((rol, index) => <option key={index} value={rol.id}>{rol.name}</option>)
                                }

                            </Input>
                            {ValueEmpresaInput ? null : <FormFeedback>Selecciona un producto</FormFeedback>
                            }

                        </Col>
                        <Col lg='4' sm='6'>
                            <Row className='match-height'>
                                <Col lg='6' sm='6'>
                                    <Label for="exampleSelect">Nombre</Label>
                                    <Input type="text"
                                        name="select"
                                        id="Nombre"
                                        value={ValueNameInput}
                                        onChange={handleChange}
                                    />
                                    {/*valueRemolque ? null : <FormFeedback>Ingresa un Remolque valido</FormFeedback>
                                    */}
                                </Col>
                                <Col lg='6' sm='6' style={{ justifyContent: "flex-end" }}>
                                    <Button
                                        style={{marginTop:"15px"}}
                                        size='sm'
                                        color="primary"
                                        onClick={() => handleAddEventClick()}
                                    ><Search/></Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                </CardBody>
            </Card>
            <Card>

            <SpinnerComp message="Cargando..." estado={spinner}  />
                <CardBody>
                    <Button id="btn-gold" onClick={toggleCrear}><UserPlus/></Button>
                    {
                        ValueUsers.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={ValueUsers} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
                    }
                </CardBody>
            </Card>
            
        </Fragment>
    )
}

export default Usuarios
