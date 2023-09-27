import "./UserList.css";
import React from "react";
import { useDispatch } from "react";
import { deleteUser, setActiveUser } from "../Block/Block";

export function UserList({ users, activeUser }) {
  const dispatch = useDispatch();
  const handleDeleteUser = (userId, e) => {
    e.stopPropagation();
    dispatch(deleteUser(userId));
  };

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
                onClick={(e) => handleDeleteUser(id, e)}
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
