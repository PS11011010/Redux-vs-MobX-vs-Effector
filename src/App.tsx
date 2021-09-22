import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Redux from './Redux';
import Mobx from './Mobx';
import Effector from './Effector';

const App = () => (
    <BrowserRouter>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/redux" component={Redux} />
            <Route path="/mobx" component={Mobx} />
            <Route path="/effector" component={Effector} />
            <Route component={Home} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
);

export default App;

