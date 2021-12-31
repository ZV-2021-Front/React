import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

// interface CardProps {
//   title: string,
//   lastUpdate: Date,
//   id: string,
//   graphTypes: Array<string>,
//   deleteCard: MouseEventHandler<HTMLDivElement>
// };

export default class Card extends React.Component {
  render() {
    return (
      <div className="card border d-flex flex-column justify-content-between mb-3" id={this.props.id}>
        <div className="card-delete" onClick={this.props.deleteCard}>
          <button className="card-delete-btn btn">
            <i className="fas fa-trash"></i>
          </button>
        </div>
        <p className="card-title text-center pt-2">{this.props.title}</p>
        <div className="card-preview">
        </div>
        <div className="d-inline-flex flex-row justify-content-end align-items-end " >
          {/* Replace getLastUpdate */}
          {/* <p className="card-details d-flex mb-1 ms-2">Обновлено в &nbsp; <span className="card-last-update">{this.getLastUpdate()}</span></p> */}
          <Link className="card-details-btn btn btn-primary mt-3" to={`/view/${this.props.id}`}>Подробнее</Link>
        </div>
      </div>
    );
  }

  // getLastUpdate() {
  //   let minutes = this.props.lastUpdate.getMinutes();
  //   let hours = this.props.lastUpdate.getHours();
  //   let day = this.props.lastUpdate.getDate();
  //   let month = this.props.lastUpdate.getMonth() + 1;
  //   let year = this.props.lastUpdate.getFullYear();
  //   let date = `${day}.${month}.${year}`;
  //   let time = `${hours}:${minutes}`;

  //   return `${time} ${date}`;
  // }
}