import axios from 'axios';

const TodoList = ({ todos, fetchTodos, setEditTodo, searchQuery }) => {
    const token = localStorage.getItem('token');

    const toggleComplete = async (todo) => {
        try {
            await axios.put(
                `http://localhost:5000/api/todos/${todo._id}`,
                { completed: !todo.completed },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchTodos();
        } catch (err) {
            alert(err.response?.data?.message || 'Toggle failed');
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchTodos();
        } catch (err) {
            alert(err.response?.data?.message || 'Delete failed');
        }
    };

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ul>
            {filteredTodos.map((todo) => (
                <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                    <span onClick={() => toggleComplete(todo)}>{todo.title}</span>
                    {todo.dueDate && (
                        <div style={{
                            fontSize: '14px',
                            color: new Date(todo.dueDate) < new Date() ? 'red' : 'gray',
                        }}>
                            Due: {new Date(todo.dueDate).toLocaleDateString()}
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            style={{ backgroundColor: '#ffa500' }}
                            onClick={() => setEditTodo(todo)}
                        >
                            Edit
                        </button>
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
