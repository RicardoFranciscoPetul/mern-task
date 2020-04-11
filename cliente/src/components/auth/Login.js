import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  });
  const { email, password } = credenciales;
  const handleChange = e => {
    setCredenciales({
      ...credenciales,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
  };
  return (
    <div className='form-usuario'>
      <div className='contenedor-form sombra-dark'>
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className='campo-form'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              name='email'
              id='email'
              placeholder='Tu email'
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className='campo-form'>
            <label htmlFor='password'>Contraseña</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Tu contraseña'
              onChange={handleChange}
              value={password}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              value='Iniciar sesión'
              className='btn btn-primario btn-block'
            />
          </div>
        </form>
        <Link to='/nueva-cuenta' className='enlace-cuenta'>
          Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
