import React, { useState, useEffect } from "react";
import './user-info.scss'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const UserInfo = ({ user }) => {
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [originalUsername, setOriginalUsername] = useState("");
    const [originalEmail, setOriginalEmail] = useState("");
    const [isUsernameChanged, setIsUsernameChanged] = useState(false);
    const [isEmailChanged, setIsEmailChanged] = useState(false);
    const [isImageChanged, setIsImageChanged] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get(`http://localhost:4000/users/${window.localStorage.getItem('userid')}`)
        .then((res) => {
          setUsers(res.data);
          setOriginalUsername(res.data.username);
          setOriginalEmail(res.data.email);
        })
        .catch((err) => console.log(err));
    }, []);

    return (
        <>
        {users && users.map((user) => (
        <div className='user-info'>
            <div className="user-info__img">
                <img src={  user.pic
                      ? `http://localhost:4000/${user.pic.replace("\\", "/")}`
                      : ""} alt="" />
            </div>
            <div className="user-info__name">
                <span>{user.name}</span>
            </div>
        </div>
        ))}
        </>
    )
}

export default UserInfo
