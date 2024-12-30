
import { handleLogout } from '@store/authentication'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Fragment, useEffect } from 'react'


const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(handleLogout())
        
        navigate('/Login')
    }, [])
  
    
    return (
        <Fragment>
   
        </Fragment>
    )
}

export default Logout
