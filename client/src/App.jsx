// import React,{ useState } from 'react'
// import './App.css'
// // import axios from 'axios'

// function App() {
//   const [userInput,setInput]=useState('');
//   const [chatMessages,setChatMessages]=useState([{type:'bot',text:'Hi!!! how can i help you?'}]);

//   const setMessage =()=>{
//     if(userInput.trim()!==''){
//       setChatMessages(prevMessages => [...prevMessages, { type: 'user', text: userInput }]);

//       const botResponse="success"+"--->"+userInput.toLowerCase();

//       setChatMessages(prevMessages => [...prevMessages, { type: 'bot', text: botResponse }]);
      
//       console.log(chatMessages);
      
//       setInput('');
//     }
//   }

//   const UserMessage =({text})=>{
//     <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '5px', backgroundColor: '#3498db', color: '#fff', wordWrap: 'break-word' }}>
//       {text}
//     </div>
//   }

//   const BotMessage = ({text})=>{
//     <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '5px', backgroundColor: '#e0e0e0', color: '#333', wordWrap: 'break-word' }}>
//       {text}
//     </div>
//   }
  
//   const getMsg=()=>{
    
//   }

//   const sendMsg =()=>{
//     setMessage();
//   }

//   return (
//     <div className='main'>
//         <div className="chat">
//           <div className="dis">
//             <div className="area">
//               {chatMessages.map((message, index) => (
//                 message.type === 'user' ? (
//                 <UserMessage key={index} text={message.text} />
//                 ) : (
//                 <BotMessage key={index} text={message.text} />
//               )
//               ))}
//             </div>
//           </div>
//           <div className="msg">
//             <input className="input" type="text" placeholder='Type your message' onChange={(e) =>setInput(e.target.value)}/>
//             <svg className='i' xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512"><path fill="#ffffff" d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/></svg>
//             <svg className='i' onClick={sendMsg} xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#ffffff" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>
//           </div>
//         </div>
//     </div>
//   )
// }

// export default App

import React, { useState } from 'react';
import './App.css'

const UserMessage = ({ text }) => (
  <div className="user">
    <div className='ii'>
    <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
    </div>
    <div className='tt'>{text}</div> 
  </div>
);

const BotMessage = ({ text }) => (
  <div className="bot">
    <div className='ii'>
    <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
    <path fill='#ffffff' d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>
    </div>
    <div className='tt'>{text}</div>
  </div>
);

const ChatApp = () => {
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([{type:'bot',text:'hello'}]);

  const sendMsg = () => {
    if (input.trim() !== '') {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: 'user', text: input },
      ]);

      const botres="success"+'-->'+input.toLowerCase();
      setChatMessages((prevMessages) => [
        ...prevMessages,{type: 'bot', text:botres}
      ]);
      setInput('');
    }
  };

  return (
    <div className='main'>
      <div className='chat'>
        <div className='dis'>
          <div className='area'>
            {chatMessages.map((message, index) => (
              message.type === 'user' ? (
                <UserMessage key={index} text={message.text} />
              ) : (
                <BotMessage key={index} text={message.text} />
              )
            ))}
          </div>
        </div>
        <div className='msg'>
          <input
            className='input'
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Type your message...'
          />
          <svg className='i' xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 384 512">
            <path fill="#ffffff" d="M96 96V256c0 53 43 96 96 96s96-43 96-96H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V192H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80V128H208c-8.8 0-16-7.2-16-16s7.2-16 16-16h80c0-53-43-96-96-96S96 43 96 96zM320 240v16c0 70.7-57.3 128-128 128s-128-57.3-128-128V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v24z"/>
          </svg>
          <svg className='i' onClick={sendMsg} xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512">
            <path fill="#ffffff" d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3.3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
