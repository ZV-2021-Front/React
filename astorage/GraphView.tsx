import React from "react";
import {Chart, Axis, Interval, Tooltip, Line, Point, Coordinate,Area,Schema,Interaction,View,Legend} from "bizcharts";
// import {DataView} from "@antv/data-set";

const DataView = require("@antv/data-set").DataView;

interface GraphViewProps {
  // id: string,
  currentXAxisName: string,
  currentYAxisName: string,
  currentGraph: string,
  currentColor: string,
  currentName: string,
  data: any
}

interface GraphViewState {
  renderGraph: any;
}

export default class GraphView extends React.Component<GraphViewProps, GraphViewState> {
  constructor(props: GraphViewProps) {
    super(props);

    this.state = {
      renderGraph: <Chart></Chart>,
    }
  }

  render() {
    let currentGraph = this.props.currentGraph;

    const data = [
      { year: '1951', sales: 13 },
      { year: '1952', sales: 52 },
      { year: '1956', sales: 61 },
      { year: '1957', sales: 45 },
      { year: '1958', sales: 48 },
      { year: '1959', sales: 59 },
      { year: '1960', sales: 37 },
      { year: '1962', sales: 67 },
      { year: '1964', sales: 45 },
      { year: '1966', sales: 52 },
      { year: '1969', sales: 61 },
      { year: '1972', sales: 45 },
      { year: '1975', sales: 48 },
      { year: '1976', sales: 45 },
      { year: '1980', sales: 75 },
      { year: '1982', sales: 39 },
      { year: '1986', sales: 31 },
      { year: '1988', sales: 52 },
      { year: '1991', sales: 61 },
      { year: '1993', sales: 45 },
      { year: '1997', sales: 48 },
      { year: '2003', sales: 54 },
      { year: '2008', sales: 28 },
      { year: '2012', sales: 45 },
    ];

    if (currentGraph === "barchart") {
      return (
        <div className="col p-5">
          <Chart height={300} autoFit data={data} >
            <Interval position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`} />
            <Tooltip shared />
          </Chart>
        </div>
      );
    } else if (currentGraph === "linechart") {
      return (
        <div className="col p-5">
          <Chart
            appendPadding={[10, 0, 0, 10]}
            autoFit
            height={500}
            data={data}
            onMouseleave={() => {
              debugger;
            }}
          >
            <Line position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`} />
            <Point position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`} />
            <Tooltip showCrosshairs follow={false} />
          </Chart>
        </div>
      );
    } else if (currentGraph === "radarchart") {
      return (
        <div className="col p-5">
          <Chart
            height={400}
            data={data}
            autoFit
            scale={{
              score: {
                min: 0,
                max: 80,
              }
            }}
            interactions={['legend-highlight']}
          >
            <Coordinate type="polar" radius={0.8} />
            <Tooltip shared />
            <Point
              position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`}
              color="user"
              shape="circle"
            />
            <Line
              position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`}
              color="user"
              size="2"
            />
            <Area
              position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`}
              color="user"
            />
            <Axis name={`${this.props.currentXAxisName}`} grid={{ line: { type: 'line' } }} />
            <Axis name={`${this.props.currentYAxisName}`} line={false} />
          </Chart>
        </div>
      );
    } else if (currentGraph === "dotchart") {
      console.log(this.props.data)
      return (
        <div className="col p-5">
          <Chart
            data={this.props.data}
            autoFit
            interactions={['legend-highlight']}
          >
            <Point
              position={`${this.props.currentXAxisName}*${this.props.currentYAxisName}`}
              color={(document.querySelector("#selectColor") as HTMLInputElement).value}
              style={{
                fillOpacity: 0.85
              }} />
          </Chart>
        </div>
      );
    } else if (currentGraph === "piechart") {
      const dv = new DataView();
      const dv1 = new DataView();

      dv.source(this.props.data).transform({
        type: 'percent',
        field: this.props.currentXAxisName,
        dimension: this.props.currentYAxisName,
        as: 'percent',
      });

      dv1.source(this.props.data).transform({
        type: 'percent',
        field: this.props.currentXAxisName,
        dimension: this.props.currentXAxisName,
        as: 'percent',
      });

      return (
        <div className="col p-5">
          <Chart
            height={400}
            data={dv.rows}
            autoFit
            scale={{
              percent: {
                formatter: (val: any) => {
                  val = (val * 100).toFixed(2) + '%';
                  return val;
                },
              }
            }}
          >
            <Coordinate type="theta" radius={0.5} />
            <Axis visible={false} />
            <Legend visible={false} />
            <Tooltip showTitle={false} />
            <Interval
              position={this.props.currentXAxisName}
              adjust="stack"
              color={this.props.currentName}
              element-highlight
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
              label={['type', {
                offset: -15,
              }]}
            />
            <View data={dv1.rows}>
              <Coordinate type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
              <Interval
                position={this.props.currentXAxisName}
                adjust="stack"
                color={[this.props.currentName, ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']]}
                element-highlight
                style={{
                  lineWidth: 1,
                  stroke: '#fff',
                }}
                label={this.props.currentName}
              />
            </View>
          </Chart>
        </div>
      );
    } else if (currentGraph === "ringchart") {
      return (
        <div className="col p-5">
          <Chart data={this.props.data} height={500} autoFit >
            <Coordinate type="theta" radius={0.8} innerRadius={0.75} />
            <Axis visible={false} />
            <Tooltip showTitle={false} />
            <Interval
              adjust="stack"
              position={this.props.currentXAxisName}
              color={this.props.currentYAxisName}
              shape="sliceShape"
            />
            <Interaction type="element-single-selected" />
          </Chart>
        </div>
      );
    } else if (currentGraph === "bubblechart") {
      
    }
    
    else {
      return (<div className="col p-5"><Chart height={300} autoFit data={data} >
        <Interval position={`${this.props.currentYAxisName}*${this.props.currentXAxisName}`} />
        <Tooltip shared />
      </Chart></div>);
    }
  }
}
