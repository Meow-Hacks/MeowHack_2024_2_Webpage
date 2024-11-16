import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Страница не найдена</h1>
            <p>Извините, но страницы, которую вы ищете, не существует.</p>
            <Link to="/">Перейти на главную</Link>
        </div>
    );
};

export default NotFound;
