// ** Third Party Components
import { MoreHorizontal } from 'react-feather'

const VerticalNavMenuSectionHeader = ({ item }) => {
  return (
    <li className='navigation-header'>
      <span style={{color: "aliceblue"}}>{item.header}</span>
      <MoreHorizontal className='feather-more-horizontal' />
    </li>
  )
}

export default VerticalNavMenuSectionHeader
