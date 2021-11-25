import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Diagram from '../components/Diagram'
import ChartForm from '../components/ChartForm'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import Dashboard from '../data/Dashboard.json'

const ChartPage=()=>{
    moment.locale('ru')
    const[dataInfo, setDataInfo]=useState(
        {id: 1, xAxisName: '', yAxisName: [], yAxisNameRu: [], zAxisName: ''}
    )
    // {id: 1, x: '1991', y: 3, z: 10},
    // {id: 2, x: '1992', y: 4, z: 30},
    // {id: 3, x: '1993', y: 3.5, z: 20},
    // {id: 4, x: '1994', y: 5, z: 10},
    // {id: 5, x: '1995', y: 7, z: 10},
    // {id: 6, x: '1996', y: 4, z: 10},
    // {id: 7, x: '1997', y: 5, z: 10},
    const [data, setdata]=useState([])
    const [colors, setcolors] = useState(['#348EC5']);
    const height=500;
    const [diagramType, setDiagramType]=useState()
    let currentDashboard=null;
    // const [Dashboard, setDashboard] = useState(JSON.parse(fs.readFileSync("../data/Dashboard.json")))

    const {id}=useParams()
    useEffect(() => {
        currentDashboard=Dashboard.find((item)=>item.id==id)
        setDiagramType(currentDashboard.config.selectedDiagram)
    }, [])

    return(
        <Container fluid className="">
            <Row>
                <Col className="p-5 border border-dark col-xl-6 col-xxl-4"> 
                    <ChartForm diagramType={diagramType} setDiagramTypeFunction={setDiagramType} data={data} setData={setdata} setcolors={setcolors} colors={colors} dataInfo={dataInfo} setDataInfo={setDataInfo}/>
                </Col>
                <Col className="p-0 border border-dark col-xl-6 col-xxl-8"> 
                    <Diagram data={data} diagramType={diagramType} colors={colors} dataInfo={dataInfo} height={height}/>
                </Col>
            </Row>
        </Container>
    );
}
export default ChartPage;