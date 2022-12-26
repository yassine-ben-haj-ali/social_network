import axios from "axios";
import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router";

export default function Register() {
  const[userInfo,setUserInfo]=useState({username:"",email:"",password:""})
  const navigate = useNavigate();

  const handleChange=(e)=>{

    setUserInfo({...userInfo,[e.target.name]:e.target.value});

  }
  const handleClick = async (e) => {
    e.preventDefault();
      try {
        await axios.post("http://localhost:8800/api/auth/register",userInfo);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social netword</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on social network website.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e)=>{handleClick(e)}}>
            <input
              placeholder="Username"
              required
              name="username"
              onChange={(e)=>{handleChange(e)}}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              name="email"
              onChange={(e)=>{handleChange(e)}}
              className="loginInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              name="password"
              onChange={(e)=>{handleChange(e)}}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={()=>{navigate("/login")}}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}