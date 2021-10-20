import React from 'react'
import { Chart, Line, Point, Tooltip,getTheme } from "bizcharts";

const LineChart=({data, color, height, dataInfo})=>{
    

    return(
        <Chart
				appendPadding={[10, 0, 0, 10]}
				autoFit
				height={height}
				data={data}
				scale={{ y: { min: 0, alias: dataInfo['yAxisName'], type: 'linear-strict' }, x: { range: [0, 1] } }}
			>

				<Line position="x*y" color={color}/>
				<Point position="x*y" color={color}/>
				<Tooltip showCrosshairs />
		</Chart>
    );
}
export default LineChart