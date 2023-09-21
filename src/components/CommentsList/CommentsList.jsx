import "./CommentsList.css";
import React from "react";

export function CommentsList({ comments }) {
  return comments ? (
    <ul className="comments-list">
      {comments.map(({ comment, id, color }) => {
        return (
          <li className="comments-item" key={id}>
            <div className="comments-color" style={{ background: color }}></div>
            <div className="comments-text">
              <p>{comment}</p>
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    ""
  );
}
