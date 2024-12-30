// ** React Imports
import { Fragment, useState, useRef, useEffect } from 'react'

// ** User data
import { decode } from 'jsonwebtoken'
import { getUserData } from '@utils'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Vertical Menu Components
import VerticalMenuHeader from './VerticalMenuHeader'
import VerticalNavMenuItems from './VerticalNavMenuItems'
import UserConfigButton from '../config-user'
import { Users } from 'react-feather'

import logo from '@src/assets/images/logo/logo-almapac.png'

import './css/style.css'

const Sidebar = props => {
  // ** Props
  const { menuCollapsed, menu, skin, menuData } = props


  // ** States
  const [groupOpen, setGroupOpen] = useState([])
  const [groupActive, setGroupActive] = useState([])
  const [currentActiveGroup, setCurrentActiveGroup] = useState([])
  const [activeItem, setActiveItem] = useState(null)
  const [result, setresult] = useState([])

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false)

  // ** Ref
  const shadowRef = useRef(null)

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true)
  }

  // ** Scroll Menu
  const scrollMenu = container => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.add('d-block')
      }
    } else {
      if (shadowRef.current.classList.contains('d-block')) {
        shadowRef.current.classList.remove('d-block')
      }
    }
  }

  const decodeToken = token => {
    try {
      const decoded = decode(token)
      return decoded
    } catch (err) {
      console.log(err)
      return null
    }
  }
  const user = getUserData()
  //let result = []
  useEffect(() => {
    const auxResult = menuData.filter(item => item.role.indexOf(user.role) !== -1)
    //const user = {role:"master"}//importador, master, admin
    //result = menuData.filter(item => item.role.indexOf(user.role) !== -1)//user.role

    const tokenRol = decodeToken(user.accessToken)
    const decoded = decode(user.accessToken)
    console.log("user.accessToken: ", user.accessToken)
    console.log("tokenRol: ", tokenRol)
    console.log("decoded: ", decoded)
    console.log("result: ", result)
    if (user.role !== "Administrador" && decoded.role === "Administrador") {
      console.log("Entra: ----------- 1", decoded.role)
      auxResult.push({
        id: 'Portales',
        title: "Portales",
        icon: <Users />,
        navLink: '/admin/Panel',
        role: ['Administrador']
      })
      console.log("Entra: ----------- 2", user.role)
    }
    setresult(auxResult)
    //setresult(menuData.filter(item => item.role.indexOf(user.role) !== -1))
  }, [])

  return (
    <Fragment>
      <div
        className={classnames('nav-bar-vertical main-menu menu-fixed nav-bar-vertical menu-accordion menu-shadow', {
          expanded: menuHover || menuCollapsed === false,
          'menu-light': skin !== 'semi-dark' && skin !== 'dark',
          'menu-dark': skin === 'semi-dark' || skin === 'dark'
        })}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
        style={{background:"#ffffff00"}}
      >
        {menu ? (
          menu({ ...props })
        ) : (
          <Fragment >
            {/* Vertical Menu Header */}
            <VerticalMenuHeader setGroupOpen={setGroupOpen} menuHover={menuHover} {...props} />
            {/* Vertical Menu Header Shadow */}
            <div className='shadow-bottom' ref={shadowRef} style={{background:"transparent"}}></div>
            {/* Perfect Scrollbar */}
            <PerfectScrollbar
              className='main-menu-content '
              style={{ background: "linear-gradient(to bottom, #3AAEEF, #277CDA, #1E62CF)", borderRadius: '30px 30px 30px 30px', display:"flex", flexDirection:"column", justifyContent:"space-between" }}
              options={{ wheelPropagation: false }}
              onScrollY={container => scrollMenu(container)}
            >
              <div>
              <div className='brand-logo logo-menu-almapac'>
                <img src={logo} alt='logo' style={{ maxWidth: "213px", marginBottom: "20px" }} />{/*{themeConfig.app.appLogoImage}*/}
              </div>
              <ul className='navigation navigation-main' style={{ background: "#1d379400" }}>
                <li>
                  <div class="container-menu ">
                    <span className='menu-item text-truncate' style={{color:"white", fontWeight:"bold"}}>Inicio</span>
                    <div class="separador"></div>
                </div>
                </li>
                <VerticalNavMenuItems
                  items={result}
                  menuData={result}
                  menuHover={menuHover}
                  groupOpen={groupOpen}
                  activeItem={activeItem}
                  groupActive={groupActive}
                  setGroupOpen={setGroupOpen}
                  menuCollapsed={menuCollapsed}
                  setActiveItem={setActiveItem}
                  setGroupActive={setGroupActive}
                  currentActiveGroup={currentActiveGroup}
                  setCurrentActiveGroup={setCurrentActiveGroup}
                />
                 <li>
                  <div class="container-menu">
                    <div class="separador"></div>
                </div>
                </li>
              </ul>
              </div>
              
              <UserConfigButton/>
            </PerfectScrollbar>
            
          </Fragment>
          
        )}
        
      </div>
      
    </Fragment>
  )
}

export default Sidebar
