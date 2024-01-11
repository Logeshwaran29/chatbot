import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>
        <div className="chat">
          h
        </div>
        <div className="msg">
          <input className="input" type="text" />
          <FontAwesomeIcon icon="fa-microphone" />
          {/* <FontAwesomeIcon icon={} /> */}
        </div>
    </div>
  )
}

export default App
