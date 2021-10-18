import React from 'react'
import {Chart, Point, Legend, Axis } from 'bizcharts';

export const BubbleChart = ({data, colors, height, dataInfo}) => {
    return (
        <Chart
            height={400}
            data={data}
            autoFit
            //scale={scale}
            interactions={['element-active']}
        >
            <Legend name={'zAxisName'} visible={false} />
            <Point
                position="x*y"
                color={ data['x']}
                // color={["continent", val => {
                //     return colorMap[val];
                // }]}
                opacity={0.65}
                shape="circle"
                size={["z", [10, 40]]}
                style={{
                    lineWidth: 1,
                    strokeOpacity: 1,
                    fillOpacity: 0.3,
                    opacity: 0.65,
                    stroke: data['x'],
                }}
            />
            <Axis name={dataInfo['xAxisName']} grid={{
                line: {
                    style: {
                        stroke: '#e3e3e3'
                    }
                }
            }} />
            <Axis name={dataInfo['xAxisName']} grid={{
                line: {
                    style: {
                        stroke: '#e3e3e3'
                    }
                }
            }} />
	    </Chart>
    )
}
