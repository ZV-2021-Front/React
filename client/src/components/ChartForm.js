import React, { useState, useEffect } from 'react'
import {Container, DropdownButton, Dropdown, Form, Button} from 'react-bootstrap'
import { fetchColumns, fetchFinance, fetchXY } from '../http/diagramAPI'
import { DatePicker, PageHeader} from 'antd';
import moment from 'moment';
import Cases from '../data/Cases.json'
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import { MenuCases } from './MenuCases';
import { ConfigDiagram } from './ConfigDiagram';
import productionDataSet from '../data/productionDataSet.json'

const ChartForm=({diagramType, setDiagramTypeFunction, data, setData, setcolors, colors, dataInfo, setDataInfo})=>{
    moment.locale('ru')

    let [xAxisName, setXAxisName]=useState([])
    let [yAxisName, setYAxisName]=useState([''])
    let [xAxisNameRu, setXAxisNameRu]=useState([])
    let [yAxisNameRu, setYAxisNameRu]=useState([])
    let [fields, setFields]=useState([])
    const [filterDate, setfilterDate] = useState('all')

    const configDiagramProps={
        fields,
        setfilterDate,
        colors,
        setcolors,
        xAxisName,
        yAxisName,
        xAxisNameRu,
        yAxisNameRu,
        setXAxisName,
        setYAxisName,
        setXAxisNameRu,        
        setYAxisNameRu,
        setDiagramTypeFunction,
        diagramType
    }

    useEffect(() => {
        let newFields=[]
        productionDataSet.columns.map((item)=>{
            newFields.push({name: item})
        })
        productionDataSet.columnsRu.map((item, index)=>{
            newFields[index].nameRu=item
        })
        setFields(newFields)
    }, [])

    useEffect(()=>{
        setDataInfo({xAxisName: xAxisNameRu, yAxisName: yAxisName, yAxisNameRu: yAxisNameRu})
        if(diagramType=='Биржевая диаграмма'){
            fetchFinance().then((data)=>{
                setData(data['data'])
            })
            return
        }
        else{
            // fetchXY({params: {xAxisField: xAxisName, yAxisField: yAxisName, products: 'all', date: filterDate }}).then((data)=>{
            //     setData(data['data'].map(item=>
            //         ({x: item[xAxisName], y: item[yAxisName]})))
            //     })
            // setData(productionDataSet['data'].map(item=>{
            //     let newitem={x: item[xAxisName]}
            //     yAxisName.map((yAxisItem)=>{
            //         let y=0;
            //         if(item[yAxisItem]!=undefined){
            //             y=item[yAxisItem].split(' ')[0]
            //             y=y.replaceAll('%', '')
            //             y=parseInt(y, 10)
            //         }
            //         newitem[yAxisItem]= y
            //     })
            //     return newitem
            // }))
            let newData=[]
            productionDataSet['data'].map(item=>{
                yAxisName.map((yAxisItem)=>{
                    let newitem={x: item[xAxisName], type: yAxisItem}
                    let y=0;
                    if(item[yAxisItem]!=undefined){
                        y=item[yAxisItem].split(' ')[0]
                        y=y.replaceAll('%', '')
                        y=parseInt(y, 10)
                    }
                    newitem.y=y
                    newData.push(newitem)
                })
            })
            setData(newData)

        }
    },[xAxisName, yAxisName, filterDate, diagramType])
    // useEffect(()=>{
    //     fetchColumns({params:{}}).then((data)=>{
    //         setFields(data['data'])
    //     })
    // },[])
    // useEffect(() => {
    //     if(selectedCase!=null){
    //         if(typeof selectedCase.options.xAxisName != undefined){
    //             if(Array.isArray(selectedCase.options.xAxisName))
    //             {
    //                 setXAxisName(selectedCase.options.xAxisName[0])
    //                 setXAxisNameRu(selectedCase.locale.xAxisNameRu[0])
    //             }
    //             else {
    //                 setXAxisName(selectedCase.options.xAxisName)
    //                 setXAxisNameRu(selectedCase.locale.xAxisNameRu)
    //             }
    //         }
    //         else setXAxisName(null)

    //         if(typeof selectedCase.options.yAxisName != undefined){
    //             if(Array.isArray(selectedCase.options.yAxisName))
    //             {
    //                 setYAxisName(selectedCase.options.yAxisName[0])
    //                 setYAxisNameRu(selectedCase.locale.yAxisNameRu[0])
    //             }
    //             else {
    //                 setYAxisName(selectedCase.options.yAxisName)
    //                 setYAxisNameRu(selectedCase.locale.yAxisNameRu)
    //             }
    //         }
    //         else setYAxisName(null)

    //         setDiagramTypeFunction(selectedCase.diagrams[0])
    //     }
    // }, [selectedCase])
    // const dropDown=
    //     <DropdownButton id="dropdown-basic-button" title={title}>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Линейный график');
    //             setDiagramTypeFunction('Линейный график');
    //         }}>Линейный график</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Круговая диаграмма');
    //             setDiagramTypeFunction('Круговая диаграмма');
    //         }}>Круговая диаграмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Гистограмма');
    //             setDiagramTypeFunction('Гистограмма');
    //         }}>Гистограмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Лепестковая диаграмма');
    //             setDiagramTypeFunction('Лепестковая диаграмма');
    //         }}>Лепестковая диаграмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Биржевая диаграмма');
    //             setDiagramTypeFunction('Биржевая диаграмма');
    //         }}>Биржевая диаграмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Кольцевая диаграмма');
    //             setDiagramTypeFunction('Кольцевая диаграмма');
    //         }}>Кольцевая диаграмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Точечная диаграмма');
    //             setDiagramTypeFunction('Точечная диаграмма');
    //         }}>Точечная диаграмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Пузырьковая диаграмма');
    //             setDiagramTypeFunction('Пузырьковая диаграмма');
    //         }}>Пузырьковая диаграмма</Dropdown.Item>
    //         <Dropdown.Item onClick={()=>{
    //             setTitle('Географическая карта');
    //             setDiagramTypeFunction('Географическая карта');
    //         }}>Географическая карта</Dropdown.Item>
    //     </DropdownButton>
    
    return(
        <div>
            <PageHeader title='Окно диаграммы' onBack={()=>{window.history.back()}} style={{padding: '0'}} />
            <p/>
            {/* <MenuCases selectedCase={selectedCase} setselectedCase={setselectedCase} cases={require('../data/Cases.json')} /> */}
            <p/>
            <ConfigDiagram props={configDiagramProps}/>
        </div>
    );
}
export default ChartForm;