import React, { useState } from 'react';
import './App.scss';
import RegisterForm from './pages/registerForm/RegisterForm';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './pages/homePage/HomePage.jsx';
import LoginForm from './pages/loginForm/LoginForm';
import OnBoarding from './pages/onBoarding/OnBoarding';
import Records from './pages/records/Records';
import FilterRecord from './pages/filterRecord/FilterRecord';
import { DataProvider } from './shared/components/DataContext';

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'))


  return (

    <div className="App">
      {/* <header className="App-header"> */}

        <div >
          <Router>
            <Switch>

              <Route path="/register" >
                <RegisterForm></RegisterForm>
              </Route>

              <Route path="/filteredRecords" >
                <RegisterForm></RegisterForm>
              </Route>
              <Route path="/records" >
                <Records></Records>
              </Route>

              <Route path="/login" >
                <LoginForm fnSetIsLogged={setIsLogged} ></LoginForm>
              </Route>
              <Route path="/onBoarding">
                {isLogged && <OnBoarding isLogged={isLogged} />}
              </Route>
              <Route path="/" >
                <HomePage></HomePage>
              </Route>

            </Switch>
          </Router>
        </div>
      {/* </header> */}
    </div>

  );
}



export default App;
