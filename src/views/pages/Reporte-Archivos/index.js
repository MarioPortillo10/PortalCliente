// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { getUserData } from '@utils'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Row, Col, CardSubtitle, Button, Input, Label, FormFeedback } from 'reactstrap'
// ** Third Party Components

import TableZeroConfig from '../../tables/data-tables/basic/TableZeroConfig'
import axios from 'axios'
import { Search, Download } from 'react-feather'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../Utils/Spinner'

const Archivos = () => {
    
    const [valueIng, setValueIng] = useState('')
    const [valueData, setValuedata] = useState({data:[1,  2, 3]})
    const [valueFiles, setValueFiles] = useState([])
    const [valueRemolque, setValueRemolque] = useState('')
    const [valueDateIn, setValueDateIn] = useState('')
    const [valueDateFin, setValueDateFin] = useState('')
    const user = getUserData()
    const [valueError, setValueError] =  useState({producto: false, fechaIn: false, fechaFin: false, Remolque: false})

    const [spinner, setspinner] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const token =  user.accessToken

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

      const instanceFilesList = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Files/DocumentList',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

      const handleAddEventClick = () => {

            if (valueDateFin || valueDateIn || valueRemolque || valueIng) {
                setspinner(true)
                instanceFilesList.post('', {
                    startDate: new Date(valueDateIn), //"2023-02-24T14:21:17.141Z",
                    finalDate: new Date(valueDateFin), //"2023-02-24T14:21:17.141Z",
                    fileName: valueRemolque !== "" ? valueRemolque : null, //"string",
                    customerId: valueIng,
                    pageNumber: 1,
                    pageSize: 300
                      
                })
                  .then(response => {
                      setspinner(false)
                      setValueFiles(response.data.data)
        
                  })
            }
      }

      const ReporteDownload = axios.create({
        baseURL: 'http://10.10.21.5:8080/api/Files/Document',
        timeout: 0,
        headers: {Authorization: `Bearer ${token}`}
      })

      const handleReporte = (e, number, uploadDate, name) => {
            e.preventDefault()
            setspinner(true)
            ReporteDownload.post('', {
                number,
                uploadDate,
                name
              })
            .then(response => {
                setspinner(false)
                const linkSource = `data:application/pdf;base64,${response.data.data.base64FileContent}`
                const downloadLink = document.createElement("a")
                const fileName = name

                downloadLink.href = linkSource
                downloadLink.download = fileName
                downloadLink.click()
            })
      }

    const handleChangeRemolque = event => {

        if (event.target.value) {
            setValueError({...valueError, producto: false})
            console.log("valueError: ", valueError)
        }
         console.log(event.target.value)
         setValueRemolque(event.target.value)
      }  

      const basicColumns = [
        {
          name: 'Numero de documento',
          sortable: true,
          minWidth: '100px',
          selector: row => row.number
        },
        {
          name: 'Fecha',
          sortable: true,
          minWidth: '150px',
          selector: row => row.uploadDate
        },
        {
          name: 'Nombre de documento',
          sortable: true,
          minWidth: '250px',
          selector: row => row.name
        },
        {
            name: 'Documento',
            cell:(row) => <Button size='sm' color='primary' onClick={(e) => handleReporte(e, row.number, row.uploadDate, row.name)} id={row.number}><Download/></Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            minWidth: '150px'
        }
      ]


      useEffect(() => {
        setspinner(true)
        const Customers = axios.create({
            baseURL: 'http://10.10.21.5:8080/api/Customers/Assigned?customerGroupId=1',
            timeout: 0,
            headers: {Authorization: `Bearer ${token}`}
          })
          Customers.get('')
          .then(response => {
            setspinner(false)
              setValuedata(response.data)
          }).catch(error => {

            if (error.response.status === 401) {
              
              dispatch(handleLogout())
              navigate('/Login')
              alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
            } 
    
          })
      }, [])
      
  return (
    <Fragment>
      <SpinnerComp message="Cargando..." estado={spinner}  />
        <Card style={{background: "#cce5fd"}}>
            <CardBody>
            <CardTitle>Archivos</CardTitle>
            <Row className='match-height' style={{marginBottom: "20px"}}> 

                <Col lg='3' sm='6'>
                    <Label for="exampleSelect">Empresa</Label>
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
                    min="1400-12-12" max={new Date().toLocaleDateString('fr-CA').toString()}//2023-02-22
                    />
                </Col>
                <Col lg='4' sm='6'>
                    <Row className='match-height'>
                        <Col lg='6' sm='6'> 
                            <Label for="exampleSelect">Documento</Label>
                            <Input type="text" 
                            name="select" 
                            id="Remolque"
                            value={valueRemolque}
                            onChange={handleChangeRemolque}
                            />

                        </Col>
                        <Col lg='6' sm='6' style={{justifyContent: "flex-end"}}> 
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

            </CardBody>
        </Card>
        <Card>
            <CardBody>
            {
                valueFiles.length > 0 ? <TableZeroConfig columns={basicColumns} contenido={valueFiles} /> : <p style={{textAlign:"center"}}> Por favor utilizar los filtros para mostrar la información</p>
            }
            </CardBody>
        </Card>
        
    </Fragment>
  )
}

export default Archivos
