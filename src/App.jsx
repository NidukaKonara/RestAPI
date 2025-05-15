import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./components/SignUp";
import FavoritesPage from "./components/FavoritesPage";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ If you still want to protect some other route, use PrivateRoute there */}
          {/* Example: */}
          {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        </Routes>
      </div>
    </AuthProvider>
  );
}