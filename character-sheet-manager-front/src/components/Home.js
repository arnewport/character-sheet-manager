import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container-fluid">
            <h1 className="display-5">Character Sheet Manager</h1>
            <div className="d-flex flex-grow-1 justify-content-end">
                <Link id="btnAdd" to="/sheets" className="btn btn-info">Go to Sheet</Link>
            </div>
        </div>
    );
}

export default Home;