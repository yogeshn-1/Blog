import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Header, Footer, Loader } from "./components/index.js";
import { Outlet } from "react-router-dom";
import "aos/dist/aos.css";
import Aos from "aos";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init();
  }, []);
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <div className="h-screen bg-black flex justify-center items-center ">
      <Loader>Loading App</Loader>
    </div>
  ) : (
    <div
      className="min-h-screen flex flex-col items-center text-white"
      style={{
        background:
          "linear-gradient( 109.6deg,  rgba(254,253,205,1) 11.2%, rgba(163,230,255,1) 91.1% )",
      }}
    >
      <Header />
      <main className="w-full flex-grow pt-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
