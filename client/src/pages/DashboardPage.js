import React, { useState, useEffect } from 'react';
import { List, Pagination } from 'antd';
import Dashboard from '../data/Dashboard.json'
import { DashboadrItem } from '../components/DashboadrItem';

export const DashboardPage = () => {

    // useEffect(() => {
        
    //     }
    // }, [])

    return (
        <div style={{padding: 50}}>
            <List
             itemLayout="vertical"
             size="large"
             pagination={{
                 pageSize: 10,
                 style: {textAlign: 'left'}
             }}
             dataSource={Dashboard}
             header={<h5>Список диаграмм</h5>}
             renderItem={item=>(
                        <DashboadrItem dashboardItem={item}/>
                    )
             }
            />
        </div>
    )
}
