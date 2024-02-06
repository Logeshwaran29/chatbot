import React, { useState } from 'react'
import './login.css';

const login = () =>{
    return(
        <div className="login">
            <div className="login-card">
                <div className="card-header">
                    <h1>Login</h1>
                </div>
            <div className="card-body">
            <form className='form'>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" id="username" className="username" required=""/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" id="password" className="password" required=""/>
                </div>
                <div className="form-group">
                    <button type="submit" className="login-button">Login</button>
                </div>
            </form>
            </div>
            </div>
        </div>
    );
};

export default login;