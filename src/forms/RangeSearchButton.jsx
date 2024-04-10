import * as React from "react";
import Button from "@mui/material/Button";

export default function RangeSearchButton({onClick}) {

function handleClick(e) {
        e.preventDefault()
        onClick([18, 30])
      }


  return ( 
    <Button
     variant="contained"
     onClick={ handleClick }>
        Apply
      </Button>
      
  );
}
