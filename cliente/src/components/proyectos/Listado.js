import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/context';
import TareasContext from '../../context/tareas/context';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {
  const proyectosContext = useContext(ProyectoContext);
  const {
    proyectos,
    obtenerProyectos,
    agregarProyectoActual,
  } = proyectosContext;

  const tareasContext = useContext(TareasContext);
  const { obtenerTareas } = tareasContext;

  useEffect(() => {
    obtenerProyectos();
  }, []);

  const agregarProyectoAtual = (proyecto) => {
    agregarProyectoActual(proyecto);
    obtenerTareas(proyecto.id);
  };

  if (proyectos.length === 0) return null;

  return (
    <ul className='listado-proyectos'>
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto.id} timeout={200} classNames='proyecto'>
            <Proyecto
              proyecto={proyecto}
              agregarProyectoAtual={agregarProyectoAtual}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
