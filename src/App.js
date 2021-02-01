import React, { useState, useEffect, createContext } from 'react';
import './App.css'
import LoginManager from './LoginManager/LoginManager';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home/Home';
import Shipment from './Shipment/Shipment';
import PrivateRoute from './PrivateRoute/PrivateRoute';


export const userContext = createContext();
function App() {
  
const [loggedInUser, setLoggedInUser] = useState({});
console.log(loggedInUser)
  return (
    <userContext.Provider  value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <h3>This is Main App {loggedInUser.email}</h3>
      
      <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <LoginManager />
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment />
          </PrivateRoute>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
     
    </Router>
 
     
    
  
    </userContext.Provider>
   

  );
}



export default App;
