import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("login");

  // If logged in, automatically go to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setPage("dashboard");
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setPage("login");
  };

  return (
    <div>
      {/* PAGE RENDERING */}
      {page === "login" && <Login goToRegister={() => setPage("register")} goToDashboard={() => setPage("dashboard")} />}
      {page === "register" && <Register goToLogin={() => setPage("login")} />}
      {page === "dashboard" && <Dashboard onLogout={handleLogout} />}

      {/* TOP NAV BUTTONS */}
      <div className="absolute top-4 right-4 flex gap-3">
        {page !== "login" && (
          <button
            onClick={() => setPage("login")}
            className="px-4 py-2 bg-white/30 backdrop-blur-lg text-white rounded-md"
          >
            Login
          </button>
        )}

        {page !== "register" && (
          <button
            onClick={() => setPage("register")}
            className="px-4 py-2 bg-white/30 backdrop-blur-lg text-white rounded-md"
          >
            Register
          </button>
        )}

        {page === "dashboard" && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-400 text-white rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
