import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FloatingBoard from './FloatingBoard';




export default function FloatingButton(){
    const [open, setOpen] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
      setOpen(!open)
    };
  
    const openBaord = Boolean(anchorEl);
    const id = openBaord ? 'simple-popper' : undefined;

    const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
      };

    return (
        <>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleClick} aria-describedby={id}>
        {
            open ? <CloseIcon /> : <AddIcon /> 
        }
      </Fab>
      <FloatingBoard id={id} open={openBaord} anchorEl={anchorEl}/>
  
      </>
    )
}