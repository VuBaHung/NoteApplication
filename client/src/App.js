import Notes from "./components/Notes";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const verified = await axios.get("/user/verify", {
          headers: { Authorization: token },
        });
        // console.log(verified);
        setIsLogin(verified.data);
        if (verified.data === false) return localStorage.clear();
      }
    };
    checkLogin();
  }, []);
  return (
    <div>
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default App;
