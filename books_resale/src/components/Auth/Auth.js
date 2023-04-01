import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import "./Auth.css";
import logo from '../../images/logo.png'
import { logIn , signUp } from "../../actions/authActions";

function Auth() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [confirmPass,setConfirmPass] = useState(true)
  const dispatch = useDispatch();

  const [authData, setAuthData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

   const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };
  
  const ToggleLogin = (e) => {
    e.preventDefault();
    setIsSignUp(!isSignUp);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp){
      (authData.password === authData.confirmpassword) ? dispatch(signUp(authData)) : setConfirmPass(false);
    }else{
      dispatch(logIn(authData));
    }
  }

  const resetForm = () => {
    setConfirmPass(true);
    setAuthData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    });
  }
  return (
    <div className="Auth">
      <div>
        <img src={logo} style={{height:'250px',width:'250px'}}/>
      </div>

      <div className="a-left">
        <div className="Webname">
          <h1 style={{fontSize:'70px'}}>Book Resale</h1>
          <h2>&nbsp;Use it, resale it</h2>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? `Sign Up` : `Log In`}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={authData.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={authData.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="infoInput"
              name="email"
              onChange={handleChange}
              value={authData.email}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={authData.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="confirmpassword"
                onChange={handleChange}
                value={authData.confirmpassword}
              />
            )}
          </div>
          <span
            style={{
              color: "black",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          {isSignUp ? (
            <>
              <div>
                <p> Already have an account. </p>
                <button className="button infoButton but" onClick={ToggleLogin}>
                  Log In
                </button>
              </div>
              <button className="button infoButton submitButton" type="submit">
                Signup
              </button>
            </>
          ) : (
            <>
              <div>
                <span> Don't have an account!</span>
                <button className="button infoButton" onClick={ToggleLogin}>
                  Signup
                </button>
              </div>
              <button className="button infoButton submitButton" type="submit">
                LogIn
              </button>
            </>
          )}
        </form>
      </div>
      {/* <div className="a-right">
        <form className="infoForm authForm">
        <h3>{isSignUp ? `Log In `: `Sign Up`}</h3>
          <div>
            <input type="text" placeholder='email'
              className='infoInput' name='email' />
          </div>
          <div>
            <input type="text" placeholder='Password'
              className='infoInput' name='password' />
          </div>
          <div>
            <span > Don't have an account!</span>
           
            <button className='button infoButton' onClick={ToggleLogin}>Signup</button>
          </div>
          <button className='button infoButton submitButton' type='submit'>LogIn</button>
        </form>
      </div> */}
    </div>
  );
}

export default Auth;
