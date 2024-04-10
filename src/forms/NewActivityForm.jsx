//form for newTodo and handling submit event
import { useState } from "react";

export default function NewActivityForm({onSubmit}) {
    const [name, setName] = useState(``);
    const [description, setDescription] = useState(``);
    const [location, setLocation] = useState(``);
    const [date, setDate] = useState(``);
    const [time, setTime] = useState(``);
    const [ageRestrict, setAgeRestrict] = useState(``);
    const [minAge, setMinAge] = useState(``);
    const [maxAge, setMaxAge] = useState(``);
    const [genderRestrict, setGenderRestrict] = useState(``);
    const [genderReq, setGenderReq] = useState(``);
    const [privateActivity, setPrivateActivity] = useState(``);
    const [photoURL, setPhotoURL] = useState(``);
    const [userID, setUserID] = useState(``)

    
    function handleSubmit(e) {
        e.preventDefault()
        setName(``)
        setDescription(``)
        setLocation(``)
        setDate(``)
        setTime(``)
        setAgeRestrict(``)
        setMinAge(``)
        setMaxAge(``)
        setGenderRestrict(``)
        setGenderReq(``)
        setPrivateActivity(``)
        setPhotoURL(``)
        setUserID(``)
        if(name === "") return
        const jason = {
          "name": name,
          "description": description,
          "location": location,
          "date": date,
          "time": time,
          "ageRestrict": ageRestrict,
          "minAge": minAge,
          "maxAge": maxAge,
          "genderRestrict": genderRestrict,
          "genderReq": genderReq,
          "privateActivity": privateActivity,
          "photoURL": photoURL,
          "userID": userID

        }
        onSubmit(jason)
      }

return (
<form onSubmit={ handleSubmit} className="new-item-form">
        <div className="form-row">
          <label htmlFor="item">New Activity:  </label>
          name:
          <input
          required
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            id="item"
            size="6"
          />
          description:
          <input
            value={description}
            name="input2"
            onChange={e => setDescription(e.target.value)}
            type="text"
            id="item"
            size="18"
          />
          location:
          <input
          required
            value={location}
            onChange={e => setLocation(e.target.value)}
            type="text"
            id="item"
            size="14"
          />
          date:
          <input
          required
            value={date}
            onChange={e => setDate(e.target.value)}
            type="text"
            id="item"
            size="6"
          />
          time:
          <input
          required
            value={time}
            onChange={e => setTime(e.target.value)}
            type="text"
            id="item"
            size="4"
          />
          ageRestrict:
          <input
          required
            value={ageRestrict}
            onChange={e => setAgeRestrict(e.target.value)}
            type="text"
            id="item"
            size="3"
          />
          minAge:
          <input
            value={minAge}
            onChange={e => setMinAge(e.target.value)}
            type="text"
            id="item"
            size="2"
          />
          maxAge:
          <input
            value={maxAge}
            onChange={e => setMaxAge(e.target.value)}
            type="text"
            id="item"
            size="2"
          />
          genderRestrict:
          <input
          required
            value={genderRestrict}
            onChange={e => setGenderRestrict(e.target.value)}
            type="text"
            id="item"
            size="2"
          />
          genderReq:
          <input
            value={genderReq}
            onChange={e => setGenderReq(e.target.value)}
            type="text"
            id="item"
            size="6"
          />
          privateActivity:
          <input
          required
            value={privateActivity}
            onChange={e => setPrivateActivity(e.target.value)}
            type="text"
            id="item"
            size="2"
          />
          photoURL:
          <input
          required
            value={photoURL}
            onChange={e => setPhotoURL(e.target.value)}
            type="text"
            id="item"
            size="10"
          />
          userID:
          <input
          required
            value={userID}
            onChange={e => setUserID(e.target.value)}
            type="text"
            id="item"
            size="10"
          />
        </div>
        <button className="btn" size="10">Add</button>
      </form>
      )


}