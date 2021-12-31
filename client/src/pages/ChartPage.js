import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Diagram from '../components/Diagram'
import ChartForm from '../components/ChartForm'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import Dashboard from '../data/Dashboard.json'
import { selectOneCard } from '../http/diagramAPI'

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
    const [serverData, setserverData] = useState([]);
    const [colors, setcolors] = useState(['#348EC5']);
    const height=700;
    const [diagramType, setDiagramType]=useState()
    const [mapConfig, setmapConfig] = useState({mapBackground: 'Улицы', colorStops: [[0, '#000']] });
    const [barChartStack, setbarChartStack] = useState(false);
    const [groupDataByX, setgroupDataByX] = useState(false);

    const {id}=useParams()
    useEffect(() => {
        selectOneCard(id).then(response=>{
            setserverData(JSON.parse(response.data.replace('\\', '')).data)
        })
    }, [])

    useEffect(() => {
        let oldDiagramType=diagramType
        setDiagramType('')
        setTimeout(()=>{
            setDiagramType(oldDiagramType)
        }, 10)
    }, [groupDataByX, barChartStack]);

    return(
        <Container fluid className="">
            <Row>
                <Col className="p-5 col-xl-6 col-xxl-4" style={{height: document.documentElement.scrollHeight}}> 
                    <ChartForm props={{barChartStack, setbarChartStack, groupDataByX, setgroupDataByX, mapConfig, setmapConfig}} diagramType={diagramType} setDiagramType={setDiagramType} data={data} setData={setdata} serverData={serverData} setcolors={setcolors} colors={colors} dataInfo={dataInfo} setDataInfo={setDataInfo} />
                </Col>
                <Col className="p-0 col-xl-6 col-xxl-8"> 
                    <Diagram data={data} diagramType={diagramType} props={{mapConfig}} colors={colors} dataInfo={dataInfo} height={height} barChartStack={barChartStack}/>
                </Col>
            </Row>
        </Container>
    );
}
export default ChartPage;