import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import AppTable from './AppTable';
import ProfilesList from './ProfilesList'


function Router() {
    return (
        <Switch>
            <Route exact path="/profiles" component={AppTable} />
            <Route path="/summary/:id" component={ProfilesList} />
            <Redirect to='/profiles' />
        </Switch>
    )
}
export default Router;