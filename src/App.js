import "./App.css";
import { Home } from "./pages";
import { UserContextProvider } from "./contexts/user";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function App() {
  return (
    // <UserContextProvider>
    //   <div className="app">
    //     <Home />
    //   </div>
    // </UserContextProvider>
    <div className="App">
      <header>
        
        <h1>We now have Auth!</h1>
      </header>
      <AmplifySignOut />
    </div>

  );
}

export default withAuthenticator(App);
