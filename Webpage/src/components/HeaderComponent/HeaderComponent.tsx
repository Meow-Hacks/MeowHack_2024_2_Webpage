import React from 'react';
import './HeaderComponent.scss';

const HeaderComponent: React.FC = () => { 

    return (
        <>
            <div className="header">
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/auth">Auth</a></li>
                        <li><a href="/dashboard">dashboard</a></li>
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default HeaderComponent;