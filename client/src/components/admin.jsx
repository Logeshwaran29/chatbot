import React, { useEffect, useState } from 'react';
import './admin.css';
import Select from 'react-select';
import axios from 'axios';

const admin = () =>{
    const [selected,setSelected]=useState({ value: 'all', label: 'All' });
    const [search,setSearch]=useState('all');
    const [data,setData]=useState([]);

    const options = [
        { value: 'all', label: 'All' },
        { value: 'ans', label: 'Answered' },
        { value: 'nAns', label: 'Not Answered' },
    ];

    const handleSelectChange = (selectedOption) => {
        setSelected(selectedOption);
        setSearch(selectedOption.value);
    };

    useEffect(() => {
      const fData= async()=>{
        try{
          await axios.post('http://127.0.0.1:5000/admin',{"query" : search})
          .then(res =>{
            setData(res.data);
            console.log(res.data);
          })
          .catch(err => console.log(err));
        }catch(e){
          console.error(e);
        }
      }
      fData();
    }, [search]);

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
          <div className="container">
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
              <div className='body-div'>
                <table className='data-table'>
                  <tbody>
                    {data.map((item,index) => (
                      <tr key={index} style={{height:'50px'}}>
                        <td>{item.query}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
    )
}

export default admin;