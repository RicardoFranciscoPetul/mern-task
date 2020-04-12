import React, { useContext } from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../context/proyectos/context';
import TareasContext from '../context/tareas/context';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {
  const proyectosContext = useContext(ProyectoContext);
  const { proyectoSeleccionado, eliminarProyecto } = proyectosContext;

  const tareasContext = useContext(TareasContext);
  const {
    tareasProyecto,
    eliminarTarea,
    obtenerTareas,
    cambiarEstadoTarea,
    guardarTareaActual,
  } = tareasContext;

  const handleEliminarTarea = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyectoSeleccionado.id);
  };

  const cambiarEstado = (tarea) => {
    tarea.estado = !tarea.estado;
    cambiarEstadoTarea(tarea.estado);
  };

  const seleccionarTarea = (tarea) => {
    guardarTareaActual(tarea);
  };

  if (Object.keys(proyectoSeleccionado).length === 0)
    return <h2>Selecciona o agrega un proyecto</h2>;

  return (
    <>
      <h2>Proyecto: {proyectoSeleccionado.nombre}</h2>
      <button
        className='btn btn-eliminar'
        onClick={() => eliminarProyecto(proyectoSeleccionado.id)}
      >
        Eliminar Proyecto &times;
      </button>
      <ul className='listado-tareas'>
        {tareasProyecto.length === 0 ? (
          <li className='tarea'>No hay proyectos</li>
        ) : (
          <TransitionGroup>
            {tareasProyecto.map((tarea) => (
              <CSSTransition key={tarea.id} timeout={200} classNames='tarea'>
                <Tarea
                  tarea={tarea}
                  eliminarTarea={handleEliminarTarea}
                  cambiarEstado={cambiarEstado}
                  seleccionarTarea={seleccionarTarea}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
    </>
  );
};

export default ListadoTareas;
