import "./App.css";
import React, { useContext } from "react";
import { MainContainer } from "./components/MainContainer"
import { Login } from "./components/Login";
import { CreateNewAccount } from "./components/CreateNewAccount";
import { AllTodoLists } from "./components/AllTodoLists";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { TokenProvider, TokenContext } from "./contexts/TokenContext";

function App() {

  const [token] = useContext(TokenContext)

  return (
      <Router>
        <Switch>
          <MainContainer>
            {<Route path="/create-new-account">
              <CreateNewAccount />
            </Route>}
            <Route path="/login">
              <Login />
            </Route>

            {token ? <Route exact path="/">
              <AllTodoLists />
            </Route> :
            <Redirect to="/login" />}

          </MainContainer>
        </Switch>
      </Router>
  );
}

export default App;
