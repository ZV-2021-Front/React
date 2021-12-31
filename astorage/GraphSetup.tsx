import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

interface GraphSetupProps {
  updateSetup: any,
  axisNames: string[]
  supportGraphs: any
  currentGraph: any
  currentXAxisName: any
  currentYAxisName: any
};


export default class GraphSetup extends React.Component<GraphSetupProps> {
  constructor(props: GraphSetupProps) {
    super(props);


  }

  componentDidMount() {
    this.props.updateSetup();
  }

  render() {
    return (
      <div className="col p-5">
        <form>
          <div className="row align-items-center mb-3">
            <h5 className="col text-primary">Общее</h5>
            <div className="col">
              <label>Название виртуализации:</label>
              <input type="text" className="form-control" placeholder="Виртуализация 1" />
            </div>
          </div>
          <div className="form-group mb-3">
            <label>Тип визуализации:</label>
            <select className="form-select">
              <option value="diagram" selected>Диаграмма</option>
            </select>
          </div>
          <h5 className="text-primary">Настройки:</h5>
          <div className="form-group">
            <label>Тип диаграммы:</label>
            <select className="form-select mb-2" id="selectGraph" onChange={this.props.updateSetup}>
              {this.props.supportGraphs.map((graph: any) => {
                if (graph.graphId === this.props.currentGraph) {
                  return <option selected value={graph.graphId}>{graph.graphName}</option>;
                } else {
                  return <option value={graph.graphId}>{graph.graphName}</option>;
                }
              })}

            </select>
            <label>Имя:</label>
            <select className="form-select mb-2" id="selectName" onChange={this.props.updateSetup}>
              {this.props.axisNames.map(xAxisName => {
                if (xAxisName === this.props.currentXAxisName) {
                  return <option selected>{xAxisName}</option>
                } else {
                  return <option>{xAxisName}</option>;
                }
              })}
            </select>
            <label>Выбор поля цвета:</label>
            <select className="form-select mb-2" id="selectColor" onChange={this.props.updateSetup}>
              {this.props.axisNames.map(xAxisName => {
                if (xAxisName === this.props.currentXAxisName) {
                  return <option selected>{xAxisName}</option>
                } else {
                  return <option>{xAxisName}</option>;
                }
              })}
            </select>
            <label>Название оси X:</label>
            <select className="form-select mb-2" id="selectXAxisNames" onChange={this.props.updateSetup}>
              {this.props.axisNames.map(xAxisName => {
                if (xAxisName === this.props.currentXAxisName) {
                  return <option selected>{xAxisName}</option>
                } else {
                  return <option>{xAxisName}</option>;
                }
              })}
            </select>
            <label>Название оси Y:</label>
            <select className="form-select mb-2" id="selectYAxisNames" onChange={this.props.updateSetup}>
              {this.props.axisNames.map(yAxisName => {
                if (yAxisName === this.props.currentYAxisName) {
                  return <option selected>{yAxisName}</option>
                } else {
                  return <option>{yAxisName}</option>;
                }
              })}
            </select>
          </div>

          <div className="d-flex align-items-center justify-content-end">
            <button className="btn btn-outline-danger">Отмена</button>
            <button className="btn btn-outline-success ms-2">Сохранить</button>
          </div>
        </form>
      </div>
    );
  }
}
