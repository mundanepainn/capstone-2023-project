//form for newTodo and handling submit event
import { useState } from "react";

export default function NewUserForm({onSubmit}) {
    const [newItem, setNewItem] = useState(``);
    const [newItem2, setNewItem2] = useState(``);
    
    function handleSubmit(e) {
        e.preventDefault()
        setNewItem(``)
        setNewItem2(``)
        if(newItem === "") return
        const jason = {
          "name": newItem,
          "age": newItem2
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
          />
          age:
          <input
          required

            value={newItem2}
            name="input2"
            onChange={e => setNewItem2(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Add</button>
      </form>
      )


}