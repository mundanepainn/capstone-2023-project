//form for newTodo and handling submit event
import { useState } from "react";

export default function DeleteActivityForm({onSubmit}) {
    const [activityID, setActivityID] = useState(``);
    const [hostID, setHostID] = useState(``);
    
    function handleSubmit(e) {
        e.preventDefault()
        setActivityID(``)
        setHostID(``)
        if(activityID === "") return
        const jason = {
          'activityID': activityID,
          'hostID': hostID
        }
        onSubmit(jason)
      }

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Delete Activity By ID  </label>
          Activity ID
          <input
            value={activityID}
            onChange={e => setActivityID(e.target.value)}
            type="text"
            id="item"
          />
          Host ID
          <input
            value={hostID}
            onChange={e => setHostID(e.target.value)}
            type="text"
            id="item"
          />
        </div>
        <button className="btn">Delete</button>
      </form>
      )


}