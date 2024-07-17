import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function Mainpage(){
    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="text">Create</Button>
                <Button variant="contained">Update</Button>
                <Button variant="outlined">Delete</Button>
            </Stack>

        </>
        
    )
}