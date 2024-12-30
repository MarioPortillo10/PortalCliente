// ** React Imports
import { Link, Navigate } from 'react-router-dom'
import React, {useRef, useState} from 'react'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Custom Hooks
//import { useSkin } from '@hooks/useSkin'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import ReCAPTCHA from "react-google-recaptcha"

import axios from 'axios'

import './css/ForgotPass.css'

import homeLogo from '@src/assets/images/logo/Bodegas2-min.png'

import logo from '@src/assets/images/logo/ALMAPAC_TRANSP_LOGO.png'

const ForgotPassword = () => {
  // ** Hooks
  //const { skin } = useSkin()
  
  const [captchaValido, cambiarUsuarioValido] = useState(null)
  const [usuarioValido, cambiarCaptchaValido] = useState(false)
  const [User, setUser] = useState("")
  const captcha = useRef(null)

  function onChange() {
    if (captcha.current.getValue()) {
      console.log("usuario no es un robot")
    }
  }

  /*const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event, { dispatch, getState }) => {
    await axios.post('/apps/calendar/update-event', { event })
    await dispatch(fetchEvents(getState().calendar.selectedCalendars))
    return event
  })*/

  const submit = (e) => {
    e.preventDefault()

  if (captcha.current.getValue()) {
      console.log('El usuario no es un robot')
      console.log("USER: ", User)
      axios.post('http://10.10.21.5:8080/api/Authentication/Reset', {username: User}
      ).then(response => console.log("response.data: ", response.data))
      cambiarUsuarioValido(true)
      cambiarCaptchaValido(true)
    } else {
      console.log('Por favor acepta el captcha')
      
      cambiarUsuarioValido(false)
      cambiarCaptchaValido(false)
    }
  }

  const handleChange = (e) => {
    setUser(e.target.value)
  }

  // const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
  //   source = require(`@src/assets/images/pages/${illustration}`).default

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-cover' style={{ display: "flex", justifyContent: "space-around", backgroundImage:`url(${homeLogo})`, backgroundSize:"cover", position:"center"}}>
        <Row id='alineacion-fila' className='auth-inner m-0'>
          <Col id='contenedor' className=' d-flex align-items-center auth-bg px-2 p-lg-5' lg='6' sm='6'>
            <Col id="contenido-card" className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <img src={logo} alt='logo' style={{ maxWidth: "213px", background: "aliceblue" }} />
              <CardText id="title" className='mb-2'>
                ¿Olvidó su contraseña?
              </CardText>
              
              <Form className='auth-forgot-password-form mt-2' onSubmit={submit}>
              <CardText className='mt-1' style={{textAlign:"left", fontSize:"12px"}}>
                Ingrese su usuario y le enviaremos instrucciones para restablecer su contraseña
              </CardText>
                <div className='mb-2'>
                  {/* <Label className='form-label' for='login-email'>
                  Usuario
                  </Label> */}
                  <Input type='text' id='login-email' placeholder='Ingrese su usuario' value={User} autoFocus  onChange={handleChange}/>
                </div>
                <ReCAPTCHA
                  className='mb-2'
                  ref={captcha}
                  sitekey="6Lc-XVkkAAAAAO2Baaay1Xbl7kFLMTV5lc6tvJFw"
                  onChange={onChange}
                />
                {captchaValido === false && <div className="error-captcha">Por favor acepta el captcha</div>}
                {usuarioValido &&
                  <></>
                }
                <Button id="enviar-button" color='primary' block className='mb-2'>
                  Enviar
                </Button>
                
              </Form>
            </Col>
            <div className='recuperar-contraseña'>
            <div className='d-flex justify-content-between'>
              <Link to='/login'>
                  <ChevronLeft className='rotate-rtl me-25' size={14} color='black'/>
                  <span className='recuperar-contraseña-text'>Volver al login</span>
                </Link>
            </div>
          </div>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Navigate to='/' />
  }
}

export default ForgotPassword
