import { useState } from 'react'
import '../styles/login.css'
import logo from '../assets/logo.jpg'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  const handleSubmit = (e) => {}

  return (
    <div className='container'>
      <img src={logo} alt="Logo UNAC" className='logo'/>
      <h1 className='title'>Iniciar Sesión</h1>
      <p className='descripcion'>
        Accede a tu cuenta para gestionar tus convenios.
      </p>

      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>Correo Electrónico</label>
        <input type="email" className="input" required />

        <label className='label'>Contraseña</label>
        <input type="password" className='input' required />

        <button type="submit" className='button'>Ingresar</button>
      </form>

      <p className='register'>
        ¿No tienes cuenta? <Link to='/register'>Registrate</Link>
      </p>
    </div>
  )
}

export default Login
