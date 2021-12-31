import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";

import GraphSetup from "./GraphSetup";
import GraphView from "./GraphView";
import { getTickMethod } from "@antv/scale";
import { selectOneCard } from "../client/src/http/diagramAPI";

interface GraphContainerState {
  axisNames: string[],
  supportGraphs: any[],
  currentGraph: string,
  currentXAxisName: string,
  currentYAxisName: string,
  data: object[],
  currentName: string,
  currentColor: string,
}

export default class GraphContainer extends React.Component<{}, GraphContainerState> {
  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      axisNames: [],
      supportGraphs: [],
      currentGraph: "",
      currentXAxisName: "",
      currentYAxisName: "",
      data: [],
      currentName: "",
      currentColor: ""
    };

    let id = location.pathname.replace("/view/", "");

    let request = selectOneCard(id);

    request.then(response => {
      let card = response.data.card;
      let graphs = [];

      for (let axisName in card.data[0]) {
        this.setState({ axisNames: [axisName, ...this.state.axisNames] });
      }

      for (let graph of card.graphTypes) {
        let graphId: string = "";
        let graphName: string = "";

        if (graph === "barchart") { //!
          graphId = "barchart";
          graphName = "Гистограмма";
        } else if (graph === "linechart") { //!
          graphId = "linechart";
          graphName = "Линейный график";
        } else if (graph === "radarchart") { //!
          graphId = "radarchart";
          graphName = "Лепестковая диаграмма";
        } else if (graph === "financechart") { 
          graphId = "financechart";
          graphName = "Биржевая диаграмма";
        } else if (graph === "piechart") { //!
          graphId = "piechart";
          graphName = "Круговая диаграмма";
        } else if (graph === "ringchart") { //!
          graphId = "ringchart";
          graphName = "Кольцевая диаграмма";
        } else if (graph === "dotchart") {
          graphId = "dotchart";
          graphName = "Точечная диаграмма";
        } else if (graph === "bubblechart") { //!
          graphId = "bubblechart";
          graphName = "Пузырьковая диаграмма";
        } else if (graph === "map") {
          graphId = "map";
          graphName = "Карта";
        }

        if (graphId && graphName) this.setState({ supportGraphs: [{ graphId, graphName }, ...this.state.supportGraphs] });
      }

      this.setState({ currentXAxisName: this.state.axisNames[0], currentYAxisName: this.state.axisNames[1], currentGraph: this.state.supportGraphs[0].graphId, data: card.data, currentColor: this.state.axisNames[0], currentName: this.state.axisNames[0] });
    });
  }

  render() {
    return (
      <div className="col p-5">
        <div className="container mt-2">
          <div className="border rounded mt-2" style={{ height: '600px', background: 'var(--bs-body-bg)', marginTop: '2%' }}>
            <div className="row">
              <GraphSetup
                axisNames={this.state.axisNames}
                supportGraphs={this.state.supportGraphs}
                currentGraph={this.state.currentGraph}
                currentXAxisName={this.state.currentXAxisName}
                currentYAxisName={this.state.currentYAxisName}
                updateSetup={this.updateSetup.bind(this)}
              />
              <GraphView 
                currentGraph={this.state.currentGraph} 
                currentXAxisName={this.state.currentXAxisName} 
                currentYAxisName={this.state.currentYAxisName} 
                data={this.state.data} 
                currentColor={this.state.currentColor}
                currentName={this.state.currentName}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  updateSetup() {
    let newGraphType = (document.querySelector("#selectGraph") as HTMLInputElement).value;
    let newXAxisName = (document.querySelector("#selectXAxisNames") as HTMLInputElement).value;
    let newYAxisName = (document.querySelector("#selectYAxisNames") as HTMLInputElement).value;
    let newName = (document.querySelector("#selectName") as HTMLInputElement).value;
    let newColor = (document.querySelector("#selectColor") as HTMLInputElement).value;

  

    this.setState({ currentGraph: newGraphType, currentXAxisName: newXAxisName, currentYAxisName: newYAxisName, currentName: newName, currentColor: newColor });
  }
}
