import { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Landing from "./components/Landing";
import Home from "./components/Home";
import CharacterSheet from "./components/CharacterSheet";
import Error from "./components/Error";
import NotFound from "./components/NotFound";

import Login from "./components/Login";
import SignUpForm from "./components/SignUpForm";
import AuthContext from "./contexts/AuthContext";

// Landing
// Login
// Home
// CharacterSheet
// NotFound

import { refreshToken, logout } from "./services/authAPI";

const TIMEOUT_MILLISECONDS = 14 * 60 * 1000;

function App() {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false);

  const resetUser = useCallback(() => {
    refreshToken()
      .then((user) => {
        setUser(user);
        setTimeout(resetUser, TIMEOUT_MILLISECONDS);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setInitialized(true));
  }, []);

  useEffect(() => {
    resetUser();
  }, [resetUser]);

  const auth = {
    user: user,
    handleLoggedIn(user) {
      setUser(user);
      setTimeout(resetUser, TIMEOUT_MILLISECONDS);
    },
    hasAuthority(authority) {
      return user?.authorities.includes(authority);
    },
    logout() {
      logout();
      setUser(null);
    },
  };

  if (!initialized) {
    return null;
  }

  const renderWithAuthority = (Component, ...authorities) => {
    for (let authority of authorities) {
      if (auth.hasAuthority(authority)) {
        return <Component />;
      }
    }
    return <Error />;
  };

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <main className="container">
          <Routes>
            <Route path="/login" element ={!user ? <Login /> : <Navigate to="/" replace={true} />} />
            <Route path="/" element={renderWithAuthority(Landing, "ADMIN", "USER")} />
            {/* <Route path="/home" element={<Home />} />
            <Route path="/sheets" element={<CharacterSheet />} /> */}
            {/* <Route
              path="/agents/add"
              element={<AgentForm />}
            />
            <Route
              path="/agents/edit/:id"
              element={<AgentForm />}
            /> */}
            <Route path="/error" element={<Error />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
