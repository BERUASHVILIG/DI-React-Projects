import { useState } from "react";
import "./App.scss";
import Card from "./Components/Card";

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    phoneNumber: "",
    city: "",
  });
  const [users, setUsers] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleValues = (target) =>
    setUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });

  const handleAddUser = (user) => {
    if (editIndex !== -1) {
      setUsers((prev) => {
        const newUsers = [...prev];
        newUsers[editIndex] = user;
        return newUsers;
      });
      setEditIndex(-1);
    } else {
      setUsers((prev) => [...prev, user]);
    }
    setUser({
      firstName: "",
      lastName: "",
      avatar: "",
      phoneNumber: "",
      city: "",
    });
  };

  const handleEdit = (index) => {
    setUser(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  return (
    <>
      <div className="main-content">
        <div>
          <div className="input-container">
            <label>Enter your Photo URL</label>
            <input
              name="avatar"
              placeholder="...Photo URL"
              value={user.avatar}
              onChange={(event) => handleValues(event.target)}
            />
          </div>
          <div className="input-container">
            <label>Enter your First Name</label>
            <input
              placeholder="...FirstName"
              name="firstName"
              value={user.firstName}
              onChange={(e) => handleValues(e.target)}
            />
          </div>
          <div className="input-container">
            <label>Enter your Last Name</label>
            <input
              placeholder="...lastName"
              name="lastName"
              value={user.lastName}
              onChange={(e) => handleValues(e.target)}
            />
          </div>
          <div className="input-container">
            <label>Enter your Phone number</label>
            <input
              placeholder="...Phone"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={(e) => handleValues(e.target)}
            />
          </div>
          <div className="input-container">
            <label>Enter your City</label>
            <input
              placeholder="...City"
              name="city"
              value={user.city}
              onChange={(e) => handleValues(e.target)}
            />
          </div>
          <button
            className="user-add-btn btn"
            onClick={() => handleAddUser(user)}
          >
            Add User
          </button>
        </div>
        <div className="card-example">
          <div className="card">
            <div className="card-header">
              <img src="profile-static.png" alt="" />
            </div>
            <div className="card-info">
              <p>FirstName: John</p>
              <p>LastName: Doe</p>
              <p>Phone number: 555 10 20 30</p>
              <p>City: Tbilisi</p>
            </div>
            <div className="action">
              <button className="edit-btn btn">Edit</button>
              <button className="delete-btn btn">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <Card
        users={users}
        setUsers={setUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default App;
