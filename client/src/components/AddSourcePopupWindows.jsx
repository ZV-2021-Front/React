import React, { MouseEventHandler } from "react";
import { InputTags } from 'react-bootstrap-tagsinput'

// interface AddSourcePopupWindowProps {
//   addCardFromDatabase: MouseEventHandler<HTMLButtonElement>
//   addCardFromFile: MouseEventHandler<HTMLButtonElement>
// }

// interface AddSourcePopupWindowState {
//   tables: any
// }

export default class AddSourcePopupWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tables: []
    }
  }
  render() {
    

    return (
      <div className="modal" id="add-data-sources" tabIndex={-1} aria-labelledby="add-data-sources-title" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add-data-sources-title">Добавление новых источников данных</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button type="button" className="nav-link active" data-bs-toggle="tab" data-bs-target="#fromDatabase" aria-controls="fromDatabase" aria-selected={true} id="database-tab">Из базы данных</button>
                </li>
              <li className="nav-item">
                <button type="button" className="nav-link" data-bs-toggle="tab" data-bs-target="#fromFile" aria-controls="fromFile" aria-selected={false} id="file-tab">Из файла JSON</button></li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active modal-body" id="fromDatabase" aria-labelledby="database-tab">
                <form className="from form-group">
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#databaseType">Тип базы данных:</label>
                    <select className="form-select" aria-label="Database type" id="databaseType">
                      <option value="pdo_mysql" selected>MySQL</option>
                      <option value="pdo_pgsql">PostgreSQL</option>
                      <option value="pdo_sqlsrv">Microsoft SQL Server</option>
                      <option value="pdo_oci">Oracle</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#databaseName">База данных:</label>
                    <input type="text" className="form-control" id="databaseName"></input>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#userName">Имя пользователя:</label>
                    <input type="text" className="form-control" id="userName"></input>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#password">Пароль:</label>
                    <input type="password" className="form-control" id="password"></input>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#hostName">Хост:</label>
                    <input type="text" className="form-control" id="hostName"></input>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#port">Порт:</label>
                    <input type="text" className="form-control" id="port"></input>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#tables">Введите имя таблиц (через запятую):</label>
                    <InputTags values={this.state.tables} id="tables" onTags={(tables) => this.setState({ tables: tables.values })} />

                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#graphTypesFromDatabase">Введите нужные типы диаграмм (через запятую):</label>
                    <input type="text" className="form-control" id="graphTypesFromDatabase"></input>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" className="btn btn-primary" onClick={this.props.addCardFromDatabase}>Добавить</button>
                  </div>
                </form>
              </div>
              <div className="tab-pane fade modal-body" id="fromFile" aria-labelledby="file-tab">
                <form className="from form-group">
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#tableName">Введите имя карточки:</label>
                    <input type="text" className="form-control" id="tableName"></input>
                  </div>
                  <div className="mb-3">
                    <div className="input-group">
                      <input type="file" className="form-control" id="files" aria-label="Upload" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="from-label" htmlFor="#graphTypesFromFile">Введите нужные типы диаграмм (через запятую):</label>
                    <input type="text" className="form-control" id="graphTypesFromFile"></input>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" className="btn btn-primary" onClick={this.props.addCardFromFile}>Добавить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
