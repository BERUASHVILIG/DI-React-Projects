import { useState } from "react";

function Card({ users, setUsers }) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    phoneNumber: "",
    city: "",
  });

  const handleDelete = (index) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  const handleEdit = (index, user) => {
    setEditIndex(index);
    setEditedUser(user);
    setEditedCardIndex(index);
  };

  const handleUpdate = () => {
    const newUsers = [...users];
    newUsers[editIndex] = editedUser;
    setUsers(newUsers);
    setEditIndex(-1);
    setEditedUser({
      firstName: "",
      lastName: "",
      avatar: "",
      phoneNumber: "",
      city: "",
    });
    setEditedCardIndex(-1);
  };
  const [editedCardIndex, setEditedCardIndex] = useState(-1);

  const handleEditValues = (target) =>
    setEditedUser((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  return (
    <div className="flex-wrap">
      {users.map((user, index) => (
        <div key={index} className="card">
          <div className="card-header">
            <img
              style={{
                display:
                  editedCardIndex === index && buttonClicked ? "none" : "block",
              }}
              src={user.avatar}
              alt="Pofile Picture"
            />
          </div>
          <div className="card-info">
            {editIndex === index ? (
              <>
                <div className="input-container">
                  <input
                    name="avatar"
                    placeholder="...Photo"
                    value={editedUser.avatar}
                    onChange={(event) => handleEditValues(event.target)}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="...John"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={(event) => handleEditValues(event.target)}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="...Doe"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={(event) => handleEditValues(event.target)}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="+995 555 123 456"
                    name="phoneNumber"
                    value={editedUser.phoneNumber}
                    onChange={(event) => handleEditValues(event.target)}
                  />
                </div>
                <div className="input-container">
                  <input
                    placeholder="...Tbilisi"
                    name="city"
                    value={editedUser.city}
                    onChange={(event) => handleEditValues(event.target)}
                  />
                </div>
                <button
                  className="update-btn btn"
                  onClick={() => {
                    handleUpdate();
                    setButtonClicked(false);
                  }}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <p>
                  FirstName:
                  <strong>{user.firstName} </strong>
                </p>
                <p>
                  LastName:
                  <strong> {user.lastName} </strong>
                </p>
                <p>
                  Phone number: <strong>{user.phoneNumber}</strong>
                </p>
                <p>
                  City: <strong> {user.city} </strong>
                </p>
                <div className="action">
                  <button
                    onClick={() => {
                      handleEdit(index, user);
                      setButtonClicked(true);
                    }}
                    className="edit-btn btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="delete-btn btn"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
