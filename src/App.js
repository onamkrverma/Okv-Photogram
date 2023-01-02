import { BrowserRouter,Routes,Route} from "react-router-dom";
import FirebaseState from "./context/FirebaseState";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from "./pages/signup/Signup";

function App() {
  return (
    <>
    <FirebaseState>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    
    </Routes>
    </BrowserRouter>
    </FirebaseState>
    </>
  );
}

export default App;
