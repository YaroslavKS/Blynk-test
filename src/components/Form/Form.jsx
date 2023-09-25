import React, { useState } from "react";
import "./Form.css";

function generateRandomNumber() {
  const min = 10000000;
  const max = 99999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

export function Form({ type, onCreate }) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [comment, setComment] = useState("");
  
  const handleInputChange = (event) => {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (type === "user") {
      onCreate(name);
      setName("");
    } else {
      onCreate(comment, color);
      setComment("");
    }
  };

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      {type === "user" ? (
        <>
          <input
            className="form-input"
            placeholder="Type name here..."
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
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
            type="color"
            name="color"
            value={color}
            onChange={handleInputChange}
            required
          />
          <textarea
            className="form-textarea"
            placeholder="Type comment here..."
            name="comment"
            value={comment}
            onChange={handleInputChange}
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
