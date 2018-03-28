import React from 'react';
import MainRoute from './routes/MainRoute';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme/theme.config';
import store from './redux/store'
import './App.css';
import { Provider } from 'react-redux';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <MainRoute />        
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
