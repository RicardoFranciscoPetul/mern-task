import React, { useReducer } from 'react';
import reducer from './reducer';
import ProyectoContext from './context';
import uuid from 'uuid';
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from '../../types';

const ProyectoState = (props) => {
  const proyectos = [
    { id: 1, nombre: 'Tienda' },
    { id: 2, nombre: 'Intranet' },
    { id: 3, nombre: 'Diseño de sitio web' },
  ];

  const initialState = {
    proyectos: [],
    formulario: false,
    errorFormulario: false,
    proyectoSeleccionado: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  };

  const agregarProyecto = (proyecto) => {
    proyecto.id = uuid.v4();
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };

  const agregarProyectoActual = (proyecto) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyecto,
    });
  };

  const mostrarErrorFormulario = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  const eliminarProyecto = (id) => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: id,
    });
  };

  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorFormulario: state.errorFormulario,
        proyectoSeleccionado: state.proyectoSeleccionado,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarErrorFormulario,
        agregarProyectoActual,
        eliminarProyecto,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyectoState;
