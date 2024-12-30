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


const ModalAlert = (props) => {
    const [Empresas, setEmpresas] = useState([])
    const [ValueEmpresas, setValueEmpresas] = useState("Empresa 1")
    const [modal, setmodal] = useState({ modal: false })
    const [productos, setProductos] = useState([
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
    const [Secciones, setSecciones] = useState([
        {
            name: "Seccion 1",
            img: "https://picsum.photos/300/200",
            products: ["Maiz", "Azucar", "Maiz 2"]
        },
        {
            name: "Seccion 2",
            img: "https://picsum.photos/300/200",
            products: ["Maiz", "Azucar 2", "Maiz 2"]
        },
        {
            name: "Seccion 3",
            img: "https://picsum.photos/300/200",
            products: ["Maiz", "Azucar", "Maiz 2"]
        },
        {
            name: "Seccion 4",
            img: "https://picsum.photos/300/200",
            products: ["Maiz", "Azucar 2", "Maiz 2"]
        }
    ])
   // const [AddProduct, setAddProduct] = useState([])

    // //caso 1 con objetos
    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    //   ]

    // //caso 2 con objetos
    // const Products = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    //   ]
      const [userChoice, setUserChoice] = useState("")

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

    // useEffect(() => {

    //     console.log("Add: ", AddProduct)
    // }, [AddProduct])

    const handleChange = event => {
        console.log("Hola; ", event.target.value)
        setValueEmpresas(event.target.value)
        setEmpresas([
            {
                name: "emp 1",
                id: 1
            },
            {
                name: "emp 2",
                id: 2
            }
        ])

    }

    /*const handleProducts = e => {
        let updatedList = [...AddProduct]
        if (e.target.checked) {
            updatedList = [...AddProduct, e.target.value]
        } else {
            updatedList.splice(AddProduct.indexOf(e.target.value), 1)
        }
        setAddProduct(updatedList)

    }*/

    // const handleProducts2 = (e) => {
        
    //     console.log("e.target.value: ", e)
    //     setUserChoice(e)
    //     console.log("e.target.value: ", userChoice)
    //     /*let updatedList = [...AddProduct]
    //     if (e.target.checked) {
    //         updatedList = [...AddProduct, e.target.value]
    //     } else {
    //         updatedList.splice(AddProduct.indexOf(e.target.value), 1)
    //     }
    //     setAddProduct(updatedList)*/

    // }

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

    console.log("acceptedFiles: ", acceptedFiles)

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

    const toggleEditar = (e) => {
        e.preventDefault()

        setmodal({ modal: !modal.modal })
    }

    const toggleDelete = (e) => {
        e.preventDefault()

        setmodal({ modal: !modal.modal })
    }

    return (
        <Fragment>
            {/* Modal Guardar */}
            <div>
                <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Agregar Registro</ModalHeader>
                    <ModalBody>
                        ¡Sección Guardada!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Cerrar</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

            {/* Modal Editar  */}

            <div>
                <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Agregar Registro</ModalHeader>
                    <ModalBody>
                        ¡Sección Guardada!
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Cerrar</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

            {/* Modal Eliminar  */}

            <div>
                <Modal isOpen={modal.modal} toggle={toggle} className={props.className}>
                    <ModalHeader toggle={toggle}>Agregar Registro</ModalHeader>
                    <ModalBody>
                        ¿ Esta seguro que deseas eliminar esta Seccion ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Cerrar</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

        </Fragment>
    )
}

export default ModalAlert
