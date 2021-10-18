import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';

const BarChart=({data, colors, height, dataInfo})=>{

    return(
        <Chart height={height} autoFit data={data} interactions={['active-region']} padding={[30, 30, 30, 50]} >
            <Interval position="x*y" color={colors[0]}/>
            <Tooltip shared />
        </Chart>
    );
}

export default BarChart