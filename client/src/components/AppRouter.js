import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Routes } from '../routes'

import Header from './Header'

const AppRouter = () => {
    return (
        <div>
            <Switch>
                {Routes.map(({path, Component}) => 
                    <Route key={path} path={path} component={Component} exact/>
                )}
                <Redirect to='/' />
            </Switch>
        </div>
    )
}

export default AppRouter