import React, { BaseSyntheticEvent } from "react";

function parseDate(dateString) {
  let [time, date] = dateString.split(" ");
  let [hours, minutes] = time.split(":");
  let [day, month, year] = date.split(".");

  return new Date(parseFloat(year), parseFloat(month) - 1, parseFloat(day), parseFloat(hours), parseFloat(minutes));
}

export default class Header extends React.Component {
  static isSorting = false;

  constructor(props) {
    super(props);
  }

  
  // searchByCards() {
  //   let cards = document.querySelectorAll(".card");
    
  //   cards.forEach(card => {
  //     card.classList.remove("match-by-search");
  //     card.classList.remove("d-none");

  //     let title = card.querySelector(".card-title");
  //     let search = document.querySelector(".header-search");
  //     let titleText = title?.innerHTML.toLowerCase();
  //     let searchText = search.value.toLowerCase();
      
  //     if (Header.isSorting) {
  //       if (titleText?.includes(searchText) && card.classList.contains("sorting")) {
  //         card?.classList.add("match-by-search");
  //       }
  //     } else {
  //       if (titleText?.includes(searchText)) {
  //         card?.classList.add("match-by-search");
  //       }
  //     }
  //   });

  //   cards.forEach(card => {
  //       if (Header.isSorting) {
  //         if (!card.classList.contains("match-by-search") && card.classList.contains("sorting")) {
  //           card.classList.add("d-none")
  //         } else {
  //           card.classList.remove("d-none");
  //         }
  //       } else {
  //         if (!card.classList.contains("match-by-search")) {
  //           card.classList.add("d-none")
  //         } else {
  //           card.classList.remove("d-none");
  //         }
  //       }
  //   });
  // }


  // sortCardsByLastYear(event: BaseSyntheticEvent) {
    
  // }
  
  // sortCardsByLastMonth(event: BaseSyntheticEvent) {

  // }
  
  // sortCardsByLastWeek(event: BaseSyntheticEvent) {

    // }

    // sortCardsByNewFirst(event: BaseSyntheticEvent) {

      // }

      // sortCardsByOldFirst(event: BaseSyntheticEvent) {
    
        // }

        // cancelSorting(event: BaseSyntheticEvent) {
          
  // }

  editCards() {
    let cards = document.querySelectorAll(".card");
    
    cards.forEach(card => {
      if (card.classList.contains("card-edit")) {
        card.classList.remove("card-edit");
      } else {
        card.classList.add("card-edit");
      }
    });
  }
  render() {
    return (
      <div className="container header" style={{paddingTop: '0.02px'}}>
        <div className="header-logo mt-4 text-center font-weight-normal">
          <h3>Momentum Charts</h3>
        </div>
        <div className="header-bar mt-4 d-flex flex-row justify-content-between align-items-center">
          <form className="form w-100">
            <div className="input-group">
              <div className="header-search-icon btn border rounded-left bg-light cursor-none">
                <i className="fas fa-search" />
              </div>
              <input className="header-search form-control" value={this.props.searchText} onChange={(e)=>{this.props.setsearchText(e.target.value)}} type="text" />
              {/* <div className="dropdown ms-3">
                <button className="btn dropdown-toggle" id="cards-sort-button" aria-expanded="false" data-bs-toggle="dropdown" type="button">
                  Сортировать
                </button>
                <div className="dropdown-menu" aria-labelledby="cards-sort-button">
                  <a className="cards-sort-by-last-year dropdown-item" onClick={this.sortCardsByLastYear} href="#">За последний год</a>
                  <a className="cards-sort-for-last-month dropdown-item" href="#" onClick={this.sortCardsByLastMonth}>За последний месяц</a>
                  <a className="cards-sort-for-last-week dropdown-item" href="#" onClick={this.sortCardsByLastWeek}>За последнюю неделю</a>
                  <a className="cards-sort-new-firts dropdown-item" href="#" onClick={this.sortCardsByNewFirst}>По дате (сначала новые)</a>
                  <a className="cards-sort-old-firts dropdown-item" href="#" onClick={this.sortCardsByOldFirst}>По дате (сначала старые)</a>
                  <a className="cards-sort-old-firts dropdown-item" href="#" onClick={this.cancelSorting}>Отмена сортировки</a>
                </div>
              </div> */}
              <button className="btn border rounded ms-3" type="button" data-bs-toggle="modal" data-bs-target="#add-data-sources">
                <i className="fas fa-plus" />
              </button>
              <button className="btn border rounded ms-3" type="button" onClick={this.editCards}>
                <i className="fas fa-pen" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
