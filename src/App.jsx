import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Todos from './pages/Todos';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem('token') ? <Todos /> : <Navigate to="/signup" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
