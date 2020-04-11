import React, { useState, useContext } from 'react';
import ProyectoContext from '../../context/proyectos/context';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const NuevoProyecto = () => {
  const [proyecto, setProyecto] = useState({
    nombre: '',
  });

  const proyectoContext = useContext(ProyectoContext);
  const {
    formulario,
    mostrarFormulario,
    agregarProyecto,
    errorFormulario,
    mostrarErrorFormulario,
  } = proyectoContext;

  const { nombre } = proyecto;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') {
      mostrarErrorFormulario();
      return;
    }
    agregarProyecto(proyecto);
    setProyecto({
      nombre: '',
    });
  };

  const handleChange = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <button
        className='btn btn-block btn-primario'
        onClick={mostrarFormulario}
      >
        Nuevo Proyecto
      </button>
      <TransitionGroup>
        {formulario && (
          <CSSTransition timeout={200} classNames='tarea'>
            <form className='formulario-nuevo-proyecto' onSubmit={handleSubmit}>
              <input
                type='text'
                className='input-text'
                placeholder='Nombre del proyecto'
                name='nombre'
                onChange={handleChange}
                value={nombre}
                autoFocus
              />
              <input
                type='submit'
                className='btn btn-block btn-primario'
                value='Agregar Proyecto'
              />
            </form>
          </CSSTransition>
        )}
      </TransitionGroup>
      {errorFormulario && <p className='mensaje error'> Campo obligatorio</p>}
    </>
  );
};

export default NuevoProyecto;
