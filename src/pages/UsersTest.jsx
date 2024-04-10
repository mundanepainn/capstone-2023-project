import NewUserForm from "../forms/NewUserForm";
import FindUserForm from "../forms/FindUserForm";
import UpdateUserForm from "../forms/UpdateUserForm";
import DeleteUserForm from "../forms/DeleteUserForm";
import SortUsersForm from "../forms/SortUsersForm";
import SearchUsersForm from "../forms/SearchUsersForm";
import { useEffect, useState } from "react";
import weDoLogo from "../assets/logo.svg";
import RangeSearchSliderForm from "../forms/RangeSearchSliderForm"
import RangeSearchButton from "../forms/RangeSearchButton";


const UsersTest = () => {
  const [test, setTest] = useState({ apiResponse: "" });
  const [search, setSearch] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [users, setUsers] = useState([]);

  async function addUser(jason) {
    const idString = crypto.randomUUID();
    await fetch("http://localhost:9000/testAPI/users", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: idString,
        name: jason.name,
        age: jason.age,
      }),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  async function findUser(id) {
    const res = await fetch(`http://localhost:9000/testAPI/users/${id}`, {
      methods: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setSearch(response["Item"]["name"]));
  }

  async function updateUser(jason) {
    const res = await fetch(`http://localhost:9000/testAPI/users/${jason.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: jason.id,
        name: jason.name,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  async function deleteUser(id) {
    const res = await fetch(`http://localhost:9000/testAPI/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  function usersList() {
    useEffect(function effectFunction() {
      async function fetchUsers() {
        const response = await fetch("http://localhost:9000/testAPI/", {
          methods: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jason = await response.json();
        console.log(jason);
        setUsers(jason);
      }
      fetchUsers();
    }, []);
    console.log(users);
  }
  usersList();

  const getItems = () => {
    let htmlString = "";
    const theItems = (item) => {
      htmlString += `<li class="userItem">
      <h5>ID: ${item.id}</h5>
      <p>Name: ${item.name}</p>
      <p>Age: ${item.age}</p>
      </li>`;
    };
    if (users.length > 0) {
      users.forEach(theItems);
      const list = document.getElementById("itemsList");
      list.innerHTML = htmlString;
    }
  };

  getItems();

  const sortUsers = (sortValue) => {
    var sortedUsers;
    if (sortValue === "id") {
      sortedUsers = users.sort((a, b) => a.id.localeCompare(b.id));
    } else if (sortValue === "name") {
      sortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === "age") {
      sortedUsers = users.sort((a, b) => a.age - b.age);
    }

    let htmlString = "";
    const theItems = (item) => {
      htmlString += `<li class="userItem">
      <h5>ID: ${item.id}</h5>
      <p>Name: ${item.name}</p>
      <p>Age: ${item.age}</p>
      </li>`;
    };
    console.log(sortedUsers);
    if (users.length > 0) {
      sortedUsers.forEach(theItems);
      const list = document.getElementById("itemsList");
      list.innerHTML = htmlString;
    }
  };

  const searchUsers = (searchValue) => {
    let filter, ul, i, aString, htmlString;
    filter = searchValue.toLowerCase();
    ul = users;
    htmlString = "";
    if (ul != null) {
      /* li = ul.getElementsByTagName("li"); */
      for (i = 0; i < ul.length; i++) {
        aString = JSON.stringify(ul[i]);
        if (aString.toLowerCase().indexOf(filter) > -1) {
          if (ul[i].name != undefined) {
          htmlString += `<li class="userItem">
          <h5>ID: ${ul[i].id}</h5>
          <p>Name: ${ul[i].name}</p>
          <p>Age: ${ul[i].age}</p>
          </li>`;
          }
        }
        console.log(i, htmlString)
      }
      if (htmlString != "") {
        const list = document.getElementById("itemsList");
        list.innerHTML = htmlString;
      } else {
        const list = document.getElementById("itemsList");
        list.innerHTML = "Search not found";
      }
    }
  };

  const rangeSearchUsers = () => {
    let ul, i, htmlString, searchValues, value1, value2, text1, text2, num1, num2, arr;
    console.log(typeof document.getElementById("range-slider"))
    const text = document.getElementById("range-slider").innerHTML
    value1 = text.indexOf("value=")
    value2 = text.lastIndexOf("value=")
    text1 = text.substring(value1+7, value1+10)
    text2 = text.substring(value2+7, value2+10)
    if (text1.charAt(text1.length-1) == "\"") {
      text1 = text1.substring(0, text1.length-1)
    }
    if (text2.charAt(text2.length-1) == "\"") {
      text2 = text2.substring(0, text2.length-1)
    }
    num1 = parseInt(text1)
    num2 = parseInt(text2)
    arr = [num1, num2]
    console.log(arr)
    ul = users;
    console.log(users)
    htmlString = "";
    if (ul != null) {
      /* li = ul.getElementsByTagName("li"); */
      for (i = 0; i < ul.length; i++) {
        if (ul[i].age >= arr[0] && ul[i].age <= arr[1]) {
          if (ul[i].name != undefined) {
          htmlString += `<li class="userItem">
          <h5>ID: ${ul[i].id}</h5>
          <p>Name: ${ul[i].name}</p>
          <p>Age: ${ul[i].age}</p>
          </li>`;
          }
        }
        console.log(i, htmlString)
      }
      if (htmlString != "") {
        const list = document.getElementById("itemsList");
        list.innerHTML = htmlString;
      } else {
        const list = document.getElementById("itemsList");
        list.innerHTML = "Search not found";
      }
    }
  }

  return (
    <>
      <img src={weDoLogo} className="logo react" alt="React logo" />
      {/* <p id="apiResponse">{test.apiResponse}</p> */}
      <SearchUsersForm onSubmit={searchUsers} />
      <SortUsersForm onSubmit={sortUsers} />
      <RangeSearchSliderForm />
      <RangeSearchButton onClick={rangeSearchUsers}/>
      <ul id="itemsList"></ul>
      <NewUserForm onSubmit={addUser} />
      <FindUserForm onSubmit={findUser} />
      <UpdateUserForm onSubmit={updateUser} />
      <DeleteUserForm onSubmit={deleteUser} />
      <p>{search}</p>
    </>
  );
};

export default UsersTest;
