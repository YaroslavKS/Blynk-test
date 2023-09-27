import "./UserList.css";
import React from "react";
import { useDispatch } from "react";
import { setActiveUser } from "../Form/Form";

export function UserList({ users, activeUser, onDeleteUser }) {
  const dispatch = useDispatch();

  const handleItemClick = (userId) => {
    dispatch(setActiveUser(userId));
  };

  return (
    <ul className="user-list">
      {users.map(({ name, id, comments }) => {
        return (
          <li
            className={`user-item ${id === activeUser ? "active" : ""}`}
            key={id}
            onClick={() => handleItemClick(id)}
          >
            <p className="user-text">{name}</p>
            <div className="user-block">
              <div className="user-quantity">
                <p>{comments.length}</p>
              </div>
              <button
                className="user-btn"
                onClick={(e) => onDeleteUser(id)}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
