import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./ChatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat,currentChat}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser}=useContext(AuthContext);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`http://localhost:8800/api/user/friendlist/${currentId}`,
        {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            }
          });
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/conversation/find/${user._id}`,
        {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            }
          }
      );
      setCurrentChat(res.data);       
      if(!res.data){
        try{
             const res=await axios.post("http://localhost:8800/api/conversation/",{receiverId:user._id},{
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              }
             });
         setCurrentChat(res.data);   
        }catch(err){
           console.log(err);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((o,i) => (
        <div className="chatOnlineFriend"  onClick={() => handleClick(o)} key={i}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + "/noAvatar.png"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}