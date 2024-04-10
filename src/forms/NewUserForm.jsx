//form for newTodo and handling submit event
import { useState } from "react";

export default function NewUserForm({onSubmit}) {
    const [newItem, setNewItem] = useState(``);
    const [newItem2, setNewItem2] = useState(``);
    const [newItem3, setNewItem3] = useState(``);
    const [newItem4, setNewItem4] = useState(``);
    const [newItem5, setNewItem5] = useState(``);
    const [newItem6, setNewItem6] = useState(``);
    
    function handleSubmit(e) {
        e.preventDefault()
        setNewItem(``)
        setNewItem2(``)
        setNewItem3(``)
        setNewItem4(``)
        setNewItem5(``)
        setNewItem6(``)
        if(newItem === "") return
        const jason = {
          "name": newItem,
          "email": newItem2,
          "dob": newItem3,
          "gender": newItem4,
          "interests": newItem5,
          "photo": newItem6
        }
        onSubmit(jason)
      }

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New User:  </label>
          name:
          <input
          required
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
            size = "5"
          />
          email:
          <input
          required

            value={newItem2}
            name="input2"
            onChange={e => setNewItem2(e.target.value)}
            type="text"
            id="item"
            size="10"
          />
          dob:
          <input
          required

            value={newItem3}
            name="input2"
            onChange={e => setNewItem3(e.target.value)}
            type="text"
            id="item"
            size="5"
          />
          gender:
          <input
          required

            value={newItem4}
            name="input2"
            onChange={e => setNewItem4(e.target.value)}
            type="text"
            id="item"
            size="3"
          />
          interests:
          <input
          required

            value={newItem5}
            name="input2"
            onChange={e => setNewItem5(e.target.value)}
            type="text"
            id="item"
            size="10"
          />
          photo:
          <input
          required

            value={newItem6}
            name="input2"
            onChange={e => setNewItem6(e.target.value)}
            type="text"
            id="item"
            size="10"
          />
        </div>
        <button className="btn" >Add</button>
      </form>
      )


}