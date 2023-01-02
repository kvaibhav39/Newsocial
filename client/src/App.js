import HomeScreen from "./components/HomeScreen";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";

import { useSelector } from "react-redux";
import { useState } from "react";

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const user = useSelector((state) => state?.user?.user);
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/user/:id" element={<Profile />} />
            <Route path="/messages" element={<Messages />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
