import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index.js";
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
    <div>Loading.....</div>
  ) : (
    <div className="h-screen flex flex-col bg-slate-500 items-center">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
