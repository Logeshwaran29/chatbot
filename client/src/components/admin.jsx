import React, { useEffect, useState } from 'react';
import './admin.css';
import axios from 'axios';
import Line from './adminComp/Line';
import Data from './adminComp/data';
import ErrorComp from './adminComp/error';
import Profile from './adminComp/profile';
import Error from './images/Error.png';
import NoResult from './images/No-result.png';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = ({isLogin, setLogin}) =>{
    const [selected, setSelected]=useState({ value: 'all', label: 'All' });
    const [search, setSearch]=useState('all');
    const [opt, setOpt] = useState('all');
    const [data, setData]=useState([]);
    const [count, setCount] = useState([]);
    const [count1, setCount1] = useState([]);
    const [labels, setLabels] = useState([]);
    const [newUser, setNewUser] = useState('');
    const [newPass, setNewPass] = useState('');
    const [div1, setDiv1] = useState(false);    
    const [div2, setDiv2] = useState(false);
    const [logDiv, setLogDiv] = useState(false);

    const handleSelectChange = (selectedOption) => {
        setSelected(selectedOption);
        setSearch(selectedOption.value);
    };

    const failure = (msg) =>{
      toast.error(msg,{
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    const success = (msg) =>{
      toast.success(msg,{
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

    const warning = (msg) =>{
      toast.warn( msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    useEffect(() => {
      const loggedIn = sessionStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        setLogin(true);
      }
    }, [setLogin]);

    useEffect(() => {
      if (isLogin){
        const count = async()=>{
          try{
            await axios.get('http://192.168.1.113:5000/profile')
            .then(res =>{
              setNewUser(res.data[0].name);
              setNewPass(res.data[0].pass);
            })
            .catch(e => console.error(e));
          }catch(e) {
            console.error(e);
          }
        }
        count();
      }
    }, [isLogin,div1,div2]);

    useEffect(() => {
      if (isLogin){
        const fData = async()=>{
          try{
            await axios.post('http://192.168.1.113:5000/admin',{"query" : [opt, search]})
            .then(res =>{
              setData(res.data);
            })
            .catch(err => console.log(err));

            await axios.get('http://192.168.1.113:5000/count')
            .then(res =>{
              console.log(res.data);
              setCount(res.data[0]);
              setCount1(res.data[1]);
              setLabels(res.data[2]);
            })
            .catch(e => console.error(e));
          }catch(e){
            console.error(e);
          }
        }
        fData();
      }
    }, [isLogin, search, opt]);

    const handleSubmit = async () => {
      try {
        if (newUser !=='' && newPass !==''){
          await axios.post('http://192.168.1.113:5000/profileUpdate',{'query': div1 ? newUser : newPass, 'check': div1 ? 0 : 1})
          .then(res =>{
            if (res.data.data === 'updated'){
              div1? setDiv1(false) : setDiv2(false); 
              success(div1 ? 'User Name Updated' : 'Password Updated');
            }else if(res.data.data === 'exists'){
              div1? setDiv1(false) : setDiv2(false); 
              failure(div1 ? 'User Name already exists' : 'Password already exists');
            }
          })
          .catch(e=> console.log(e));
          }
        else{
          div1 ? setDiv1(false) : setDiv2(false); 
        }
      } catch (error) {
        console.error(error);
      }
    }

    const Logout = () =>{
      sessionStorage.removeItem('loggedIn');
      warning('logging out...');
      setLogDiv(false);
      setTimeout(() => {
        setLogin(false);
      }, 2000);
    }

    return(
      <div className="admin">
        {isLogin ? (
          <>
          <div className="main-container">
          <div className="container">
              <div className="navbar">
                <div className='dash-div'>
                <label>DASHBOARD</label>
                <svg className="ad" xmlns="http://www.w3.org/2000/svg" onClick={(e) => setLogDiv(!logDiv)} height={40} width={40} viewBox="0 0 512 512">
                  <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                </svg>
                </div>
              </div>
              <div className={logDiv ? 'logout' : 'log'} onClick={Logout}>
                <svg className='svg' xmlns="http://www.w3.org/2000/svg" height={20} width={20}  viewBox="0 0 512 512">
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                </svg>
                <label>Log out</label>
              </div>
              <div className="data-box">
                <Data selected={selected} data={data} handleSelectChange={handleSelectChange} NoResult={NoResult} labels={labels} setOpt={setOpt}/>
              </div>
              <div className="pie-chart">
                <Line count={count} count1={count1} labels={labels}/>
              </div>
              <div className="profile-container">
                <div className="profile">
                  <label>Profile</label>
                </div>
                <div className="content">
                <svg xmlns="http://www.w3.org/2000/svg" height={180} width={85} viewBox="0 0 448 512">
                  <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/>
                </svg>
                <div className='card'>
                  <div className='card-d'>
                    <Profile 
                      label="Username :"
                      value={newUser}
                      setValue={setNewUser}
                      div={div1}
                      setDiv={setDiv1}
                    />
                  <button className='button 1' onClick={handleSubmit} disabled={div1 ? false : true}>Ok</button>
                  </div>
                  <div className='card-d'>
                    <Profile 
                      label="Password :"
                      value={newPass}
                      setValue={setNewPass}
                      div={div2}
                      setDiv={setDiv2}
                    />
                  <button className='button 2' onClick={handleSubmit} disabled={div2 ? false : true}>Ok</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
            </div>
          </>
        ):(
          <>
            <div className="error-container">
              <ErrorComp Error={Error}/>
            </div>
          </>
        )}
        <ToastContainer />
      </div>
    )
}

export default Admin;