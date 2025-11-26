import { Navigate, Outlet } from 'react-router'
import { useAuth } from './AuthContext'

const PrivateRoutes = () => {
    const { user } = useAuth()
    
    return user ? <Outlet /> : <Navigate to="/auth" />
}

export default PrivateRoutes