import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AddMember from "./pages/AddMember";
import EditMember from "./pages/EditMember";
import ViewMembers from "./pages/ViewMembers";
import MemberDetails from "./pages/MemberDetails";

import "./index.css";

function App() {
  return (
    <Router>
      {/* Global Navbar */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddMember />} />
        <Route path="/edit/:id" element={<EditMember />} />
        <Route path="/members" element={<ViewMembers />} />
        <Route path="/member/:id" element={<MemberDetails />} />
      </Routes>
    </Router>
  );
}

export default App;