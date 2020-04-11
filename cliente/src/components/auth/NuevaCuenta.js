import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NuevaCuenta = () => {
  const [credenciales, setCredenciales] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });
  const { nombre, email, password, confirmar } = credenciales;
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
        <h1>Obtener una cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className='campo-form'>
            <label htmlFor='nombre'>Nombre</label>
            <input
              type='text'
              name='nombre'
              id='nombre'
              placeholder='Tu nombre'
              onChange={handleChange}
              value={nombre}
            />
          </div>
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
            <label htmlFor='confirmar'>Confirmar contraseña</label>
            <input
              type='password'
              name='confirmar'
              id='confirmar'
              placeholder='Repite tu contraseña'
              onChange={handleChange}
              value={confirmar}
            />
          </div>
          <div className='campo-form'>
            <input
              type='submit'
              value='Registrarme'
              className='btn btn-primario btn-block'
            />
          </div>
        </form>
        <Link to='/' className='enlace-cuenta'>
          Regresar
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
