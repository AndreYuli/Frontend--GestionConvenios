import { useState } from 'react'
import '../styles/login.css'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
import '../styles/register.css'

function Register() {   
  const [count, setCount] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Registro enviado")
  }

  return (
    <div className='container'>
      <img src={logo} alt="Logo UNAC" className='logo'/>
      <h1 className='title'>Regístrate</h1>
      <p className='descripcion'>
        Regístrate para gestionar tus convenios.
      </p>

      <form className='form' onSubmit={handleSubmit}>
        <label className='label'>Correo Electrónico</label>
        <input type="email" className="input" required />

        <label className='label'>Contraseña</label>
        <input type="password" className='input' required />

        <button type="submit" className='button'>Registrarse</button>
      </form>

      <p className='register'>
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  )
}

export default Register   
