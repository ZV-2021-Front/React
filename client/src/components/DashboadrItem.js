import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom'

export const DashboadrItem = ({dashboardItem}) => {
    const history=useHistory()
    return (
        <div style={{
            width: '90%', 
            height: 200,
            margin: '20px 0',
            //border: '1px solid #aaa',
            borderRadius: 20,
            padding: 10,
            boxShadow: '0 0 10px #777'
            }}>

            <h5 onClick={()=>history.push('Diagrams/' + dashboardItem.id)} style={{
                cursor: 'pointer',
                textDecoration: 'underline'
            }}>{dashboardItem.name}</h5>
            <h5>Создана: {moment(dashboardItem.created, "DD-MM-YYYY HH:mm:ss").format("dddd, D MMMM YYYY, HH:mm:ss")}</h5>

        </div>
    )
}
