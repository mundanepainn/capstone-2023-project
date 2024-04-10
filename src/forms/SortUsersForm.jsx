//form for newTodo and handling submit event
import { useState } from "react";

export default function SortUsersForm({onSubmit}) {
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
          <label htmlFor="item">Sort By:</label>
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Sort</button>
      </form>
      )


}