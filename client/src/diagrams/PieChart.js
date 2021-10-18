import React from 'react'
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	Interaction,
	getTheme
} from 'bizcharts';

export const PieChart = ({data, colors, height, dataInfo}) => {
    return (
        <Chart
            height={height} 
            data={data} 
            scale={{y: { range: [0, 1]}}} 
            autoFit onIntervalClick={e=>{
			    const states = e.target.cfg.element.getStates();
		}}>
			<Coordinate type="theta" radius={0.75} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="y"
				adjust="stack"
				color={'x'}
				style={{
					lineWidth: 1,
					stroke: '#fff',
				}}
				label={['y', {
					layout: { type: 'limit-in-plot', cfg: { action: 'ellipsis' } },
					content: (data) => {
						return `${data.x}: ${data.y}`;
					},
				}]}
				state={{
					selected: {
						style: (t) => {
							const res = getTheme().geometries.interval.rect.selected.style(t);
							return { ...res, fill: 'red' }
						}
					}
				}}
			/>
			<Interaction type='element-single-selected' />
		</Chart>
    )
}