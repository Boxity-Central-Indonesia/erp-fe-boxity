import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
 

const ProtectedRoute = (props) => {
    const authToken = Cookies.get('token')
    const auth = !!authToken
  
    if(!auth) return <Navigate to='/login' />
  
    return props.children
  }

  const UnprotectedRoute = (props) => {
    const authToken = Cookies.get('token')
    const auth = !!authToken
  
    if(auth) return <Navigate to='/' />
  
    return props.children
  }

    const AuthenticatedComponent = ({ children }) => {
      const authToken = Cookies.get('token')
      const auth = !!authToken
    
      return auth ? children : null  
    
    };


    

export default {ProtectedRoute, UnprotectedRoute, AuthenticatedComponent}