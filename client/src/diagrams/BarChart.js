import React from 'react'
import { Chart, Interval, Tooltip } from 'bizcharts';

const BarChart=({data, color, height, dataInfo})=>{

    return(
        <Chart height={height} autoFit data={data} interactions={['active-region']} padding={[30, 30, 30, 50]} >
            <Interval position="x*y" color={color}/>
            <Tooltip shared />
        </Chart>
    );
}

export default BarChart