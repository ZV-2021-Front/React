import React, { useState, useEffect } from 'react'
import {Container, DropdownButton, Dropdown, Form, Button} from 'react-bootstrap'
import { fetchColumns, fetchXY } from '../http/diagramAPI'
import { DataTable } from './DataTable'

const ChartForm=({setDiagramTypeFunction, data, setData})=>{
    let [title, setTitle]=useState('Линейный график')
    let[titleX, setTitleX]=useState('')
    let[titleY, setTitleY]=useState('')
    let [xAxisName, setXAxisName]=useState('x')
    let [yAxisName, setYAxisName]=useState('y')
    let [fields, setFields]=useState([])
    
    useEffect(()=>{
        fetchXY({params: {xAxisField: xAxisName, yAxisField: yAxisName, products: 'all'}}).then((data)=>{
            setData(data['data'].map(item=>
                ({x: item[xAxisName], y: item[yAxisName]})))
        })
    },[xAxisName, yAxisName])
    useEffect(()=>{
        fetchColumns({params:{}}).then((data)=>{
            setFields(data['data'])
        })
    },[])
    const dropDown=
        <DropdownButton id="dropdown-basic-button" title={title}>
            <Dropdown.Item onClick={()=>{
                setTitle('Линейный график');
                setDiagramTypeFunction('Линейный график');
            }}>Линейный график</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Круговая диаграмма');
                setDiagramTypeFunction('Круговая диаграмма');
            }}>Круговая диаграмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Гистограмма');
                setDiagramTypeFunction('Гистограмма');
            }}>Гистограмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Лепестковая диаграмма');
                setDiagramTypeFunction('Лепестковая диаграмма');
            }}>Лепестковая диаграмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Биржевая диаграмма');
                setDiagramTypeFunction('Биржевая диаграмма');
            }}>Биржевая диаграмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Кольцевая диаграмма');
                setDiagramTypeFunction('Кольцевая диаграмма');
            }}>Кольцевая диаграмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Точечная диаграмма');
                setDiagramTypeFunction('Точечная диаграмма');
            }}>Точечная диаграмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Пузырьковая диаграмма');
                setDiagramTypeFunction('Пузырьковая диаграмма');
            }}>Пузырьковая диаграмма</Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                setTitle('Географическая карта');
                setDiagramTypeFunction('Географическая карта');
            }}>Географическая карта</Dropdown.Item>
        </DropdownButton>
    
    const dropDownFieldsX=
        <DropdownButton id="dropdown-basic-button2" title={titleX}>
        {
            fields.map(field=>
                (
                    <Dropdown.Item onClick={()=>{
                        setTitleX(field['field_ru']);
                        setXAxisName(field['field']);
                    }}>{field['field_ru']}</Dropdown.Item> 
                )
            )
        }
        </DropdownButton>
    const dropDownFieldsY=
        <DropdownButton id="dropdown-basic-button2" title={titleY}>
        {
            fields.map(field=>
                (
                    <Dropdown.Item onClick={()=>{
                        setTitleY(field['field_ru']);
                        // setTimeout(()=>setYAxisName(field['field']), 1000)
                        // setTimeout(()=>makeRequest(), 1000)
                        setYAxisName(field['field']);
                        //makeRequest();
                    }}>{field['field_ru']}</Dropdown.Item> 
                )
            )
        }
        </DropdownButton>
    return(
        <div>
            <h5>Выберите вид графика:</h5>
            {dropDown}
            <p/>
            <h5>Поле Х</h5>
            {dropDownFieldsX}
            <h5>Поле У</h5>
            {dropDownFieldsY}
            {/* <DataTable data={data} setData={setData} setDiagramTypeFunction={setDiagramTypeFunction} diagramType={dropDown.props.title}/> */}
        </div>
    );
}
export default ChartForm;