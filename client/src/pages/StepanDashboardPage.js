import React, { useState, useEffect } from 'react';
import {CardContainer} from '../components/CardContainer';
import Header from '../components/Header';

export const StepanDashboardPage = () => {

    const [searchText, setsearchText] = useState('');

    return (
        <div>
            <Header searchText={searchText} setsearchText={setsearchText} />
            <CardContainer searchText={searchText}/>
        </div>
    )
}
