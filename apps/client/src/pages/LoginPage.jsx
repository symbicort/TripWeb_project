import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const socialLinks = [
  {
    name: '카카오톡',
    icon: 'https://www.myro.co.kr/_next/static/media/kakaolink_btn.d6c9c8ae.png',
  },
  {
    name: '구글',
    icon: 'https://www.myro.co.kr/_next/static/media/google_btn.67c87010.png',
  },
  {
    name: '네이버',
    icon: 'https://www.myro.co.kr/_next/static/media/naver_btn.f60c41fb.png',
  },
];

export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzY3fDB8MHwxfGFsbHwxfHx8fHx8fHwxNjMxNTMyMTA1&ixlib=rb-1.2.1&q=80&w=1080")`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Link href="#" variant="body2">
                비밀번호을 잊으셨어요?
              </Link>

              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                로그인
              </Button>
              <Grid container justifyContent="center" spacing={2}>
                <Grid item style={{ display: 'flex' }}>
                  <Typography component="p" variant="body2" sx={{ mr: 1, textAlign: 'center' }}>
                    아직 회원이 아니세요?
                  </Typography>
                  <Link href="#" variant="body2">
                    {"이메일 회원가입"}
                  </Link>
                </Grid>
              </Grid>
              <Box sx={{ width: '100%', textAlign: 'center', mt: 2 }}>
                <hr 
                  style={{
                    border: 'none', 
                    borderTop: '1px solid #e0e0e0',
                    margin: '1.5rem 0'
                  }} 
                />
                <Typography sx={{ color: '#918888' }}>
                  sns 간편 로그인
                </Typography>
              </Box>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {socialLinks.map((link) => (
                  <Grid item xs={4} key={link.name}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Avatar
                        src={link.icon}
                        sx={{ width: 50, height: 50, borderRadius: '0%' }}
                        alt={link.name}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
