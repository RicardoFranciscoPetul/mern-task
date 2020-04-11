import React, { useContext, useState } from 'react';
import ProyectoContext from '../context/proyectos/context';
import TareasContext from '../context/tareas/context';
import uuid from 'uuid';
import { useEffect } from 'react';

const FormTarea = () => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoSeleccionado } = proyectosContext;

  const tareasContext = useContext(TareasContext);
  const {
    agregarTarea,
    obtenerTareas,
    tareaSeleccionada,
    actualizarTarea,
  } = tareasContext;

  const [tarea, guardarTarea] = useState({
    nombre: '',
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: '',
      });
    }
  }, [tareaSeleccionada]);

  const { nombre } = tarea;

  const onSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') {
      setError(true);
      return;
    }
    if (tareaSeleccionada === null) {
      tarea.id = uuid.v4();
      tarea.proyectoId = proyectoSeleccionado.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      actualizarTarea(tarea);
    }

    setError(false);
    obtenerTareas(proyectoSeleccionado.id);
    guardarTarea({
      nombre: '',
    });
  };

  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  if (Object.keys(proyectoSeleccionado).length === 0) return null;

  return (
    <div className='formulario'>
      <form onSubmit={onSubmit}>
        <div className='contenedor-input'>
          <input
            type='text'
            name='nombre'
            className='input-text'
            placeholder='Nombre tarea'
            onChange={handleChange}
            value={nombre}
          />
        </div>
        <div className='contenedor-input'>
          <input
            type='submit'
            className='btn btn-block btn-primario btn-submit'
            value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
          />
        </div>
      </form>
      {error && (
        <p className='mensaje error'>El nombre de la tarea es obligatorio *</p>
      )}
    </div>
  );
};

export default FormTarea;
