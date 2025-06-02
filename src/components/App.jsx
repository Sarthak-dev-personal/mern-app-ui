import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Body from "./Body";
import Login from "./login";
import Profile from "./Profile";
import Feed from "./Feed";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={ <Body/> }>
            <Route path="/" element={ <Feed /> }></Route>
            <Route path="/login" element={ <Login /> }></Route>
            <Route path="/profile" element={ <Profile /> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
