import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Diagram from '../components/Diagram'
import ChartForm from '../components/ChartForm'
import { fetchDataPrice } from '../http/diagramAPI'

const colors=['#8884d8',"#83a6ed","#8dd1e1","#82ca9d","#a4de6c","#d0ed57"];

const ChartPage=observer(()=>{
    const[dataInfo, setDataInfo]=useState(
        {id: 1, xAxisName: 'year', yAxisName: 'value', zAxisName: 'zValue'}
    )
    // {id: 1, x: '1991', y: 3, z: 10},
    // {id: 2, x: '1992', y: 4, z: 30},
    // {id: 3, x: '1993', y: 3.5, z: 20},
    // {id: 4, x: '1994', y: 5, z: 10},
    // {id: 5, x: '1995', y: 7, z: 10},
    // {id: 6, x: '1996', y: 4, z: 10},
    // {id: 7, x: '1997', y: 5, z: 10},
    const [data, setData]=useState([])
    const height=500;
    const [diagramType, setDiagramType]=useState('Линейный график')

    // useEffect(()=>{
    //     fetchDataPrice({params: {xAxisField: 'date', yAxisField: 'price', products: 'яблоко'}}).then((data)=>{
    //         setData(data['data'].map(item=>
    //             ({x: item['date'], y: item['price']})
    //         ))
    //     })
    // },[])

    return(
        <Container fluid className="">
            <Row>
                <Col className="p-5 border border-dark" style={{width: '49%'}}>
                    <ChartForm setDiagramTypeFunction={setDiagramType} data={data} setData={setData}/>
                </Col>
                <Col className="p-5 border border-dark"  style={{width: '49%'}}>
                    <Diagram data={data} diagramType={diagramType} colors={colors} dataInfo={dataInfo} height={height}/>
                </Col>
            </Row>
        </Container>
    );
})
export default ChartPage;