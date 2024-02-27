import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Header, Footer, Loader } from "./components/index.js";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
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
    <div className="h-screen bg-black ">
      <Loader>Loading App</Loader>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col bg-[#9AD0C2] items-center text-white">
      <Header />
      <main className="w-full flex-grow pt-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
