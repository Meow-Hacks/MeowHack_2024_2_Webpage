import React from 'react';
import './AuthComponent.scss';

interface AuthProps {
    login: string;
    password: string;
}

const AuthComponent: React.FC<AuthProps> = () => {
    return (
        <>
            <div className='auth-container'>
                <h2>Авторизация</h2>
                <form>
                    <label>
                        <input placeholder="Идентификатор" type="text" name="login" />
                    </label>
                    <label>
                        <input placeholder="Пароль" type="password" name="password" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}

export default AuthComponent;