import React, { useState, useEffect } from 'react'
import {Container, DropdownButton, Dropdown, Form, Button} from 'react-bootstrap'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import { fetchColumns, fetchXY } from '../http/diagramAPI'

const ChartForm=({setDiagramTypeFunction, data, setData})=>{
    let [title, setTitle]=useState('Линейный график')
    let[titleX, setTitleX]=useState('')
    let[titleY, setTitleY]=useState('')
    let [xAxisName, setXAxisName]=useState('x')
    let [yAxisName, setYAxisName]=useState('y')
    let [fields, setFields]=useState([])
    function refreshDiagrams(){
        setDiagramTypeFunction(' ')
        setTimeout(()=>setDiagramTypeFunction(dropDown.props.title), 1)
    }
    function onBeforeSaveCell(row, cellName, cellValue) {
        return true;
    }  
    function onAfterSaveCell(row, cellName, cellValue) {
        refreshDiagrams()
    }
    const cellEditProp = {
        mode: 'click',
        blurToSave: true,
        beforeSaveCell: onBeforeSaveCell,
        afterSaveCell: onAfterSaveCell 
    };
    function onAfterInsertRow(row) {
        const newData=data
        newData.push({id: data[data.length-1].id+1, name: row['name'], value: row['value']})
        setData(newData)
        refreshDiagrams()
    }
    function onAfterDeleteRow(rowKeys) {
        const newData=data
        rowKeys.map((rowKey)=>{
            newData.map((item)=>{
                if(item['id']==rowKey){
                    newData.splice(newData.indexOf(item),1)
                }
            })
        })
        setData(newData)
        refreshDiagrams()
    }
    const options = {
        afterInsertRow: onAfterInsertRow,
        afterDeleteRow: onAfterDeleteRow
    };
    const selectRowProp = {
        mode: 'checkbox'
    };
    function makeRequest(){
        fetchXY({params: {xAxisField: xAxisName, yAxisField: yAxisName, products: 'яблоко'}}).then((data)=>{
            setData(data['data'].map(item=>
                ({x: item[xAxisName], y: item[yAxisName]})
                //({x: Object.keys(item)[0], y: Object.keys(item)[1]})
            ))
        })
    }
    function makeFieldRequest(){
        fetchColumns({params:{}}).then((data)=>{
            setFields(data['data'])
        })
        dropDownFieldsXItems=[]
        fields.map((field)=>{
            dropDownFieldsXItems.push(
                <Dropdown.Item onClick={()=>{
                    setTitleX(field['field_ru']);
                    setXAxisName(field['field']);
                }}>field['field_ru'</Dropdown.Item> 
            )
        })
    }
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
    const bootstrapTable=
        <BootstrapTable data={ data } cellEdit={ cellEditProp } insertRow={ true } deleteRow={ true } selectRow={ selectRowProp} options={ options }>
            <TableHeaderColumn dataField='id' width='0' isKey editable={ false } autoValue={ true }>Id</TableHeaderColumn>
            <TableHeaderColumn dataField='x'>Название</TableHeaderColumn>
            <TableHeaderColumn dataField='y'>Значение</TableHeaderColumn>
        </BootstrapTable>
    let dropDownFieldsXItems=[];   
    const dropDownFieldsX=
    <DropdownButton id="dropdown-basic-button2" title={xAxisName}>
        {dropDownFieldsXItems}
    </DropdownButton>
    // <button onClick={fetchData}>Загрузить данные</button>
    return(
        <div>
            <h5>Выберите вид графика:</h5>
            {dropDown}
            <p/>
            <Form>
                <Form.Label>xAxisName</Form.Label>
                <Form.Control type="text" onChange={(e)=>{setXAxisName(e.target.value)}}/>
                <Form.Label>yAxisName</Form.Label>
                <Form.Control type="text" onChange={(e)=>{setYAxisName(e.target.value)}}/>
                <p/>
                <Button onClick={makeFieldRequest}>Вызвать поля</Button>
                <p/>
                <Button onClick={makeRequest}>Сделать запрос</Button>
                <p/>
            </Form>
            {dropDownFieldsX}
            <h5>Таблица значений</h5>
            {bootstrapTable}
        </div>
    );
}
export default ChartForm;