import "./App.css";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [listoffriends, setListOfFriends] = useState([]);
  useEffect(() => {
    axios
      .get("https://mern-crud-13.herokuapp.com/read", {
        name: name,
        age: age,
      })
      .then((response) => {
        setListOfFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateFriend = (id) => {
    const newAge = prompt("enter new age");
    axios
      .put("https://mern-crud-13.herokuapp.com/update", {
        newAge: newAge,
        id: id,
      })
      .then(() => {
        setListOfFriends(
          listoffriends.map((val) => {
            return val._id === id
              ? { _id: id, name: val.name, age: newAge }
              : val;
          })
        );
      });
  };

  const addFriend = () => {
    axios
      .post("https://mern-crud-13.herokuapp.com/addfriend", {
        name: name,
        age: age,
      })
      .then((response) => {
        setListOfFriends([
          ...listoffriends,
          { _id: response.data._id, name: name, age: age },
        ]);
      })
      .catch(() => {
        alert("nope");
      });
  };

  const deleteFriend = (id) => {
    axios.delete(`https://mern-crud-13.herokuapp.com/delete/${id}`).then(() => {
      setListOfFriends(
        listoffriends.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };
  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="Friend name ..."
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Friend age ..."
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button className="btn" onClick={addFriend}>
          Add Friend
        </button>
      </div>
      <div className="listfriends">
        {listoffriends.map((val) => {
          return (
            <>
              <div className="friendContainer">
                <div className="friend">
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                </div>
                <button
                  onClick={() => {
                    updateFriend(val._id);
                  }}
                >
                  Update
                </button>
                <button
                  id="removeBtn"
                  onClick={() => {
                    deleteFriend(val._id);
                  }}
                >
                  X
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
