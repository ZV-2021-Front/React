import React, { useState, useEffect } from 'react';
import { insertCardFromDatabase, insertCardFromFile, removeCard, selectCards } from '../http/diagramAPI';

import AddSourcePopupWindow from "./AddSourcePopupWindows";
import Card from "./Card";
import SuccessAlert from "./SuccessAlert";

export const CardContainer = ({searchText}) => {

  const [cards, setcards] = useState([]);

  useEffect(() => {
    updateCards()
  }, [searchText])
  
  function addCardFromDatabase() {
    let databaseType = (document.querySelector("#databaseType")).value;
    let databaseName = (document.querySelector("#databaseName")).value;
    let userName = (document.querySelector("#userName")).value;
    let password = (document.querySelector("#password")).value;
    let hostName = (document.querySelector("#hostName")).value;
    let port = (document.querySelector("#port")).value;
    let tables = (document.querySelector("#tables")).value;
    let graphTypes = (document.querySelector("#graphTypesFromDatabase")).value;
    
    insertCardFromDatabase(graphTypes, databaseType, databaseName, userName, password, hostName, port, tables);
    
    updateCards();
  }
  
  function addCardFromFile() {
    let tableName = (document.querySelector("#tableName")).value;
    let graphTypes = (document.querySelector("#graphTypesFromFile")).value;
    let files = (document.querySelector("#files")).files;
    let jsonText = "";
    
    for (let i = 0; i < (files.length); i++) {
      let file = files.item(i);
      let reader = new FileReader();
      
      reader.readAsText(file, "UTF-8");
      reader.addEventListener("load", content => {
        jsonText = content.target?.result;
        
        // console.log(jsonText)
        insertCardFromFile(tableName, jsonText, graphTypes);
        
        updateCards();
      });
    }
    
    
    // let addRequest = axios.get(`https://localhost:81/api/source/add?sourceType=file&title=${tableName}&fileContent=${jsonText}&graphTypes=${graphTypes}`);
    
    // addRequest.then(response => console.log(response))
  }
  
  function deleteCard(e) {
    let card = e.currentTarget.parentNode;

    removeCard(card.id);
    
    updateCards();
  }
  
  function updateCards() {
    selectCards().then(updateResponse => {
      let updateCards = JSON.parse(updateResponse.cards);
      let cards = [];
      
      updateCards.map((card) => {
        card.title.toLowerCase().includes(searchText.toLowerCase()) ? cards.push(<Card title={card.title} id={card.id} graphTypes={card.graphTypes} lastUpdate={new Date(card.lastUpdate?.date)} deleteCard={deleteCard} />) : null;
      });
      
      setcards(cards);
    });
  }
  

  return (
    <div>
      <AddSourcePopupWindow addCardFromDatabase={addCardFromDatabase} addCardFromFile={addCardFromFile} >
        <SuccessAlert />
      </AddSourcePopupWindow>
      
      <div className="card-container container mt-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 300px)', gap: '32px' }}>
        {cards}
      </div>
    </div>
  );
  
}
