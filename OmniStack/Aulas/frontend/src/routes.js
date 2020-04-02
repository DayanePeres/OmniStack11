import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from'./pages/Logon';
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncidents'


export default function Routes(){
    return (
        <BrowserRouter> 
             <Switch> {/*Switch garante que apenas uma rota seja executada no momento  */}
             <Route path="/" exact component={Logon} />
             <Route path="/register" component={Register} />
             <Route path="/profile" component={Profile} />
             <Route path="/incident/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}