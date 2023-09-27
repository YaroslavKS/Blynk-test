import React, { useState, useEffect } from "react";
import { CommentsList } from "../CommentsList/CommentsList";
import { UserList } from "../UserList/UserList";
import { Form } from "../Form/Form";
import { generateRandomNumber } from "../Form/Form";
import "./Block.css";

export function Block({ type }) {
  const [users, setUsers] = useState(() => {
    if (!window.localStorage.getItem("useState")) {
      const defaultItem = {
        users: {
          id: "54837654",
          name: "Test",
          comments: [{ id: "1", comment: "Test", color: "#000000" }],
        },
        activeUserId: "54837654",
      };
      return [defaultItem.users];
    } else {
      return JSON.parse(window.localStorage.getItem("users"));
    }
  });

  const [activeUserId, setActiveUserId] = useState(() => {
    if (!window.localStorage.getItem("useState")) {
      return "54837654";
    } else {
      return window.localStorage.getItem("activeUserId");
    }
  });

  useEffect(() => {
    window.localStorage.setItem("users", JSON.stringify(users));
    window.localStorage.setItem("activeUserId", activeUserId);
  }, [users, activeUserId]);

  let selectedUser;

  if (activeUserId) {
    selectedUser = users.find((user) => user.id === activeUserId);
  }

  const handleCreateUser = (name) => {
    const newUser = {
      id: generateRandomNumber(),
      name: name,
      comments: [],
    };
    setUsers([...users, newUser]);
    setActiveUserId(newUser.id);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setActiveUserId(updatedUsers[0]?.id || null);
  };

  const handleCreateComment = (text, color) => {
    if (!activeUserId) return;
    const newComment = {
      id: generateRandomNumber(),
      comment: text,
      color: color,
    };
    const updatedUsers = users.map((user) =>
      user.id === activeUserId
        ? { ...user, comments: [...user.comments, newComment] }
        : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div className="block">
      {type === "users" ? (
        <>
          <h2 className="block-title">Items</h2>
          <Form type="user" onCreate={handleCreateUser} />
          {users.length > 0 && (
            <UserList
              users={users}
              activeUser={activeUserId}
              onDelete={handleDeleteUser}
              onSelect={setActiveUserId}
            />
          )}
        </>
      ) : (
        <>
          <h2 className="block-title">Comments #{activeUserId}</h2>
          {users.length > 0 && (
            <CommentsList comments={selectedUser.comments} />
          )}
          <Form type="comment" onCreate={handleCreateComment} />
        </>
      )}
    </div>
  );
}
