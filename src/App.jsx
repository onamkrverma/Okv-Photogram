import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import FirebaseState from "./context/FirebaseState";
import LoadPhotogram from "./components/loading/LoadPhotogram";

const Login = lazy(() => import("./pages/login/Login"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Home = lazy(() => import("./pages/home/Home"));
const Explore = lazy(() => import("./pages/explore/Explore"));
const Profile = lazy(() => import("./pages/profile/Profile"));

function App() {
  const authUser = JSON.parse(localStorage.getItem("authUser"));

  const PrivateRoutes = () => {
    return authUser ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <>
      <FirebaseState>
        <BrowserRouter>
          <Suspense fallback={<LoadPhotogram />}>
            <Routes>
              <Route
                path="/"
                element={
                  authUser === null ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* private routes */}
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile/:username" element={<Profile />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FirebaseState>
    </>
  );
}

export default App;
