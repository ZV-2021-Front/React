import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { ColorPicker } from './ColorPicker';
const { Option } = Select;


export const MapConfig = ({props}) => {
    let mapTypes=[
        'Регионы России',
        'Отдельные маркеры',
        'Скопление маркеров'
    ]
    let mapBackgrounds=[
        'Улицы',
        'Спутник'
    ]
    const [localColorStops, setlocalColorStops] = useState([[]]);
    useEffect(() => {
        setlocalColorStops([...props.mapConfig.colorStops])
    }, [props.mapConfig.colorStops]);

    return (
        <div>
            <Divider />
            <h5 className='my-2'>Тип карты</h5>
            <Select value={props.mapConfig.mapType} onChange={(value)=>{
                let newmapConfig={...props.mapConfig}
                newmapConfig.mapType=value
                props.setmapConfig(newmapConfig)
                }} className='my-1 w-100'>
                {
                    mapTypes.map((mapType)=>
                        <Option key={mapType} value={mapType} >{mapType}</Option>
                    )
                }
            </Select>        
            <h5 className='my-2'>Фон карты</h5>
            <Select value={props.mapConfig.mapBackground} onChange={(value)=>{
                let newmapConfig={...props.mapConfig}
                newmapConfig.mapBackground=value
                props.setmapConfig(newmapConfig)
                }} className='my-1 w-100'>
                {
                    mapBackgrounds.map((mapBackground)=>
                        <Option key={mapBackground} value={mapBackground} >{mapBackground}</Option>
                    )
                }
            </Select>
            {props.mapConfig.mapType=='Регионы России' ?
                <div>
                    <h5 className='my-2'>Номер региона</h5>
                    <Select value={props.mapConfig.regionId} onChange={(value)=>{
                        let newmapConfig={...props.mapConfig}
                        newmapConfig.regionId=value
                        props.setmapConfig(newmapConfig)
                        }} className='my-1 w-100'>
                        {
                            props.fields.map((field)=>
                                <Option value={field} >{field}</Option>
                            )
                        }
                    </Select> 
                    <h5 className='my-2'>Значение региона</h5>
                    <Select value={props.mapConfig.regionValue} onChange={(value)=>{
                        let newmapConfig={...props.mapConfig}
                        newmapConfig.regionValue=value
                        props.setmapConfig(newmapConfig)
                        }} className='my-1 w-100'>
                        {
                            props.fields.map((field)=>
                                <Option value={field} >{field}</Option>
                            )
                        }
                    </Select>
                    <h5 className='my-2'>Название региона</h5>
                    <Select value={props.mapConfig.regionName} onChange={(value)=>{
                        let newmapConfig={...props.mapConfig}
                        newmapConfig.regionName=value
                        props.setmapConfig(newmapConfig)
                        }} className='my-1 w-100'>
                        {
                            props.fields.map((field)=>
                                <Option value={field} >{field}</Option>
                            )
                        }
                    </Select>  
                    <Divider />
                    <h5 className='my-2'>Настройка покраски</h5>
                    <h5 className='my-2'>Значение                            Цвет</h5>
                    {
                        localColorStops.map((stop, i)=>
                            <div style={{display: 'inline-flex', width: '70%', alignItems: 'center', margin: '5px 0'}}>
                                <Input value={stop[0]} onChange={(e)=>{
                                    let newlocalColorStops=[...localColorStops]
                                    newlocalColorStops[i][0]= +e.target.value
                                    setlocalColorStops([...newlocalColorStops])
                                }} style={{width: '66%', height: '90%'}} />
                                <ColorPicker props={{localColorStops, setlocalColorStops, index: i}} />
                                <CloseCircleOutlined onClick={()=>{localColorStops.splice(i, 1); setlocalColorStops([...localColorStops])}} style={{fontSize: 30, marginLeft: 5}} />
                            </div>
                        )
                    }
                    <div style={{display: 'inline-flex', width: '70%', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                        <Button onClick={()=>{setlocalColorStops([...localColorStops, []])}} >Новое значение</Button>
                        <Button onClick={()=>{
                            let newmapConfig={...props.mapConfig}
                            newmapConfig.colorStops=localColorStops
                            props.setmapConfig(newmapConfig)
                        }} type='primary' >Сохранить</Button>
                    </div>
                    <Divider />
                </div> 
            : null}
            {props.mapConfig.mapType=='Отдельные маркеры' || props.mapConfig.mapType=='Скопление маркеров' ?
                <div>
                    <h5 className='my-2'>Текст под маркером</h5>
                    <Select value={props.mapConfig.markerName} onChange={(value)=>{
                        let newmapConfig={...props.mapConfig}
                        newmapConfig.markerName=value
                        props.setmapConfig(newmapConfig)
                        }} className='my-1 w-100'>
                        {
                            props.fields.map((field)=>
                                <Option value={field} >{field}</Option>
                            )
                        }
                    </Select> 
                    <h5 className='my-2'>Текст во всплывающем окне</h5>
                    <Select value={props.mapConfig.markerDescription} onChange={(value)=>{
                        let newmapConfig={...props.mapConfig}
                        newmapConfig.markerDescription=value
                        props.setmapConfig(newmapConfig)
                        }} className='my-1 w-100'>
                        {
                            props.fields.map((field)=>
                                <Option value={field} >{field}</Option>
                            )
                        }
                    </Select> 

                </div> 
            : null}
        </div>
    )
}
