import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './components/Inicio/Inicio';

const App = () => {
    return(
        <BrowserRouter>
            <Container maxWidth="lg">
                <Switch>
                    <Route path="/" exact component={Inicio} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App