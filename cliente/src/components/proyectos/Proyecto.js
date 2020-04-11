import React from 'react';

const Proyecto = ({ proyecto, agregarProyectoAtual }) => {
  return (
    <li>
      <button
        className='btn btn-blank'
        onClick={() => agregarProyectoAtual(proyecto)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
