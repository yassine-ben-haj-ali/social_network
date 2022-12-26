import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const {user:credentials}=useContext(AuthContext);
  const username = useParams().username;
  const[isLoading,setIsloading]=useState(false);

  const fetchUser = async () => {
    try{

      const res = await axios.get(`http://localhost:8800/api/user/?username=${username}`,{
      headers: {
        Authorization: `Bearer ${credentials.token}`,
      },
    });
    setUser(res.data);
    setIsloading(true);

  }catch(err){
      console.log(err);
  }
  };

  useEffect(() => {
    
    fetchUser();
  }, [username]);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar/>
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "/noCover.jpg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    :require("../../Assets/noAvatar.png")
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
               
               
               {isLoading&&<Rightbar user={user}/>}
          
          </div>
        </div>
      </div>
    </>
  );
}