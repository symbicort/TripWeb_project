import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FloatingButton(){
    const [open, setOpen] = useState(false)


    const fabStyle = {
        position: 'fixed',
        bottom: 16,
        right: 16,
      };

    return (
        <>
        <Fab sx={fabStyle} color="primary" aria-label="add" onClick={()=>{setOpen(!open)}}>
        {
            open ? <FavoriteIcon /> : <AddIcon /> 
        }
      </Fab>
      </>
    )
}