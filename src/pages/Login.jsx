import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (formData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <AuthForm title="Login" onSubmit={handleLogin} />
            <p style={{ textAlign: 'center', marginTop: '10px' }}>
                Don’t have an account? <Link to="/signup">Sign up here</Link>
            </p>
        </>
    );
};

export default Login;
