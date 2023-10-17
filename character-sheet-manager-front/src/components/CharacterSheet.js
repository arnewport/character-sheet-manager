import { Link } from "react-router-dom";

function CharacterSheet() {
    return (
        <div className="container-fluid">
            <h1 className="display-5">Character Sheet Manager</h1>
            <div className="d-flex flex-grow-1 justify-content-end">
                <Link id="btnAdd" to="/" className="btn btn-info">Go to Landing</Link>
            </div>
        </div>
    );
}

export default CharacterSheet;