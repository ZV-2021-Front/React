import React, { useState, useEffect } from 'react'
import { DatePicker, Dropdown, Button, Select, Radio, Space, Divider, Row, Col, Switch } from 'antd';
const { Option } = Select;
const { RangePicker } = DatePicker;
import { DropdownButton, Form } from 'react-bootstrap';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import moment from 'moment';
import { MapConfig } from './DiagramConfig/MapConfig';



export const ConfigDiagram = ({props}) => {
    const [linesCount, setlinesCount] = useState(1)
    const [isDatePickerEnable, setIsDatePickerEnable]=useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    let[titleX, setTitleX]=useState('')
    let[titleY, setTitleY]=useState('')
    const [dateFilter, setdateFilter] = useState('all')
    const [periodFilter, setperiodFilter] = useState('year')

    const diagramList=[
        'Линейный график',
        'Гистограмма',        
        'Круговая диаграмма',
        'Лепестковая диаграмма',
        'Биржевая диаграмма',
        'Кольцевая диаграмма',
        'Точечная диаграмма',
        'Пузырьковая диаграмма',
        'Географическая карта'
    ]

    useEffect(() => {
        formatDateForPostgres()
    }, [dateFilter, periodFilter, startDate, endDate])
    
    function formatDateForPostgres(){
        if(dateFilter=='all'){
            props.setfilterDate('all')
            return
        }
        if(dateFilter=='last'){
            if(periodFilter=='year'){
                props.setfilterDate(moment().subtract(1, 'year').format('YYYY-MM-DD')+','+moment().format('YYYY-MM-DD'))
                return
            }
            if(periodFilter=='month'){
                props.setfilterDate(moment().subtract(1, 'month').format('YYYY-MM-DD')+','+moment().format('YYYY-MM-DD'))
                return
            }
            if(periodFilter=='week'){
                props.setfilterDate(moment().subtract(1, 'week').format('YYYY-MM-DD')+','+moment().format('YYYY-MM-DD'))
                return
            }
        }
        else{
            if(startDate==null || endDate==null){
                props.setfilterDate('all')
                return
            }
            props.setfilterDate(startDate.format('YYYY-MM-DD')+','+endDate.format('YYYY-MM-DD'))
            return
        }
    }
    
    return (
        <div style={{paddingLeft: 25}}>
            {/* <DataTable data={data} setData={setData} setDiagramTypeFunction={setDiagramTypeFunction} diagramType={dropDown.props.title}/> */}

            <h5>Настройки диаграммы</h5>
            <Select value={props.diagramType} onChange={(value)=>{props.setDiagramType(value)}} style={{width: 200}}>
                {
                    diagramList.map((diagram)=>
                        <Option value={diagram} >{diagram}</Option>
                    )
                }
            </Select>

            {props.diagramType=='Географическая карта' ?
                <MapConfig props={{...props}} />
                :
                <div>
                    {props.diagramType=='Гистограмма' ? <p style={{fontSize: 16, marginTop: 20}}><Switch checked={props.barChartStack} onChange={(checked)=>{props.setbarChartStack(checked)}} />  Накладывать столбцы друг на друга</p> : null}
                    <p/>
                    <p style={{fontSize: 16, marginTop: 20}}><Switch checked={props.groupDataByX} onChange={(checked)=>{props.setgroupDataByX(checked)}} />  Группировать данные</p>
                    <h5>Ось Х</h5>
                    <Select onChange={(value)=>{
                        // let values=value.toString().split('/')
                        // props.setXAxisNameRu(values[1])
                        props.setXAxisName(value)
                        }} style={{width: '100%'}}>
                        {
                            props.fields.map((field)=>
                                <Option value={field} >{field}</Option>
                            )
                        }
                    </Select>        
                    <p/>
                    {/* СПИСОК ЛИНИЙ */}
                    <Button onClick={()=>{props.setYAxisName([...props.yAxisName, ''])}} >Добавить линию</Button>
                    {props.yAxisName.map((item, index)=><div>
                        <p/>
                        <Divider orientation="left" style={{borderTopColor: '#555'}}>Линия {index+1} Ось У</Divider>
                        <Select onChange={(value)=>{
                            // let values=value.toString().split('/')

                            let newyAxisName=[...props.yAxisName]
                            newyAxisName[index]=value
                            props.setYAxisName(newyAxisName)

                            // let newyAxisNameRu=[...props.yAxisNameRu]
                            // newyAxisNameRu[index]=values[1]
                            // props.setYAxisNameRu(newyAxisNameRu)
                            }} style={{width: '100%'}}>
                            {
                                props.fields.map((field)=>
                                    <Option value={field} >{field}</Option>
                                )
                            }
                        </Select>    
                        <p/>
                        <h5>Цвет диаграммы</h5>
                        <Row>
                            <Col span='12' >
                                <Form.Control
                                    type="color"
                                    value={props.colors[index]}
                                    onChange={(e)=>{
                                        let newcolors=props.colors
                                        newcolors[index]=e.target.value
                                        props.setcolors([...newcolors])}}
                                    style={{
                                        width: '50px',
                                        height: '40px',
                                        padding: '5px'
                                    }}
                                />
                            </Col>
                            <Col span='12' >
                                <Button onClick={()=>{
                                    let newyAxisName=[...props.yAxisName]
                                    newyAxisName.splice(index, 1)
                                    props.setYAxisName(newyAxisName)

                                    let newcolors=props.colors
                                    newcolors.splice(index, 1)
                                    props.setcolors([...newcolors])
                                }}>Удалить линию</Button>
                            </Col>
                        </Row>
                    </div>)}
                    <p/>
                    {/* <Form.Check type="checkbox">
                        <Form.Check.Input type="checkbox" checked={isDatePickerEnable} onChange={()=>{setIsDatePickerEnable(!isDatePickerEnable)}} />
                        <FormCheckLabel onClick={()=>{setIsDatePickerEnable(!isDatePickerEnable)}} >Сортировать по дате</FormCheckLabel>
                    </Form.Check> */}
                </div>
            }  
            <h5>Фильтр по дате</h5>
            <Radio.Group onChange={(e)=>{setdateFilter(e.target.value)}} value={dateFilter}>
                <Space direction="vertical">
                    <Radio value={'all'}>За всё время</Radio>
                    <Radio value={'last'}>
                        За последний(ую):  
                        <Radio.Group onChange={(e)=>{setperiodFilter(e.target.value)}} value={periodFilter} >
                            <Radio.Button disabled={dateFilter!="last"} value="year">Год</Radio.Button>
                            <Radio.Button disabled={dateFilter!="last"} value="month">Месяц</Radio.Button>
                            <Radio.Button disabled={dateFilter!="last"} value="week">Неделю</Radio.Button>
                        </Radio.Group>
                    </Radio>
                    <Radio value={'custom'}>Свой период:</Radio><br/>
                </Space>
            </Radio.Group>
            {dateFilter=='custom' ? <RangePicker value={[startDate, endDate]} onChange={(dates)=>{
                setStartDate(dates[0]);
                setEndDate(dates[1])
                }} /> : null}
        </div>
        
    )
}