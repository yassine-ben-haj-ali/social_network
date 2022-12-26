import { useContext, useEffect, useState } from "react";
import Post from "../Post/Post";
import Share from "../Share/Share";
import "./Feed.css";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get(`http://localhost:8800/api/post/profile/${username}`,{
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        })
        : await axios.get("http://localhost:8800/api/post/timeline/",{
          headers: {
            Authorization: `Bearer ${user.token}`,
          }
        });
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}