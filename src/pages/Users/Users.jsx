import React, { useState, useEffect } from "react";
import "./User.css";
import List from "../../components/List/List";

function Users() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/all-users");
        // console.log(response.json())
        const jsonData = await response.json();
  
        setAllUsers(jsonData);
   
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="user dashboard">
      <table>
        <thead className="head"> <tr>Name</tr>
        <tr>Email</tr>
        <tr>Role</tr>
        <tr>Address</tr>
        <tr>Phone</tr>
        </thead>
        <tbody>
        {allUsers.map((user) => {
          return (
            <div className="Table-row">
              <tr className="bg-red-500">
               {user.first_name + user.last_name}
              </tr>
              <tr className="text-red-500">{user.email}</tr>
              <tr>{user.role_type}</tr>
              <tr>{user.address}</tr>
              <tr>{user.phone}</tr>
              </div>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
