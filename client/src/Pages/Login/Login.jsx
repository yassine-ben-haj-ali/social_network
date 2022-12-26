import { useContext,useState} from "react";
import "./Login.css";
import { loginCall } from "../../Utils/ApiCalls";
import { AuthContext } from "../../Context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [Credentials, setCredentials] = useState({ email: "", password: "" });
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate=useNavigate();

  const HandleChange = (e) => {
    setCredentials({
      ...Credentials,
      [e.target.name]: e.target.value,
    });
  };
  const HandleClick = async (e) => {
    e.preventDefault();
    loginCall(Credentials,dispatch);  
    
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">social network</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on social network website.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={(e)=>{HandleClick(e)}}>
            <input
              placeholder="Enter your Email"
              type="email"
              required
              className="loginInput"
              name="email"
              onChange={(e)=>{HandleChange(e)}}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              name="password"
              onChange={(e)=>{HandleChange(e)}}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={()=>{
              navigate("/register")
            }}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}