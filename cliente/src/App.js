import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Proyectos from './components/proyectos/Proyectos';
import NuevaCuenta from './components/auth/NuevaCuenta';
import ProyectoState from './context/proyectos/state';
import TareasState from './context/tareas/state';
import AlertaState from './context/alertas/state';

function App() {
  return (
    <ProyectoState>
      <TareasState>
        <AlertaState>
          <Router>
            <Switch>
              <Route exact path='/' component={Login} />
              <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
              <Route exact path='/proyectos' component={Proyectos} />
            </Switch>
          </Router>
        </AlertaState>
      </TareasState>
    </ProyectoState>
  );
}

export default App;
