// ** React Imports
import { Fragment, useState/*, useCallback*/, useMemo, useEffect } from 'react'
//import { getUserData } from '@utils'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button,
    Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, ModalFooter, Form, ListGroup, ListGroupItem
} from 'reactstrap'

import Select from 'react-select'
//import { Edit, UserPlus, Copy, Circle, Box, Package, AlertTriangle, RotateCw, Server, Grid, Home, Truck, User, Clipboard, UserX } from 'react-feather'
// ** Third Party Components

//import TableZeroConfig from '../../../tables/data-tables/basic/TableZeroConfig'
//import axios from 'axios'
//import InputPasswordToggle from '@components/input-password-toggle'
import { useDropzone } from 'react-dropzone'
// ** Icons Imports
import { Trash, Edit } from 'react-feather'

import axios from 'axios'

import { getUserData } from '@utils'
//import { set } from 'react-hook-form'
import SpinnerComp from '../../Utils/Spinner'

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
}

const focusedStyle = {
    borderColor: '#2196f3'
}

const acceptStyle = {
    borderColor: '#00e676'
}

const rejectStyle = {
    borderColor: '#ff1744'
}


const AdminProductos = (props) => {
    //const [Empresas, setEmpresas] = useState([])
    //const [ValueEmpresas, setValueEmpresas] = useState("")
    const [Valueformulario, setformulario] = useState({name: "", description: "", img: []})
    const [modal, setmodal] = useState({ modal: false })
    const [modalEdit, setmodalEdit] = useState({ modal: false })
    const [modalDelete, setmodalDelete] = useState({ modal: false })
    const [productos, setProductos] = useState([])
    //const [valueproductos, setvalueproductos] = useState([])
    const [Secciones, setSecciones] = useState(null)


    const [valueProductsEdit, setvalueProductsEdit] = useState([])
    const [valueEditId, setvaluevalueEditId] = useState("")
    const [valueDeleteId, setvalueDeleteId] = useState("")

    const [userChoice, setUserChoice] = useState("")

    const [mensajeAlerta, setmensajeAlerta] = useState("")

    const [spinner, setspinner] = useState(false)

      const user = getUserData()
      const token = user.accessToken

    // Lista de productos desde el back para generar los Check
    useEffect(() => {

        if (false) {
            setProductos()
        }
    }, [])

    // Lista de Secciones desde el back para generar los card
    useEffect(() => {
        console.log("userChoice: ", userChoice)
        if (false) {
            
            setSecciones()
        }

        
    }, [userChoice])


    const GetAllSections = () => {
        setspinner(true)
        const Secciones = axios.create({
            //
            baseURL: 'http://10.10.21.5:8080/api/Sections/All',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })

        Secciones.get('')
        .then(response => {
            if (!response.data.data) {
                setspinner(false)
                console.log("ERROR!!!")
            } else {
                setspinner(false)
                setSecciones(response.data.data)
                
            }
            
        }, error => {
            
            console.error('Función de rechazo llamada: ', error)
        })
    }
    // Lista de Secciones desde el back para generar los card
    useEffect(() => {
        setspinner(true)
        const Secciones = axios.create({
            //
            baseURL: 'http://10.10.21.5:8080/api/Sections/All',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })

        Secciones.get('')
        .then(response => {
            if (!response.data.data) {
                console.log("ERROR!!!")
                setspinner(false)
            } else {
                setspinner(false)
                setSecciones(response.data.data)
                
            }
            
        }, error => {
            
            console.error('Función de rechazo llamada: ', error)
        })

        
    }, [])


        // Lista de Secciones desde el back para generar los card
    useEffect(() => {
        setspinner(true)
        const Products = axios.create({
            //
            baseURL: 'http://10.10.21.5:8080/api/Products/All',
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })

        Products.get('')
        .then(response => {
            if (!response.data.data) {
                console.log("ERROR!!!")
            } else {
                setspinner(false)
                const responseget = response.data.data

                const formatresponse = responseget.map(item => {
                    const obj = {}
                    obj["value"] = item.id
        
        
                    obj["label"] = item.name
                    return obj
                  })
                
                setProductos(formatresponse)
                
                
            }
            
        }, error => {
            
            console.error('Función de rechazo llamada: ', error)
        })

        
    }, [])

    useEffect(() => {
        console.log("value img: ", Valueformulario.img)
    }, [Valueformulario])

    const handleEditProducts = e => {

        const trackingCustomersaux = []
        const aux = e.map(function(p) {
            trackingCustomersaux.push(p.value)
            return p
        })
        console.log("trackingCustomersaux: ", trackingCustomersaux)
        setvalueProductsEdit(aux)
        //setvalueproductos(trackingCustomersaux)
        console.log("E: ", aux)
    }
    

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        maxFiles: 1,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    const acceptedFileItems = acceptedFiles.map(file => (

        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ))

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                    {errors.map(e => <li key={e.code}>{e.message}</li>)}
                </ul>

            </li>
        )
    })

    const {
        //getRootProps,
        // getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: { 'image/*': [] } })

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ])

    const toggle = (e) => {
        e.preventDefault()

        setmodal({ modal: !modal.modal })
    }

    const toggleEditar = (e, name, file, productsEdit, id) => {
        e.preventDefault()
        acceptedFiles.pop()
        console.log("acceptedFiles: ", acceptedFiles)
        if (productsEdit && id) {
            console.log("name: ", name)
            console.log("file: ", file)
            console.log("products: ", productsEdit)
            console.log("id: ", id)
            setvaluevalueEditId(id)
            setformulario({name, img: []})
    
            const responseget = productsEdit
            const formatresponse = responseget.map(item => {
                const obj = {}
                obj["value"] = item.id
                obj["label"] = item.name
                return obj
              })
              setvalueProductsEdit(formatresponse)
        }

        setmodalEdit({ modal: !modalEdit.modal })
    }

    const toggleDelete = (e, id) => {
        e.preventDefault()
        setvalueDeleteId(id)
        setmodalDelete({ modal: !modalDelete.modal })
    }


    //Crear seccion
    const SaveSection = (e) => {

            e.preventDefault()

            console.log("Valueformulario.name: ", Valueformulario.name)
            console.log("Valueformulario.description: ", Valueformulario.description)
            console.log("acceptedFiles: ", acceptedFiles)

            if (Valueformulario.name && acceptedFiles && userChoice) {
                setspinner(true)
                const formDataSend = new FormData()
                
                formDataSend.append('Name', Valueformulario.name)
                formDataSend.append('Image', acceptedFiles[0])
                
                for (let i = 0; i < userChoice.length; i++) {
                    formDataSend.append('Products', userChoice[i].value)
                }
                    
                
                const savefile = axios.create({
                    //
                    baseURL: 'http://10.10.21.5:8080/api/Sections/Create',
                    timeout: 0,
                    headers: { Authorization: `Bearer ${token}` }
                })
    
                savefile.post('', formDataSend)
                .then(response => {
                    if (false) {
                        console.log(response)
                    }
                    setspinner(false)
                    GetAllSections()
                    setmensajeAlerta("¡Sección Guardada!")
                    setmodal({ modal: !modal.modal })
                    setformulario({...Valueformulario, name:""})
                }, error => {
                    setspinner(false)
                    console.error('Función de rechazo llamada: ', error)
                })
                //setDataFile({ client: "", description:"", file: null, listUsers:[] })
            }
        }

    // Editar Seccion

    const EditSection = (e) => {

        e.preventDefault()

        if (Valueformulario.name && acceptedFiles && valueProductsEdit) {
            setspinner(true)
            const formDataSend = new FormData()

            formDataSend.append('Id', valueEditId)
            formDataSend.append('Name', Valueformulario.name)
            formDataSend.append('Image', acceptedFiles[0])
            //formDataSend.append('Contacts', dataFile.contacts)

            for (let i = 0; i < valueProductsEdit.length; i++) {
                formDataSend.append('Products', valueProductsEdit[i].value)
            }
                
            
            const savefile = axios.create({
                //
                baseURL: 'http://10.10.21.5:8080/api/Sections/Edit',
                timeout: 0,
                headers: { Authorization: `Bearer ${token}` }
            })

            savefile.put('', formDataSend)
            .then(response => {
                if (false) {
                    console.log(response)
                }
                setspinner(false)
                setmensajeAlerta("¡Sección Editada!")
                setmodal({ modal: !modal.modal })
                GetAllSections()
                setmodalEdit({ modal: !modalEdit.modal })
                setformulario({...Valueformulario, name:""})
            }, error => {
                
                console.error('Función de rechazo llamada: ', error)
            })
        }
    }

    const DeleteSeccion = (e) => {
        e.preventDefault()
        setspinner(true)
        const deleteSeccion = axios.create({
            //
            baseURL: `http://10.10.21.5:8080/api/Sections/Delete?sectionId=${valueDeleteId}`,
            timeout: 0,
            headers: { Authorization: `Bearer ${token}` }
        })

        deleteSeccion.delete('')
        .then(response => {
                console.log(response.data)
                setspinner(false)
                setmodalDelete({ modal: !modalDelete.modal })
                GetAllSections()
            
            
        }, error => {
            setspinner(false)
            console.error('Función de rechazo llamada: ', error)
        })

    }

    return (
        <Fragment>
            <SpinnerComp message="Cargando..." estado={spinner}  />
            {/* Modal Guardar */}
            <div>
                <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Agregar Registro</ModalHeader>
                    <ModalBody>
                        {mensajeAlerta}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Cerrar</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

            {/* Modal Editar  */}

            <div>
                <Modal isOpen={modalEdit.modal} toggle={toggleEditar} className={props.className}>
                    <ModalHeader toggle={toggleEditar}>Editar Productos</ModalHeader>
                    <ModalBody>
                        <div className='mb-2'>
                            <Label for='country' className='form-label'>
                                Nombre de la sección
                            </Label>
                            <Input type='input' value={Valueformulario.name}
                                label='Controlled'
                                id='Ingenio'
                                onChange={(e) => setformulario({...Valueformulario, name: e.target.value })}
                                invalid={!Valueformulario.name ? true : null}
                            />
                        </div>
                        <div className='mb-2'>
                            <div {...getRootProps({ style })}>
                                <Input type="file" {...getInputProps()} />
                                <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
                                <em>(Maximo 1 archivo)</em>
                            </div>
                            <aside>
                                <p>Archivo seleccionado: </p>
                                <ul>{acceptedFileItems}</ul>
                                <p>Archivos rechazados: </p>
                                <ul>{fileRejectionItems}</ul>
                            </aside>
                        </div>
                        <Select
                               
                                onChange={(e) => handleEditProducts(e)}
                                isMulti
                                name="colors"
                                options={productos.map(sub => ({ label: sub.label, value: sub.value}))}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                value={valueProductsEdit.map(sub => ({ label: sub.label, value: sub.value}))}
                                
                            />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={EditSection}>Cerrar</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

            {/* Modal Eliminar  */}

            <div>
                <Modal isOpen={modalDelete.modal} toggle={toggleDelete} className={props.className}>
                    <ModalHeader toggle={toggleDelete}>Agregar Registro</ModalHeader>
                    <ModalBody>
                        ¿ Esta seguro que deseas eliminar esta Seccion ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={DeleteSeccion}>Cerrar</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

            <Card style={{background: "#cce5fd"}}>
                <CardBody>
                    <Row>
                        <div className='mb-2'>
                            <Label for='country' className='form-label'>
                                Nombre de la sección
                            </Label>
                            <Input type='input' value={Valueformulario.name}
                                label='Controlled'
                                id='Ingenio'
                                onChange={(e) => setformulario({...Valueformulario, name: e.target.value })}
                                invalid={!Valueformulario.name ? true : null}
                            />
                        </div>

                        <div className='mb-2'>
                            <div {...getRootProps({ style })}>
                                <Input type="file" {...getInputProps()} />
                                <p>Arrastra y suelta archivos aquí o haz clic para seleccionar archivos</p>
                                <em>(Maximo 1 archivo)</em>
                            </div>
                            <aside>
                                <p>Archivo seleccionado: </p>
                                <ul>{acceptedFileItems}</ul>
                                <p>Archivos rechazados: </p>
                                <ul>{fileRejectionItems}</ul>
                            </aside>
                        </div>

                        {/* <div className='mb-2'>
                            <Label> Agregar Productos: </Label>
                            <div>
                                {
                                    productos.map((product, index) => <Label check> <Input type="checkbox" key={index} value={product.name} onChange={handleProducts} /> {product.name} </Label>)
                                }

                            </div>
                        </div> */}
                        <Label> Agregar productos: </Label>
                        <Select
                            
                            onChange={(e) => setUserChoice(e)}
                            isMulti
                            name="colors"
                            options={productos.map(sub => ({ label: sub.label, value: sub.value}))}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            
                            
                        />

                        {/* <div className='mb-2'>
                            <Label> Productos </Label>
                            <ListGroup>
                                {
                                    AddProduct.map((product, index) => <ListGroupItem key={index + 3}>
                                        {product}
                                    </ListGroupItem>)
                                }
                            </ListGroup>

                        </div> */}

                    </Row>

                    <Row style={{marginTop:"50px"}}>
                        <Col sm="6" md={{ size: 3, offset: 2 }}>
                            <Button color="primary" onClick={SaveSection}>Guardar</Button>
                        </Col>
                        <Col sm="6" md={{ size: 3, offset: 2 }}>
                            <Button color="secondary" onClick={toggle}>Cancelar</Button>
                        </Col>
                    </Row>

                </CardBody>

            </Card>

            <Row>
                {
                    Secciones?.map((section, index) => <Col sm="4" md="4"><Card
                        style={{
                            width: '100%'
                        }}
                    >
                        <img
                            alt="Sample"
                            src={section.urlImage}
                        />
                        <CardBody key={index - 1}>
                            <CardTitle tag="h5">
                                {section.name}
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                            >
                                Productos
                            </CardSubtitle>
                            <CardText>
                                <ListGroup>
                                    {
                                        section.items.map((product, index) => <ListGroupItem key={index + 3}>
                                            {product.name}
                                        </ListGroupItem>)
                                    }
                                </ListGroup>
                            </CardText>
                            <Row>
                                <Col sm="6" >
                                    <Button color='danger' onClick={(e) => toggleDelete(e, section.id)}>
                                        <Trash/>
                                    </Button>
                                </Col>
                                <Col sm="6" >
                                    <Button color='primary'  onClick={(e) => toggleEditar(e, section.name, "file", section.items, section.id)}>
                                        <Edit/>
                                    </Button>
                                </Col>
                            </Row>
                            
                        </CardBody>
                        
                        
                    </Card>
                    </Col>)
                }
            </Row>


        </Fragment>
    )
}

export default AdminProductos
