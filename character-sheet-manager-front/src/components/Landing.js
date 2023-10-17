import { Link } from "react-router-dom";

function Landing() {
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