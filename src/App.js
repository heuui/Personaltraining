import './App.css';
import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import TabApp from './components/TabApp';


function App() {
  return(
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            Personaltraining
          </Typography>
        </Toolbar>
      </AppBar>
      <TabApp />
    </div>

  );
}

export default App;

