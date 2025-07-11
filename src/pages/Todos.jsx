import { useNavigate } from 'react-router-dom';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Todos.css'; // ✅ Import CSS
import { jwtDecode } from 'jwt-decode';


const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [editTodo, setEditTodo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const fetchTodos = async () => {
        const token = localStorage.getItem('token');

        if (token) {
            const decoded = jwtDecode(token); // ✅ decode token
            setUserName(decoded.name);         // ✅ set name
        }
        try {
            const res = await axios.get('https://vercel-todo-backend.onrender.com/api/todos', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos(res.data);
        } catch (err) {
            alert('Session expired. Please log in again.');
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="todos-container">
            <div className="todos-header">
                <h2>Todo App (MERN)</h2>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '16px' }}>
                    👋 Welcome, {userName}
                </p>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <input
                type="text"
                className="search-input"
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <TodoForm fetchTodos={fetchTodos} editTodo={editTodo} setEditTodo={setEditTodo} />
            <TodoList
                todos={todos}
                fetchTodos={fetchTodos}
                setEditTodo={setEditTodo}
                searchQuery={searchQuery}
            />
        </div>
    );
};

export default Todos;
