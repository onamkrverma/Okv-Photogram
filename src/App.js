import { lazy, Suspense } from "react";
import { BrowserRouter,Routes,Route} from "react-router-dom";
import FirebaseState from "./context/FirebaseState";
import LoadInstagram from "./components/loading/LoadInstagram";


const Login = lazy(()=> import ('./pages/login/Login'));
const Signup = lazy(()=> import ('./pages/signup/Signup'));
const Home = lazy(()=> import ('./pages/home/Home'));
const Explore = lazy(()=> import ('./pages/explore/Explore'));
const Profile = lazy(()=> import ('./pages/profile/Profile'))

function App() {

  return (
    <>
    <FirebaseState>
    <BrowserRouter>
    <Suspense fallback={<LoadInstagram/> }>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/explore' element={<Explore/>}/>
      <Route path='/profile/:username' element={<Profile/>}/>
    
    </Routes>
    </Suspense>
    </BrowserRouter>
    </FirebaseState>
    </>
  );
}

export default App;
