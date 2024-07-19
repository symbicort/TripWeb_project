import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge'; 
import { styled } from '@mui/material/styles';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Sidebar from './Sidebar'; 
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const pages = [
  { name: '여행', path: '/travel' },
  { name: '계획', path: '/plan' },
  { name: '친구', path: '/friend' },
  { name: '게시판', path: '/community' }
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [state, setState] = useState({ left: false, right: false });
  const controls = useAnimation();

  const updateHeaderScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateHeaderScroll);
    return () => window.removeEventListener('scroll', updateHeaderScroll);
  }, []);

  useEffect(() => {
    controls.start({
      bgcolor: scrollPosition < 100 && 'rgba(255, 255, 255, 0.9)',
      transition: { duration: 0.5 }
    });
  }, [scrollPosition, controls]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -2,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

  return (
    <>
      <motion.div
        animate={controls}
      >
        <AppBar 
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: scrollPosition < 100 ? 'rgba(0,0,0,0)' : 'rgba(255, 255, 255, 0.9)',
            backgroundImage: scrollPosition < 100 ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.41), rgba(0, 0, 0, 0))' : 'rgba(255, 255, 255, 255)',
            boxShadow: 'none',
            color: 'inherit'
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.path}
                    sx={{ my: 2, color: 'black', fontWeight: 'bold', fontSize : '1rem', marginLeft : '3%' }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <IconButton aria-label="mail">
                    <StyledBadge badgeContent={4} color="secondary">
                      <MailIcon color="action" />
                    </StyledBadge>
                  </IconButton>

                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>

                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/correct-image-path.jpg" />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      <Sidebar state={state} toggleDrawer={toggleDrawer} />
    </>
  );
}
