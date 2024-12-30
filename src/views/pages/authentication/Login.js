// ** React Imports
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
//import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'

import './css/login.css'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X, XCircle } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'
import logo from '@src/assets/images/logo/ALMAPAC_TRANSP_LOGO.png'
import homeLogo from '@src/assets/images/logo/Bodegas2-min.png'
// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Alert, Button, CardText, CardTitle, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

import SpinnerComp from '../Utils/Spinner'


const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name} - {role}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        {/* <span>You have successfully logged in as an {role} user to Vuexy. Now you can start to explore. Enjoy!</span> */}
      </div>
    </div>
  )
}

const defaultValues = {
  password: 'TemporalPass2023', //admin
  loginEmail: 'AD1Harold' //admin@demo.com //kryuk088
}

const Login = (props) => {
  // ** Hooks
  //const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const [modalAlert, setmodalAlert] = useState({ modal: false })
  const [spinner, setspinner] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  /*const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default*/

  const datos = {
    id: 1,
    fullName: "John Doe",
    username: "johndoe",
    avatar: "/static/media/avatar-s-11.1d46cc62.jpg",
    email: "admin@demo.com",
    role: "admin",
    ability: [
      {
        action: "manage",
        subject: "all"
      }
    ],
    extras: {
      eCommerceCartItemsCount: 5
    },
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1OTc2NjY5LCJleHAiOjE2NzU5NzcyNjl9.uSugWGl6Cn8QjDaMcCyJSBvMDjKOIaAhH4DSNkCS0wU",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1OTc2NjY5LCJleHAiOjE2NzU5NzcyNjl9.1KDrYFGAzzMYv22-tMPK5q2Vm_qTOstf3DMeKUKIVWc"
  }

  //Alerta de sesion
  const toggleAlert = () => {
    setmodalAlert({ modal: !modalAlert.modal })
  }

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setspinner(true)
      useJwt
        //.login({ email: data.loginEmail, password: data.password })
        .login({ username: data.loginEmail, password: data.password })
        .then(res => {
          setspinner(false)
          const data = { ...datos, accessToken: datos.accessToken, refreshToken: datos.refreshToken }
          data.fullName = res.data.data.name
          data.username = res.data.data.name
          data.role = res.data.data.role
          data.accessToken = res.data.data.token
          data.customer = res.data.data.customer
          dispatch(handleLogin(data))
          //ability.update(res.data.userData.ability)
          ability.update(datos.ability)
          console.log("DATA**: ", data)
          navigate(getHomeRouteForLoggedInUser(data.role))//navigate(getHomeRouteForLoggedInUser(data.role))
          console.log("LLega")
          toast(t => (
            <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doess'} />
          ))
        })
        .catch(err => {
          setspinner(false)
          console.log(err)
          toggleAlert()
        })
    } else {
      for (const key in data) {
        setspinner(false)
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }


  return (
    <div className='auth-wrapper auth-cover' style={{ display: "flex", justifyContent: "space-around", backgroundImage:`url(${homeLogo})`, backgroundSize:"cover", position:"center"}}>


      {/* Modal para alertas de usuario */}
      <Modal style={{ zIndex: "10000" }} isOpen={modalAlert.modal} toggle={toggleAlert} className={props.className}>
        <ModalBody style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center" }}>
          <XCircle width="30%" height="30%" color='red' style={{ marginTop: "15px" }} />
          El usuario o la contraseña son incorrectos
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setmodalAlert({ modal: !modalAlert.modal })}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      <Row className='auth-inner m-0' style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        {/* <Col className='d-none d-lg-flex align-items-center' lg='8' sm='12' style={{padding:"0px"}}>
          
            <img className='img-fluid' src={homeLogo} alt='Login Cover' style={{maxWidth:"100%", height:"100%"}}/>
          
        </Col> */}
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-2' lg='6' sm='6' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", height: "500px", borderRadius: "50px", width: "400px", background: "linear-gradient(to top, #B4D9FF, #ECF6FF)" }}>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12' style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <img src={logo} alt='logo' style={{ maxWidth: "213px", background: "aliceblue" }} />
            {/*<CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome ! 👋
            </CardTitle>*/}
            <CardText className='mb-2' style={{ fontWeight: "bold", fontSize: "20px", marginTop: "30px" }}>Bienvenido/a</CardText>
            <Alert color='primary'>
              {/*<div className='alert-body font-small-2'>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Admin:</span> admin@demo.com | admin
                  </small>
                </p>
                <p>
                  <small className='me-50'>
                    <span className='fw-bold'>Client:</span> client@demo.com | client
                  </small>
                </p>
              </div>
              <HelpCircle
                id='login-tip'
                className='position-absolute'
                size={18}
                style={{ top: '10px', right: '10px' }}
              />
              <UncontrolledTooltip target='login-tip' placement='left'>
                This is just for ACL demo purpose.
              </UncontrolledTooltip>*/}
            </Alert>
            <SpinnerComp message="Validando Credenciales..." estado={spinner} />
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)} style={{width:"350px", maxwidth:"90%"}}>
              <div className='mb-2'>
                <Label className='form-label' for='login-email' style={{marginLeft:"10px"}}>
                  Usuario
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='Ingrese su usuario'
                      //invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-2'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password' style={{marginLeft:"10px"}}>
                    Contraseña
                  </Label>
                  {/* <Link to='/forgot-password'>
                    <small>Olvidó su contraseña?</small>
                  </Link> */}
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1' style={{ display: "none" }}>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button id='ingresar-button' type='submit' block>
                Ingresar
              </Button>
            </Form>
            <p className='text-center mt-2'>
              {/* <span className='me-25'>New on our platform?</span> */}
              <Link to='/register'>
                {/* <span>Create an account</span> */}
              </Link>
            </p>
            {/*<div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
             <div className='auth-footer-btn d-flex justify-content-center' >
              <Button color='facebook'>
                <Facebook size={14} />
              </Button>
              <Button color='twitter'>
                <Twitter size={14} />
              </Button>
              <Button color='google'>
                <Mail size={14} />
              </Button>
              <Button className='me-0' color='github'>
                <GitHub size={14} />
              </Button>
            </div> */}
          </Col>
          <div className='recuperar-contraseña'>
            <div className='d-flex justify-content-between'>
              <Link to='/forgot-password'>
                <small className='recuperar-contraseña-text'>Recuperar contraseña</small>
              </Link>
            </div>
          </div>
        </Col>

      </Row>

    </div>
  )
}

export default Login
