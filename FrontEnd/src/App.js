import './App.css';
import Chat from "./Pages/Chat"
import Login from "./Pages/Auth/Login"
import Register from "./Pages/Auth/Register"
import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Sidebar from './Components/Sidebar';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import { ChatContextProvider } from './Context/ChatContext';
import PhoneVerify from './Pages/Auth/PhoneVerify';
import Employee from './Pages/Employee';
import EmailVerify from './Pages/Auth/EmailVerify';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <ChatContextProvider user={user}>
        <Sidebar />
        <Container className="text-secondary">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/emailverify/:token" element={<EmailVerify />} />
            <Route path="/phoneverify" element={<PhoneVerify />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </ChatContextProvider>
    </div>
  );
}

export default App;
