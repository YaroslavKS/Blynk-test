import { useDispatch, useSelector } from "react";
import { useState } from "react";
import {
  addUser,
  addCommentToUser,
  setActiveUser,
} from "../users/usersSlice";

import "./Form.css";

function generateRandomNumber() {
  const min = 10000000;
  const max = 99999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

export function Form({ type }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [comment, setComment] = useState("");
  const { users, activeUserId } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const inputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "color":
        setColor(value);
        break;
      case "comment":
        setComment(value);
        break;
      default:
        break;
    }
  };
  const resetForm = () => {
    setName("");
    setColor("#000000");
    setComment("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (type === "user") {
      const newUser = {
        id: generateRandomNumber(),
        name: name,
        comments: [],
      };
      dispatch(addUser(newUser));
      dispatch(setActiveUser(newUser.id));
    } else {
      if (users.length === 0) {
        return;
      }

      const selectedUser = users.find((user) => user.id === activeUserId);
      const newComment = {
        id: generateRandomNumber(),
        comment: comment,
        color: color,
      };

      dispatch(
        addCommentToUser({
          userId: selectedUser.id,
          comment: newComment,
        })
      );
    }
    resetForm();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {type === "user" ? (
        <>
          <input
            className="form-input"
            placeholder="Type name here..."
            type="text"
            name="name"
            onChange={inputChange}
            value={name}
            required
          />
          <button className="form-button" type="submit">
            Add New
          </button>
        </>
      ) : (
        <>
          <input
            className="form-color"
            onChange={inputChange}
            value={color}
            type="color"
            name="color"
            required
          />
          <textarea
            className="form-textarea"
            placeholder="Type comment here..."
            name="comment"
            onChange={inputChange}
            value={comment}
            required
          />
          <button className="form-button form-button-big" type="submit">
            Add New
          </button>
        </>
      )}
    </form>
  );
}
