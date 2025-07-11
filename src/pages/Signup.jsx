import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import './Signup.css'; // 👈 Import the new CSS file

const Signup = () => {
    const navigate = useNavigate();

    const handleSignup = async (formData) => {
        try {
            await axios.post('https://vercel-todo-backend.onrender.com/api/auth/signup', formData);
            alert('Signup successful! Please login.');

            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h2 className="signup-title">Signup</h2>
                <AuthForm title="Signup" onSubmit={handleSignup} />
                <p className="signup-link-text">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
