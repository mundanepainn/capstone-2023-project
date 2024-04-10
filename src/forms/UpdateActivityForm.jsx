//form for newTodo and handling submit event
import { useState } from "react";

export default function UpdateActivityForm({onSubmit}) {
    const [newItem, setNewItem] = useState(``);
    const [newItem2, setNewItem2] = useState(``);
    const [newItem3, setNewItem3] = useState(``);
    
    function handleSubmit(e) {
        e.preventDefault()
        setNewItem(``)
        setNewItem2(``)
        setNewItem3(``)
        if(newItem === "") return
        const jason = {
          "activityID": newItem,
          "attribute": newItem2,
          "change": newItem3
        }
        onSubmit(jason)
      }
    

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Update:  </label>
          Activity ID:
          <input
            required
            value={newItem}
            name="input1"
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
          Attribute:
          <input
          required
            value={newItem2}
            name="input2"
            onChange={e => setNewItem2(e.target.value)}
            type="text"
            id="item"
          />
          Change:
          <input
          required
            value={newItem3}
            name="input3"
            onChange={e => setNewItem3(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Update</button>
      </form>
      )


}