import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

function Landing() {

    const auth = useContext(AuthContext);

    const navigate = useNavigate();  

    return (
        <div className="container-fluid">
            <h1 className="display-5">Character Sheet Manager</h1>
            <div className="d-flex flex-grow-1 justify-content-end">
                <Link to="/login" className="btn btn-info">Login</Link>
                <Link to="/signup" className="btn btn-info">Sign Up</Link>
            </div>
        </div>
    );
}

export default Landing;