import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Routes } from '../routes'

const AppRouter = () => {
    return (
        <Switch>
            {Routes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to='/' />
        </Switch>
    )
}

export default AppRouter