import React, { useState } from 'react';
import './AuthComponent.scss';

interface AuthProps {
    login: string;
    password: string;
}

const AuthComponent: React.FC<AuthProps> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = () => {
        if (username === '' || password === '') {
            setError('Пожалуйста, заполните все поля');
        } else {
            setError(null);
            console.log('Логин:', username, 'Пароль:', password);
        }
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
                {error && <p>{error}</p>}
                
            </div>
            <div className="background-circle circle-blue"></div>
            <div className="background-circle circle-orange"></div>
            
        </>
    );
}

export default AuthComponent;
