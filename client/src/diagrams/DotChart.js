import React from 'react'
import {Chart, Point, Axis} from 'bizcharts';

const DotChart=({data, color, height, dataInfo})=>{
    
    return(
        <Chart
			height={height}
			data={data}
			autoFit
			scale={{x: {alias: dataInfo['xAxisName']}, y: {alias: dataInfo['yAxisName']}} }
			padding={50}
		>
			<Axis name="x" visible={true} title />
			<Axis name="y" visible={true} title />
			<Point
				position="x*y"
				color={color}
				shape="circle"
				style={{
					fillOpacity: 0.85
				}} />
		</Chart>
    )
}

export default DotChart