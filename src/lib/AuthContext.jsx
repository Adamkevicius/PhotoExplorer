import { ID } from 'appwrite'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { account } from './appwrite'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    userSessionCheck()
  }, [])

  const userLogin = async (userInfo) => {
    try {
      await account.createEmailPasswordSession({
        email: userInfo.email,
        password: userInfo.password
      })
      setLoading(true)

      let accountDetails = await account.get()

      setUser(accountDetails)
      setLoading(false)

      return null
    }
    catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        return error.message
      }

      return "An error occured during signing in"
    }
  }

  const userRegister = async (userInfo) => {
    try {
      await account.create({
        userId: ID.unique(),
        email: userInfo.email,
        password: userInfo.password
      })
      setLoading(true)

      await userLogin(userInfo)
      setLoading(false)
      navigate("/")
    }
    catch (error) {
      setLoading(false)
      if (error instanceof Error) {
        return error.message
      }

      return "An error ocurred during signing up"
    }
  }

  const userLogout = async () => {
    account.deleteSession({
      sessionId: "current"
    })
    setUser(null)
  }

  const userSessionCheck = async () => {
    try {
      let accountDetails = await account.get()
      setUser(accountDetails)
    }
    catch (error) {
      console.log(error)
      setUser(null)
    }
    setLoading(false)
  }

  const contextData = {
    user, userLogin, userRegister, userLogout
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div className="loading">
          <div className="spinner" />
          <p> Loading... </p>
        </div>
      ) : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => { return useContext(AuthContext) }

export default AuthContext
