import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./components/Landing";
import Home from "./components/Home";
import CharacterSheet from "./components/CharacterSheet";
import NotFound from "./components/NotFound";

// Landing
// Login
// Home
// CharacterSheet
// NotFound

function App() {
  return (
    <Router>
      <main className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sheets" element={<CharacterSheet />} />
          {/* <Route
						path="/agents/add"
						element={<AgentForm />}
					/>
					<Route
						path="/agents/edit/:id"
						element={<AgentForm />}
					/> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
