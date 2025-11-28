import { Route, Routes } from "react-router"
import { AuthProvider } from "./lib/AuthContext"
import PrivateRoutes from "./lib/PrivateRoutes"
import Authentication from "./pages/Authentication"
import Home from "./pages/Home"
import LikedImages from "./pages/LikedImages"

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={ <Authentication /> } />

        <Route element={ <PrivateRoutes /> }>
          <Route path="/" element={ <Home /> } />
          <Route path="/liked-images" element={ <LikedImages />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
