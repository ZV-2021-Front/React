import React from 'react'
import { Chart, Point, View, Tooltip, Schema, Axis, Interval, } from 'bizcharts';
import {finData} from '../data/FinData'

export const FinanceChart = ({data, colors, height, dataInfo}) => {
    const newData=[]
    finData.map((item)=>{
        let trend=(item.start <= item.end) ? 'Red' : 'Green'
        newData.push({
            time: item["time"],
            start: item["start"],
            max: item["max"],
            min: item["min"],
            end: item["end"],
            volumn: item["volumn"],
            money: item["money"],
            trend: trend,
            range: [item.start, item.end, item.max, item.min]
        })
    })
    return (
        <Chart
            height={height}
            padding={[10, 40, 40, 40]}
            data={newData}
            autoFit
            scale={{
                time: {
                type: 'timeCat',
                range: [0, 1],
                tickCount: 4,
                },
                
                volumn: { alias: 'volumn' },
                start: { alias: 'start' },
                end: { alias: 'end' },
                max: { alias: 'max' },
                min: { alias: 'min' },
                range: { alias: 'range' }
            }}
        >
            <Tooltip
                showTitle={false}
                showMarkers={true}
                itemTpl={'<li class="g2-tooltip-list-item" data-index={index}>'
                + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
                + '{name}{value}</li>'}
            />
            <View
            data={newData}
            region={{
                start: { x: 0, y: 0 },
                end: { x: 1, y: 0.7 },
            }}
            >
            <Schema
                position={'time*range'}
                shape={'candle'}
                color={[
                'trend', val => {
                    if (val === 'Red') {
                    return '#f04864';
                    }
            
                    if (val === 'Green') {
                    return '#2fc25b';
                    }
                }
                ]}
                tooltip={[
                    'time*start*end*max*min',
                    (time, start, end, max, min) => {
                    return {
                        name: time,
                        value: '<br><span style="padding-left: 16px">start：' + start + '</span><br/>'
                        + '<span style="padding-left: 16px">end：' + end + '</span><br/>'
                        + '<span style="padding-left: 16px">max：' + max + '</span><br/>'
                        + '<span style="padding-left: 16px">min：' + min + '</span>'
                    }}
                ]}
            />
            </View>
        </Chart>
    )
}
