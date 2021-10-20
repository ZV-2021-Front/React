import React from 'react'
import { DonutChart } from "bizcharts";

function RingChart({data, color, height, dataInfo}) {
    return (
        <DonutChart
            data={data}
            autoFit
            height={height}
            radius={0.8}
            padding="auto"
            angleField="y"
            colorField="x"
            pieStyle={{ stroke: "white", lineWidth: 5 }}
        />
    )
}

export default RingChart
