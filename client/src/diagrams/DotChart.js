import React from 'react'
import {Chart, Point} from 'bizcharts';

const DotChart=({data, color, height, dataInfo})=>{
    
    return(
        <Chart
			height={height}
			data={data}
			autoFit
			interactions={['legend-highlight', 'brush']}
		>
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