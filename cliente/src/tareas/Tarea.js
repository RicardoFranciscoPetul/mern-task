import React from 'react';

const Tarea = ({ tarea, eliminarTarea, cambiarEstado, seleccionarTarea }) => {
  return (
    <li className='tarea sombra'>
      <p>{tarea.nombre}</p>
      <div className='estado'>
        {tarea.estado ? (
          <button className='completo' onClick={() => cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button className='incompleto' onClick={() => cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className='acciones'>
        <button
          className='btn btn-primario'
          onClick={() => seleccionarTarea(tarea)}
        >
          Editar
        </button>
        <button
          className='btn btn-secundario'
          onClick={() => eliminarTarea(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
