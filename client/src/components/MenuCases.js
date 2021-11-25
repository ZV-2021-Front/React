import React from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import Cases from '../data/Cases.json'

const { SubMenu } = Menu;

export const MenuCases = ({cases, selectedCase, setselectedCase}) => {

    return (
        <Menu mode="inline" style={{width: 420,}} onSelect={(key)=>{
            let splitKey=key.key.toString().split('/')
            let Case=cases.databases.find((element)=>element.nameRu==splitKey[0]).cases.find((element)=>element.name==splitKey[1])
            setselectedCase(Case)
        }}>
        { 
            cases["databases"].map((database)=>
                <SubMenu key={database.name} title={database.nameRu} style={{border: '1px solid #f0f0f0'}}>
                    {
                        database['cases'].map((Case)=>
                            <Menu.Item style={{paddingLeft: 25}} key={database.nameRu+'/'+Case.name}>{Case.name}</Menu.Item>
                        )
                    }
                </SubMenu>
            )
        }
        </Menu>
    )
}
