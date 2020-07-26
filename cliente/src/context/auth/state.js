import React, { useReducer } from 'react';
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION,
} from '../../types';
import AuthReducer from './reducer';
import AuthContext from './context';
import tokenAuth from '../../config/tokenAuth';

import clienteAxios from '../../config/axios';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);

      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      usuarioAutenticado();
    } catch (error) {
      console.log(error.response.data.msg);
      const alerta = {
        msg:
          error.response.data.msg ||
          'No pudimos procesar su solicitud, intente de nuevo mas tarde',
        categoria: 'alerta-error',
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios.get('/api/auth');
      dispatch({
        type: OBTENER_USUARIO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_ERROR,
        payload: error,
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.useReducer,
        mensaje: state.mensaje,
        registrarUsuario,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
