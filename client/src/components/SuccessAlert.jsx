import React from "react";

export default class SuccessAlert extends React.Component {
  render() {
    return (
      <div className="alert alert-success momentumcharts-success-alert d-none" role="alert">
        <h4 className="alert-heading">Данные были успешно добавлены!</h4>
        <hr />
        <p className="mb-0">Данные были добавлены в базу данных и карточка готова к использованию</p>
      </div>
    );
  }
}

/*


*/
