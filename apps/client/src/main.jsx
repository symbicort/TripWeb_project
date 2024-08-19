import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'
// import { QueryClinet, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClinet();


ReactDOM.createRoot(document.getElementById('root')).render(

  // <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>  
  // </QueryClientProvider>

  
)
