import React from 'react';
import Header from "../../containers/Header";
import Feed from "../../containers/Feed";
import "../../styles/buttons.sass";
import "../../styles/titles.sass";
import './app.sass';

function App() {
  return (
    <div>
      <Header/>
      <Feed/>
    </div>
    
  );
}

export default App;
