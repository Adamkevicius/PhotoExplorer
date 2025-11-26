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
    setLoading(true)
    try {
      await account.createEmailPasswordSession({
        email: userInfo.email,
        password: userInfo.password
      })

      let accountDetails = await account.get()

      setUser(accountDetails)
    }
    catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const userRegister = async (userInfo) => {
    setLoading(true)
    try {
      await account.create({
        userId: ID.unique(),
        email: userInfo.email,
        password: userInfo.password
      })

      await userLogin(userInfo)
      navigate("/")
    }
    catch (error) {
      console.log(error)
    }
    setLoading(false)
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
