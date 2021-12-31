import React from 'react'
import {Chart, Point, Axis} from 'bizcharts';

const DotChart=({data, colors, height, dataInfo})=>{

    let scale={x: { range: [0, 1], alias: dataInfo['xAxisName'] }, y: { min: 0, alias: 'Значение', type: 'linear-strict' }}

    return(
        <Chart
			height={height}
			data={data}
			autoFit
			scale={scale}
			appendPadding={[10, 0, 0, 10]}
		>
			<Axis name="x" visible={true} title />
			<Axis name="y" visible={true} title />
			<Point position={'x*y'} color={{fields: ['type'], values: colors}} shape="circle" style={{fillOpacity: 0.85}} />

		</Chart>
    )
}

export default DotChart