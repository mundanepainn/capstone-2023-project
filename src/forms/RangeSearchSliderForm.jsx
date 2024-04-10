import * as React from "react";
import Slider from "@mui/material-next/Slider";
import { useState } from "react";

export default function RangeSearchSlider() {
  const [value, setValue] = useState([18, 30]);

  function handleChange(e, data) {
    e.preventDefault();
    setValue(data);
  }

  const handleChangeCommitted = (event, newValue) => {
    setValue(newValue);
    console.log(value)
};
  return (
      <Slider
        getAriaLabel={() => "Temperature range"}
        id="range-slider"
        value= {value}
        number={[value]}
        // onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
      />
      
  );
}
