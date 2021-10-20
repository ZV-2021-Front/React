import React, { useState } from 'react'
import BarChart from '../diagrams/BarChart';
import { BubbleChart } from '../diagrams/BubbleChart';
import DotChart from '../diagrams/DotChart';
import { FinanceChart } from '../diagrams/FinanceChart';
import LineChart from '../diagrams/LineChart';
import { PieChart } from '../diagrams/PieChart';
import RadarChart from '../diagrams/RadarChart';
import RingChart from '../diagrams/RingChart';

const Diagram=({data, diagramType, color, dataInfo, height})=>{
    const[st,setSt]=useState(Math.random())
    if(diagramType=='Круговая диаграмма'){
        return(
            <PieChart data={data} color={color} dataInfo={dataInfo} height={height}/>
            );
    }
    if(diagramType=='Линейный график'){
        return(
            <LineChart data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Гистограмма'){
        return(
            <BarChart data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Лепестковая диаграмма'){
        return(
            <RadarChart data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Биржевая диаграмма'){
        return(
            <FinanceChart  data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Кольцевая диаграмма'){
        return(
            <RingChart  data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Точечная диаграмма'){
        return(
            <DotChart data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Пузырьковая диаграмма'){
        return(
            <BubbleChart data={data} color={color} dataInfo={dataInfo} height={height}/>
        );
    }
    if(diagramType=='Географическая карта'){
        return(
            <div/>
        );
    }
    return(
        <div>Empty chart</div>
    );
}
export default Diagram;