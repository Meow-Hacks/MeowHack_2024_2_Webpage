import React, { useState } from 'react';
import './AuthComponent.scss';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useAuth } from '../../api/useAuth'; 
import { useNavigate } from 'react-router-dom';

const AuthComponent: React.FC = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (identifier.trim() === '' || password.trim() === '') {
            setError('Пожалуйста, заполните все поля');
            setOpen(true);
            console.log('Ошибка: пустые поля');
        } else {
            setError(null);
            try {
                await login({ phone: identifier, mail: identifier, password });
                navigate('/adminpanel'); 
            } catch (err) {
                setError('Ошибка авторизации');
                setOpen(true);
                console.error('Ошибка авторизации:', err);
            }
        }
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <div className="auth-container">
                <h2>Авторизация</h2>
                <input
                    type="text"
                    placeholder="Идентификатор (телефон или email)"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Авторизоваться</button>
            </div>
            <div className="background-circle circle-blue"></div>
            <div className="background-circle circle-orange"></div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
        </>
    );
}

export default AuthComponent;