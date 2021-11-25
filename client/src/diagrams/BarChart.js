import React from 'react'
import { Chart, Interval, Tooltip, Axis } from 'bizcharts';

const BarChart=({data, colors, height, dataInfo})=>{

    return(
        <Chart height={height} autoFit data={data} interactions={['active-region']} padding={[30, 30, 30, 50]} 
        	scale={{x: {alias: dataInfo['xAxisNameRu']}, y: {alias: dataInfo['yAxisNameRu']}} }
		>
			<Axis name="x" visible={true} title />
			<Axis name="y" visible={true} title />
            <Interval position="x*y" color={{fields: ['type'], values: colors}}/>
            <Tooltip shared />
        </Chart>
    );
}

export default BarChart