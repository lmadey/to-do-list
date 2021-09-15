import "./App.css";
import { MainContainer } from "./components/MainContainer"
import { Login } from "./components/Login";
import { CreateNewAccount } from "./components/CreateNewAccount";
import { AllTodoLists } from "./components/AllTodoLists";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { TokenProvider } from "./contexts/TokenContext";

function App() {
  return (
    <TokenProvider>
      <Router>
        <MainContainer>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/create-new-account">
            <CreateNewAccount />
          </Route>
          <Route path="/home">
            <AllTodoLists />
          </Route>
        </MainContainer>
      </Router>
    </TokenProvider>
  );
}

export default App;
