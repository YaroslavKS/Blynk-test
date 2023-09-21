import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react";
import { CommentsList } from "../CommentsList/CommentsList";
import { UserList } from "../UserList/UserList";
import { Form } from "../Form/Form";
import { addUser, setActiveUser } from "../users/usersSlice";
import "./Block.css";

export function Block({ type }) {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!window.localStorage.getItem("useState")) {
      const defaultItem = {
        users: {
          id: "54837654",
          name: "Test",
          comments: [{ id: "1", comment: "Test", color: "#000000" }],
        },

        activeUserId: "54837654",
      };
      dispatch(addUser(defaultItem.users));
      dispatch(setActiveUser(defaultItem.activeUserId));
    }
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);
  const activeUserId = useSelector((state) => state.users.activeUserId);

  let selectedUser;

  if (activeUserId) {
    selectedUser = users.find((user) => user.id === activeUserId);
  }

  return (
    <div className="block">
      {type === "users" ? (
        <>
          <h2 className="block-title">Items</h2>
          <Form type="user" />
          {users.length > 0 && (
            <UserList users={users} activeUser={activeUserId} />
          )}
        </>
      ) : (
        <>
          <h2 className="block-title">Comments #{activeUserId}</h2>
          {users.length > 0 && (
            <CommentsList comments={selectedUser.comments} />
          )}
          <Form />
        </>
      )}
    </div>
  );
}
