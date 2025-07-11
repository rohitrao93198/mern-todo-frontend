import { useEffect, useState } from 'react';
import axios from 'axios';

const TodoForm = ({ fetchTodos, editTodo, setEditTodo }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (editTodo) {
            setTitle(editTodo.title);
            setDueDate(editTodo.dueDate ? editTodo.dueDate.split('T')[0] : '');
        }
    }, [editTodo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        const payload = { title, dueDate };
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        try {
            if (editTodo) {
                await axios.put(`http://localhost:5000/api/todos/${editTodo._id}`, payload, config);
                setEditTodo(null);
            } else {
                await axios.post('http://localhost:5000/api/todos', payload, config);
            }

            setTitle('');
            setDueDate('');
            fetchTodos();
        } catch (err) {
            alert(err.response?.data?.message || 'Something went wrong');
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
                type="text"
                placeholder="Enter todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                    marginTop: '10px',
                    padding: '10px',
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '6px',
                }}
            />
            <button>{editTodo ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default TodoForm;
