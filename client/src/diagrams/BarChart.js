import React, { useState, useEffect } from 'react';
import { Chart, Interval, Tooltip, Axis } from 'bizcharts';

const BarChart=({data, colors, height, dataInfo, barChartStack})=>{

    return(
        <Chart height={height} autoFit data={data} interactions={['active-region']} padding={[50, 50, 50, 60]} 
        	scale={{x: {alias: dataInfo['xAxisNameRu']}, y: {alias: dataInfo['yAxisNameRu']}} }
		>
			<Axis name="x" visible={true} />
			<Axis name="y" visible={true} />
            <Interval position="x*y" color={{fields: ['type'], values: colors}} adjust={[
					{
                        type: barChartStack ? 'stack' : 'dodge',
                        marginRatio: 0,
                        dodgeBy: 'type'
                    }
				]}/>
            <Tooltip shared />
        </Chart>
    );
}

export default BarChart