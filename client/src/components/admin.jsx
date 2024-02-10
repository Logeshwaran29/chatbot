import React, { useState } from 'react';
import './admin.css';
import Select from 'react-select';
import axios from 'axios';

const admin = () =>{
    const [selected,setSelected]=useState('all');

    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    const handleSelectChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    return(
        <div className="admin">
            <div className="drop-box">
                    <Select
                    id="dropdown"
                    options={options}
                    value={selected}
                    onChange={handleSelectChange}
                    isSearchable={false}
                    />
            </div>
        </div>
    )
}

export default admin;