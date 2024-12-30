// ** React Imports
import { Fragment, useState } from 'react'
import { getUserData } from '@utils'

import axios from 'axios'
// ** Reactstrap Imports
import { Row, Col, Card, Form, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Demo Components
import ApiKeysList from './ApiKeysList'
import CreateApiKey from './CreateApikey'
import TwoFactorAuth from './TwoFactorAuth'
import RecentDevices from './RecentDevices'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleLogout } from '@store/authentication'

import SpinnerComp from '../Utils/Spinner'

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const defaultValues = {
  newPassword: '',
  currentPassword: '',
  retypeNewPassword: ''
}

const SecurityTabContent = () => {
  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .min(8, obj => showErrors('Contraseña actual', obj.value.length, obj.min))
      .required(),
    newPassword: yup
      .string()
      .min(8, obj => showErrors('Nueva contraseña', obj.value.length, obj.min))
      .required(),
    retypeNewPassword: yup
      .string()
      .min(8, obj => showErrors('Reescriba nueva contraseña', obj.value.length, obj.min))
      .required()
      .oneOf([yup.ref(`newPassword`), null], 'Passwords must match')
  })
  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(SignupSchema)
  })

  const [valueActualPass, setValueActualPass] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [spinner, setspinner] = useState(false)


  const user = getUserData()
  
  const tokens =  user.accessToken

  const instance = axios.create({
    baseURL: 'http://10.10.21.5:8080/api/Authentication/Change',
    timeout: 0,
    headers: {Authorization: `Bearer ${tokens}`}
    
  })

  const handleChangePass = event => {
    console.log("event.target.value; ", event.target.value)
    if (event.target.id === "fechaInicial") {
        setValueActualPass('')
    } else {
        setValueFechaFinal(event.target.value)
    }
    
  }

  const onSubmit = data => {
    console.log("Data : ", data)
    if (Object.values(data).every(field => field.length > 0)) {
        setspinner(true)
        instance.post('', {
          password: data.currentPassword,
          newPassword: data.newPassword
        })
      .then(response => {
        setspinner(false)
        if (response.data.header.code === 401) {
          alert(`Credenciales incorrectas`)
        }
      }).catch(error => {

        if (error.response.status === 401) {
          
          dispatch(handleLogout())
          navigate('/Login')
          alert(`Su sesion ha caducado, vuelva a ingresar sus credenciales`)
        } 

      })
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <SpinnerComp message="Cargando..." estado={spinner}  />
      <Card style={{background:"#cce5fd"}}>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4' style={{color:"#527bac"}}>Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardBody className='pt-1'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='currentPassword'
                  name='currentPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      onChange={handleChangePass}
                      value={valueActualPass}
                      label='Contraseña actual'
                      htmlFor='currentPassword'
                      className='input-group-merge'
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback className='d-block'>{errors.currentPassword.message}</FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='newPassword'
                  name='newPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Nueva contraseña'
                      htmlFor='newPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && <FormFeedback className='d-block'>{errors.newPassword.message}</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Controller
                  control={control}
                  id='retypeNewPassword'
                  name='retypeNewPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Reescriba nueva contraseña'
                      htmlFor='retypeNewPassword'
                      className='input-group-merge'
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className='d-block'>{errors.retypeNewPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <p className='fw-bolder'>Requisitos:</p>
                <ul className='ps-1 ms-25'>
                  <li className='mb-50'>Minimo 8 Caracteres</li>
                  <li className='mb-50'>Al menos un carácter en minúscula</li>
                  <li className='mb-50'>Al menos un carácter en mayuscula</li>
                  <li className='mb-50'>Al menos un carácter numerico</li>
                </ul>
              </Col>
              <Col className='mt-1' sm='12'>
                <Button type='submit' className='me-1' color='primary'>
                  Guardar
                </Button>
                <Button color='secondary' outline>
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      {/*<TwoFactorAuth />
      <CreateApiKey />
      <ApiKeysList />
      <RecentDevices />*/}
    </Fragment>
  )
}

export default SecurityTabContent
