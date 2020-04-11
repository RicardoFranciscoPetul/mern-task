import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        formulario: false,
        proyectos: [...state.proyectos, action.payload],
        errorFormulario: false,
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormulario: true,
      };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyectoSeleccionado: action.payload,
      };
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectoSeleccionado: {},
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
