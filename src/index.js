import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'chartjs-plugin-datalabels';
import {createTheme} from "@mui/material";
import {MuiThemeProvider} from "@material-ui/core";
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff4b31'
        },
        secondary: {
            main: '#ff4b31'
        }
    }
});


root.render(
  <React.StrictMode>
      <MuiThemeProvider theme={theme}>
      <App />
      </MuiThemeProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
