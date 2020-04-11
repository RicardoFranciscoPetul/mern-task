import React, { useReducer } from 'react';
import TareasContext from './context';
import reducer from './reducer';
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
} from '../../types';

const TareasState = (props) => {
  const initialState = {
    tareas: [
      { id: 1, nombre: 'Elegir colores', estado: true, proyectoId: 1 },
      { id: 2, nombre: 'Elegir forma de pago', estado: false, proyectoId: 3 },
      { id: 3, nombre: 'Elegir bd', estado: true, proyectoId: 2 },
      { id: 4, nombre: 'eliminar txt', estado: true, proyectoId: 1 },
      {
        id: 5,
        nombre: 'agregar responsive design',
        estado: false,
        proyectoId: 3,
      },
    ],
    tareasProyecto: null,
    tareaSeleccionada: null,
  };

  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  const agregarTarea = (tarea) => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  const eliminarTarea = (tareaId) => {
    console.log(tareaId);
    dispatch({
      type: ELIMINAR_TAREA,
      payload: tareaId,
    });
  };

  const cambiarEstadoTarea = (tarea) => {
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea,
    });
  };

  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  const actualizarTarea = (tarea) => {
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TareasContext.Provider
      value={{
        tareas: state.tareas,
        tareasProyecto: state.tareasProyecto,
        tareaSeleccionada: state.tareaSeleccionada,
        obtenerTareas,
        agregarTarea,
        eliminarTarea,
        cambiarEstadoTarea,
        guardarTareaActual,
        actualizarTarea
      }}
    >
      {props.children}
    </TareasContext.Provider>
  );
};

export default TareasState;
