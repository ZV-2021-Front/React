import React from 'react'
import { Chart, Line, Point, Tooltip,getTheme, Axis } from "bizcharts";

const LineChart=({data, colors, height, dataInfo})=>{
    
	let scale={x: { range: [0, 1], alias: dataInfo['xAxisName'] }, y: { min: 0, alias: 'Значение', type: 'linear-strict' }}
	// dataInfo.yAxisName.map((item,index)=>{
	// 	scale[dataInfo.yAxisName[index]]= { min: 0, alias: dataInfo['yAxisNameRu'][index], type: 'linear-strict' }
	// })
    return(
        <Chart
				appendPadding={[10, 0, 0, 10]}
				autoFit
				height={height}
				data={data}
				scale={scale}
			>
				{/* <Axis name="x" visible={true} title />
				<Axis name="y" visible={true} title /> */}
				{/* <Line position={`x*${dataInfo.yAxisName[0]}`} color={colors[0]}/>
				<Point position={`x*${dataInfo.yAxisName[0]}`} color={colors[0]}/> */}
				<Line position={'x*y'} color={{fields: ['type'], values: colors}}/>
				<Point position={'x*y'} color={{fields: ['type'], values: colors}}/>
				<Tooltip showCrosshairs />
		</Chart>
    );
}
export default LineChart