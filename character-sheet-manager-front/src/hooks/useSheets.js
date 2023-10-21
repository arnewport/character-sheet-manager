import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const useSheets = (sheetId) => {
    
    // variables
    const URL = "http://localhost:8080/api/v1/sheet/";
    // const { user } = useContext(AuthContext);
    // const userId = user.userId;

    // state
    const [loading, setLoading] = useState(true);
    const [sheet, setSheet] = useState([]);

    // fetch array of sheets connected to the user
    useEffect(() => {
        const fetchSheet = async () => {

                const fetchData = async (link) => {
                    const response = await fetch(link);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch data: ${response.status}`);
                    }
            
                    return response.json();
                };

                try {
                    const sheet = await fetchData(URL + sheetId);
                    setSheet(sheet);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
            
            fetchSheet();
        }, []);

    return [sheet, loading];
}

export default useSheets;