import React from "react";
import AuthComponent from "../components/AuthComponent/AuthComponent";

const AuthPage: React.FC = () => {
    return (
        <>
            <AuthComponent login={""} password={""} />
        </>
    );
};

export default AuthPage;