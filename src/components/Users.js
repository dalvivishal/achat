import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { encryptUserId } from '../AuthContext/cryptoUtils';
import '../UserComponent.css';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        console.log("storedUser", storedUser);
        const user = JSON.parse(storedUser);
        if (user && user.user_id) {
          setLoggedInUserId(user.user_id.toString());
        }
      } catch (error) {
        console.error('Error parsing logged-in user data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/protected/users');
        setUsers(response.data);

      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([{id: 1, username: "sss"}]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-component">
      <h3 className="user-title">Direct Messages</h3>
      <ul className="user-list">
        {users.map((user) => {
          console.log("loggedInUserId--", loggedInUserId);
          const combinedUserIds = `${loggedInUserId}-${user.id}`;
          const encryptedUserIds = encryptUserId(combinedUserIds);
          return (
            <li key={user?.id} className="user-item">
              <Link
                to={`/chat/${encryptedUserIds}`}
                className="user-link"
              >
                {user?.username}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserComponent;
