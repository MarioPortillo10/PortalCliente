import React, { useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import './style/user.css'
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'
import { handleLogout } from '@store/authentication'
import { useDispatch } from 'react-redux'
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-27.jpg'
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

const UserConfigButton = () => {
  //const [showOptions, setShowOptions] = useState(false)
    // ** Store Vars
const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
//   const toggleOptions = () => {
//     setShowOptions(!showOptions)
//   }
useEffect(() => {
    if (isUserLoggedIn() !== null) {
      console.log(JSON.parse(localStorage.getItem('userData')))
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

//const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    // <div>
    //   <button className="user-config-button" onClick={toggleOptions}>
    //     <img className="user-config-button__image" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Imagen de usuario" height={50} />
    //     <span className="user-config-button__title">Configuración</span>
    //   </button>
    //   {showOptions && (
    //     // <div className="user-config-options">
    //     //   {/* Aquí puedes agregar las opciones desplegadas */}
    //     //   <p>Opción 1</p>
    //     //   <p>Opción 2</p>
    //     // </div>
    //   )}
    // </div>
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item' style={{listStyleType:"none", marginBottom:"20px"}}>
    <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()} style={{display:"flex", flexDirection:"row-reverse", justifyContent:"space-around", alignItems:"center"}}>
      <div className='user-nav d-sm-flex ' >
        <span style={{color:'#ffffff'}} className='user-name fw-bold'>{(userData && userData['username']) || 'John Doe'}</span>
      </div>
      <Avatar style={{marginRight:"10px"}} img={defaultAvatar} imgHeight='40' imgWidth='40' status='online' />
    </DropdownToggle>
    <DropdownMenu end>
      {/*<DropdownItem tag={Link} to='/pages/profile'>
        <User size={14} className='me-75' />
        <span className='align-middle'>Profile</span>
      </DropdownItem>
      <DropdownItem tag={Link} to='/apps/email'>
        <Mail size={14} className='me-75' />
        <span className='align-middle'>Inbox</span>
      </DropdownItem>
      <DropdownItem tag={Link} to='/apps/todo'>
        <CheckSquare size={14} className='me-75' />
        <span className='align-middle'>Tasks</span>
      </DropdownItem>
      <DropdownItem tag={Link} to='/apps/chat'>
        <MessageSquare size={14} className='me-75' />
        <span className='align-middle'>Chats</span>
      </DropdownItem>*/}
      <DropdownItem divider />
      <DropdownItem tag={Link} to='/pages/account-settings'>
        <Settings size={14} className='me-75' />
        <span className='align-middle'>Cambiar Contraseña</span>
      </DropdownItem>
      {/*<DropdownItem tag={Link} to='/pages/pricing'>
        <CreditCard size={14} className='me-75' />
        <span className='align-middle'>Pricing</span>
      </DropdownItem>
      <DropdownItem tag={Link} to='/pages/faq'>
        <HelpCircle size={14} className='me-75' />
        <span className='align-middle'>FAQ</span>
      </DropdownItem>*/}
      <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
        <Power size={14} className='me-75' />
        <span className='align-middle'>Salir</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
  )
}

export default UserConfigButton