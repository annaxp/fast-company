import React, { useState } from "react";
import Users from "./app/components/users";
import SearchStatus from "./app/components/serchStatus";
import api from "./app/api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onToggleBookMark={handleToggleBookMark}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
