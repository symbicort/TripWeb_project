import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Popper from '@mui/material/Popper';
import { useEffect, useState } from 'react';



const messageExamples = [
  {
    primary: 'Brunch this weekend?',
    secondary: "I'll be in your neighborhood doing errands.",
    person: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Summer BBQ',
    secondary: "Wish I could come, but I'm out of town this weekend.",
    person: '/static/images/avatar/2.jpg',
  },
  {
    primary: 'Oui Oui',
    secondary: 'Do you have any Paris recs? Have you ever been?',
    person: '/static/images/avatar/3.jpg',
  },
];

const favoritesExamples = [
  {
    primary: 'Favorite 1',
    secondary: 'This is a favorite message',
    person: '/static/images/avatar/1.jpg',
  },
  {
    primary: 'Favorite 2',
    secondary: 'This is another favorite message',
    person: '/static/images/avatar/4.jpg',
  },
];

const archiveExamples = [
  {
    primary: 'Archived 1',
    secondary: 'This is an archived message',
    person: '/static/images/avatar/6.jpg',
  },
  {
    primary: 'Archived 2',
    secondary: 'This is another archived message',
    person: '/static/images/avatar/7.jpg',
  },
];

const listData = {
  0: messageExamples,
  1: favoritesExamples,
  2: archiveExamples,
};

export default function FloatingBoard({ open, id, anchorEl }) {
  const [value, setValue] = useState(0);
  const [messages, setMessages] = useState(() => messageExamples);
  const [favorites, setFavorites] = useState(() => favoritesExamples);
  const [archived, setArchived] = useState(() => archiveExamples);

  useEffect(() => {
    setMessages(messageExamples);
    setFavorites(favoritesExamples);
    setArchived(archiveExamples);
  }, [open, id, anchorEl]);

  const renderList = () => {
    return listData[value] || messageExamples;
  };

  return (
    <Popper id={id} open={open} anchorEl={anchorEl}>
      <Box sx={{ pb: 30, background: 'gray', marginBottom: 3, marginRight : 3 }}>
        <CssBaseline />
        <List>
          {renderList().map(({ primary, secondary, person }) => (
            <ListItemButton key={person}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={person} />
              </ListItemAvatar>
              <ListItemText primary={primary} secondary={secondary} />
            </ListItemButton>
          ))}
        </List>
        <Paper sx={{ position: 'fixed', bottom: 10, left: 0, right: 24 }} elevation={3}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </Popper>
  );
}
