//form for newTodo and handling submit event
import { useState } from "react";

export default function LeaveActivity({onSubmit}) {
    const [activityID, setActivityID] = useState(``);
    const [userID, setUserID] = useState(``);

    function handleSubmit(e) {
        e.preventDefault()
        setActivityID(``)
        setUserID(``)
        if(userID === "") return
        const jason = {
          "activityID": activityID,
          "userID": userID
        }
        onSubmit(jason)
      }

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">Leave Activity</label>
          <input
            value={activityID}
            onChange={e => setActivityID(e.target.value)}
            type="text"
            id="item"
          />
        User ID:
          <input
          required
            value={userID}
            name="input2"
            onChange={e => setUserID(e.target.value)}
            type="text"
            id="item"
          />
          <button className="btn">Leave</button>
        </div>
        
      </form>
      )


}