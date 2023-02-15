import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (number) => {
    const lastOne = Number(number.toString().slice(-1));
    if (number > 4 && number < 15) {
      return "человек тусанет";
    }
    if (lastOne === 1) return "человек тусанет";
    if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
    return "человек тусанет";
  };

  const tableHeader = [
    "Имя",
    "Качества",
    "Профессия",
    "Встретился, раз",
    "Оценка",
    " ",
  ];

  const renderTableHeader = () => {
    return (
      tableHeader.length !== 0 &&
      tableHeader.map((th) => <th scope="col">{th}</th>)
    );
  };

  const renderUsers = () => {
    return (
      users.length !== 0 &&
      users.map((user) => (
        <>
          <tr key={user._id}>
            <th scope="row">{user.name}</th>
            <td key={user.profession._id}>{user.profession.name}</td>
            <td>
              {user.qualities.map((qual) => (
                <>
                  <span key={qual._id} className={"badge m-2 bg-" + qual.color}>
                    {" "}
                    {qual.name}
                  </span>
                </>
              ))}
            </td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
              <button
                className="btn btn-danger btn-sm m-2"
                onClick={() => handleDelete(user._id)}
              >
                delete
              </button>
            </td>
          </tr>
        </>
      ))
    );
  };

  return (
    <>
      <h2>
        <span
          className={"badge " + (users.length > 0 ? "bg-primary" : "bg-danger")}
        >
          {users.length > 0
            ? `${
                users.length + " " + renderPhrase(users.length)
              }   с тобой сегодня`
            : "Никто с тобой не тусанет"}
        </span>
      </h2>
      <table className="table">
        <thead>
          <tr>{renderTableHeader()}</tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </>
  );
};
export default Users;
