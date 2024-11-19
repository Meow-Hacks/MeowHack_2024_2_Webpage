import React, { useState } from 'react';
import './AuthComponent.scss';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AuthComponent: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    const handleLogin = () => {
        if (username.trim() === '' || password.trim() === '') {
          setError('Пожалуйста, заполните все поля');
          setOpen(true);
          console.log('Ошибка: пустые поля');
        } else {
          setError(null);
          console.log('Логин:', username, 'Пароль:', password);
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
                    placeholder="Идентификатор"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
