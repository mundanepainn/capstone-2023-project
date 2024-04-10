//form for newTodo and handling submit event
import { useState } from "react";

export function DeleteUserForm({onSubmit}) {
    const [newItem, setNewItem] = useState(``);
    
    function handleSubmit(e) {
        e.preventDefault()
        setNewItem(``)
        if(newItem === "") return
        onSubmit(newItem)
      }

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Delete User By ID</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Delete</button>
      </form>
      )


}