import React, { useState } from 'react';
import './admin.css';
import Select from 'react-select';
import axios from 'axios';

const admin = () =>{
    const [selected,setSelected]=useState('all');

    const options = [
        { value: 'all', label: 'All' },
        { value: 'ans', label: 'Answered' },
        { value: 'nAns', label: 'Not Answered' },
    ];

    const handleSelectChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: state.isFocused ? '0 0 0 2px #3366cc' : null,
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? '#3366cc' : null,
          color: state.isSelected ? 'white' : 'black',
        }),
      };

    return(
        <div className="admin">
            <div className="drop-box">
                    <Select
                    className='select'
                    id="dropdown"
                    options={options}
                    value={selected}
                    onChange={handleSelectChange}
                    isSearchable={false}
                    styles={customStyles}
                    />
            </div>
        </div>
    )
}

export default admin;