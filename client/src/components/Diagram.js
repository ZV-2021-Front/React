import React, { useState, useEffect } from 'react';
import BarChart from '../diagrams/BarChart';
import { BubbleChart } from '../diagrams/BubbleChart';
import DotChart from '../diagrams/DotChart';
import { FinanceChart } from '../diagrams/FinanceChart';
import LineChart from '../diagrams/LineChart';
import { PieChart } from '../diagrams/PieChart';
import RadarChart from '../diagrams/RadarChart';
import RingChart from '../diagrams/RingChart';
import Map from '../diagrams/Map';
import RegionsMap from '../diagrams/Map';

const Diagram=({data, diagramType, colors, dataInfo, height, barChartStack, style, props})=>{
    if(diagramType=='Круговая диаграмма'){
        return <PieChart data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Линейный график'){
        return <LineChart data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Гистограмма'){
        return <BarChart data={data} colors={colors} dataInfo={dataInfo} height={height} barChartStack={barChartStack} style={style}/>
    }
    if(diagramType=='Лепестковая диаграмма'){
        return <RadarChart data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Биржевая диаграмма'){
        return <FinanceChart  data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Кольцевая диаграмма'){
        return <RingChart  data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Точечная диаграмма'){
        return <DotChart data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Пузырьковая диаграмма'){
        return <BubbleChart data={data} colors={colors} dataInfo={dataInfo} height={height} style={style}/>
    }
    if(diagramType=='Географическая карта'){
        return <Map props={{...props, data}} />
    }
    else {
        return <div style={{height: height}}></div>
    }
}
export default Diagram;