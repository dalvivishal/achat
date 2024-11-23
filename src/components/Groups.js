import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../GroupComponent.css';

const GroupComponent = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.post('http://localhost:5000/protected/groups', { user_id: 1 });
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        };

        fetchGroups();
    }, []);

    return (
        <div className="group-component">
            <h3 className="group-title">Groups</h3>
            <ul className="group-list">
                {groups.map((group) => (
                    <li key={group?.id} className="group-item">
                        <Link to={`/chat/${group?.group_name}`} className="group-link">
                            {group?.group_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GroupComponent;
