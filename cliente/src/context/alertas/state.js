import React, { useReducer } from 'react';
import alertaReducer from './reducer';
import alertaContext from './context';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertaState = (props) => {
  const initialState = {
    alerta: null,
  };

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  const mostrarAlerta = (mensaje, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        mensaje,
        categoria,
      },
    });
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  return (
    <alertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
      }}
    >
      {props.children}
    </alertaContext.Provider>
  );
};

export default AlertaState;
