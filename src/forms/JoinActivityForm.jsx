//form for newTodo and handling submit event
import { useState } from "react";

export default function JoinActivityForm({onSubmit}) {
    const [newItem, setNewItem] = useState(``);
    const [newItem2, setNewItem2] = useState(``);
    
    function handleSubmit(e) {
        e.preventDefault()
        setNewItem(``)
        setNewItem2(``)
        if(newItem === "") return
        const jason = {
          "activityID": newItem,
          "userID": newItem2
        }
        onSubmit(jason)
      }
    

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Join:  </label>
          Activity ID:
          <input
            required
            value={newItem}
            name="input1"
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
          User ID:
          <input
          required
            value={newItem2}
            name="input2"
            onChange={e => setNewItem2(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Update</button>
      </form>
      )


}