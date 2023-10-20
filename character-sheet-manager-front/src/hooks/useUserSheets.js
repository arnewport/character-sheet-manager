import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const useUserSheets = () => {
    
    // variables
    const URL = "http://localhost:8080/api/v1/userSheet/";
    const { user } = useContext(AuthContext);
    const userId = user.userId;

    // state
    const [userSheetArray, setUserSheetArray] = useState([]);

    // fetch array of sheets connected to the user
    useEffect(() => {
        const fetchSheetsByUser = async () => {

                const fetchData = async (link) => {
                    const response = await fetch(link);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch data: ${response.status}`);
                    }
            
                    return response.json();
                };

                try {
                    const userSheetArray = await fetchData(URL + userId);
                    setUserSheetArray(userSheetArray);
                } catch (error) {
                    console.error(error);
                }
            }
            
            fetchSheetsByUser();
        }, []);

    return userSheetArray;
}

export default useUserSheets;