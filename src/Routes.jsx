import React from 'react';
import {Route, RouteHandler} from 'react-router';
import MapEditor from './MapEditor.jsx';

const Routes = (
  <Route>
    <Route name="editor" handler={MapEditor}/>
  </Route>
);

export default Routes;
