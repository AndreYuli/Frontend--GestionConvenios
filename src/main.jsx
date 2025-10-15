import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/authContext'
import { ProtectedRoute } from '../routes'

import Login from './components/login.jsx'
import Register from './components/register.jsx'
import MenuPrincipal from './components/menuPrincipal.jsx'
import App from './App.jsx'
import MenuPrincipalAdmin from './components/MenuPrincipalAdministrador.jsx'
import AgregarConvenio from './components/agregarConvenios.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menuprincipal" element={<MenuPrincipal />} />
          <Route path="/menuPrincipalAdmin" element={<MenuPrincipalAdmin/>} />
          <Route path='/agregarConvenio' element={<AgregarConvenio/>}/>

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
