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
                <Link id="btnAdd" to="/home" className="btn btn-info">Go to Home</Link>
            </div>
        </div>
    );
}

export default Landing;