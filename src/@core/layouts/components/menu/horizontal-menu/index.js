// ** Horizontal Menu Components
import HorizontalNavMenuItems from './HorizontalNavMenuItems'

const HorizontalMenu = ({ menuData }) => {
  return (
    <div className='navbar-container main-menu-content' style={{background: '#1D3794', borderRadius: '0px 0px 30px 30px'}}>
      <ul className='nav navbar-nav' id='main-menu-navigation'>
        <HorizontalNavMenuItems submenu={false} items={menuData} />
      </ul>
    </div>
  )
}

export default HorizontalMenu
