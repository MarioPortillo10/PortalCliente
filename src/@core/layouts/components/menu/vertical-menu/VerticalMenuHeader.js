// ** React Imports
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

// ** Icons Imports
import { Disc, X, Circle } from 'react-feather'

// ** Config
//import themeConfig from '@configs/themeConfig'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

import logo from '@src/assets/images/logo/logo-almapac.png'
//import logo from '@src/assets/images/logo/ALMAPAC_TRANSP_LOGO.png'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed/*, setMenuVisibility*/, setGroupOpen, menuHover } = props

  // ** Vars
  const user = getUserData()

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header' style={{display:"none", background: '#1D3794', borderRadius: '30px 30px 0px 0px'}}>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item me-auto'>
          <NavLink to={user ? getHomeRouteForLoggedInUser(user.role) : '/'} className='navbar-brand' style={{margin:"0px"}}>
            <span className='brand-logo '>
              <img src={logo} alt='logo' style={{maxWidth: "213px", marginBottom:"20px"}}/>{/*{themeConfig.app.appLogoImage}*/}
            </span>
            {/*<h2 className='brand-text mb-0'>{themeConfig.app.appName}</h2>*/}
          </NavLink>
        </li>
        <li className='nav-item nav-toggle'>
          {/*<div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>*/}
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
