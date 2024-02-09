import React, { useState } from 'react';
import './login.css';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';


const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const link = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try{
      axios.post('http://127.0.0.1:5000/login',{
        'name':username.trim(),
        'password':password.trim()
      })
      .then(res =>{
        console.log(res);
        if(res.data.data ==='ok'){
          link("/admin-view");
        }else if(res.data.data ==='wrong pass'){
          toast("Enter correct password",{style:{background:"red"}});
        }else if (res.data.data === 'wrong user'){
          toast("Enter correct username",{style:{background:'red'}});
        }  
      })
      .catch(e => console.log(e));
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="login">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit} method='POST'>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <button type="submit">Login</button>
            </div>
          </form>
          <ToastContainer/>
        </div>
    </div>
  );
};

export default login;
