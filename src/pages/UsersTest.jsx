import NewUserForm from "../forms/NewUserForm";
import FindUserForm from "../forms/FindUserForm";
import UpdateUserForm from "../forms/UpdateUserForm";
import DeleteUserForm from "../forms/DeleteUserForm";
import SortItemsForm from "../forms/SortItemsForm";
import SearchUsersForm from "../forms/SearchUsersForm";
import { useEffect, useState } from "react";
import weDoLogo from "../assets/newlogo.svg";
import RangeSearchSliderForm from "../forms/RangeSearchSliderForm"
import RangeSearchButton from "../forms/RangeSearchButton";


const UsersTest = () => {
  const base_url = import.meta.env.VITE_BACKEND;

  const [test, setTest] = useState({ apiResponse: "" });
  const [search, setSearch] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [users, setUsers] = useState([]);

  async function addUser(jason) {
    const idString = crypto.randomUUID();
    await fetch(base_url + "/testAPI/users", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: idString,
        name: jason.name,
        email: jason.email,
        dob: jason.dob,
        gender: jason.gender,
        interests: jason.interests,
        profilePhoto: jason.photo,
        attendingEvents: "",
        hostingEvents: ""
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
    const res = await fetch(base_url + `/testAPI/users/${id}`, {
      methods: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setSearch(response["Item"]["name"]));
  }

  async function updateUser(jason) {
    const res = await fetch(base_url + `/testAPI/users/${jason.id}`, {
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
    const res = await fetch(base_url + `/testAPI/deleteUser/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  function usersList() {
    useEffect(function effectFunction() {
      async function fetchUsers() {
        const response = await fetch(base_url + "/testAPI/", {
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
    let today = new Date()
    const theItems = (item) => {
      console.log("here", item.interests, item.hostingEvents, item.attendingEvents)
      let dob = new Date(item.dob)
      let calculatedAge = Math.floor((today - dob) / (365 * 24 * 60 * 60 * 1000))
      htmlString += `<li class="userItem">
      <h4>ID: ${item.id}</h4>
      <p>Name: ${item.name}</p>
      <img src="${item.profilePhoto}" height="150px" width="150px" alt="Photo">
      <p>DoB: ${item.dob}</p>
      <p>age: ${calculatedAge}</p>
      <p>Gender: ${item.gender}</p>
      <p>Email: ${item.email}</p>
      <p>Interests: ${item.interests.join(", ")}</p>
      <p>Hosting: ${item.hostingEvents.join(", ")}</p>
      <p>Attending: ${item.attendingEvents.join(", ")}</p>
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
      <p>DoB: ${item.dob}</p>
      <p>Gender: ${item.gender}</p>
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
          <p>DoB: ${ul[i].dob}</p>
          <p>Gender: ${ul[i].gender}</p>
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
      <SortItemsForm onSubmit={sortUsers} />
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
