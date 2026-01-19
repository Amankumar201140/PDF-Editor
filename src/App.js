import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PersonalRoute from "./Components/PersonalRoute";
import PDFViewer from "./Components/PdfViewer";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-richblack-900">
      
      <header className="h-16 border-b border-richblack-700">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </header>

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />} />

          <Route
            path="/PdfViewer"
            element={
              <PersonalRoute isLoggedIn={isLoggedIn}>
                <PDFViewer />
              </PersonalRoute>
            }
          />

          <Route path="/pdf-viewer" element={<PDFViewer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
