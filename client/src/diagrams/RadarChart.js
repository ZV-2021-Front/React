import React, { useState, useEffect } from 'react';
import {Chart,Point,Line,Axis,Area,Tooltip,Coordinate} from 'bizcharts';
import DataSet from '@antv/data-set';

const RadarChart=({data, colors, height, dataInfo})=>{

    const { DataView } = DataSet;
    const dv = new DataView().source(data);
    dv.transform({
        type: 'fold',
        fields: ['y'],
        key: 'user',
        value: 'score',
    });
    return(
        <Chart
            height={400}
            data={dv.rows}
            autoFit
            scale={{
                score:{
                    min: 0,
                    //max: 10,
                }
            }}
            interactions={['legend-highlight']}
        >
            <Coordinate type="polar" radius={0.8} />
            <Tooltip shared />
            <Point
                position="x*score"
                color="x"
                shape="circle"
            />
            <Line
                position="x*score"
                color="x"
                size="2"
            />
            <Area
                position="x*score"
                color="user"
            />
            <Axis name="score" grid={{ line: {type: 'line'}}} />
            <Axis name="y" line={false} />
        </Chart> 
    )
}

export default RadarChart

