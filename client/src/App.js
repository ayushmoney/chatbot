import React from "react";
import Chatbotnew from "./Chatbot/chatbotnew";

function App() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        {/* <Title level={2} >CHAT BOT APP&nbsp;<Icon type="bot" /></Title> */}
        <img src="https://img.icons8.com/ios-glyphs/30/000000/chat.png"  /><h3>ChatBot</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
       
        <Chatbotnew />


      </div>
    </div>
  )
}

export default App
