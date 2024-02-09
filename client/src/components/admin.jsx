import React, { useState } from 'react';
import './admin.css';
import Select from 'react-select';
import axios from 'axios';

const admin = () =>{
    const [selected,setSelected]=useState('all');

    const handle = (event) => {
        setSelected(event.target.value);
    };

    return(
        <div className="admin">
            <div className="drop-box">
                {/* <select className="drop" name='options' onChange={handle}>
                    <option className='option' value='all'>All</option>
                    <option className='option' value='answer'>Answered</option>
                    <option className='option' value='notAns'>Not Answered</option>
                </select> */}
                
            </div>
        </div>
    )
}

export default admin;