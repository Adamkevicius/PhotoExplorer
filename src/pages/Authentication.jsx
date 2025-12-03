import { useEffect, useState } from "react";
import { validate } from "react-email-validator";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/AuthContext";
import '../styles/authentication.css';

const Authentication = () => {
  const navigate = useNavigate()
  const { user, userLogin, userRegister } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  }, [])

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    if (!validate(email)) {
      setError("Email is invalid.")
      return
    }

    if (password.length < 8) {
      setError("Passwords must be at least 8 characters long.")
      return
    }

    const userInfo = { email, password }
    if (isLogin) {
      const userLoginResponse = await userLogin(userInfo)
      setError(userLoginResponse)
      return
    }
    else {
      const userRegisterResponse = await userRegister(userInfo)
      setError(userRegisterResponse)
      return
    }
  }

  return (
    <div className="auth__container">
      <div className="auth__card">
        <h3> {isLogin ? "Welcome back!" : "Sign Up to Continue!"} </h3>
        <div className="input__container">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email..."/>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..."/>
          <p id="error-text"> {error} </p>
          <button onClick={handleAuth}> {isLogin ? "Sign in" : "Sign up"} </button>
          <p> 
            {isLogin ? "New User?" : "Don't have an account?"} 
            <span onClick={() => {
              setError(null)
              setIsLogin(prev => !prev)
            }}> 
              {isLogin ? "Register" : "Login"} 
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Authentication

