import React from 'react';
import {Route} from 'react-router';
import MapEditor from './MapEditor';

const Routes = (
  <Route>
    <Route path="/" handler={MapEditor}/>
  </Route>
);

export default Routes;
