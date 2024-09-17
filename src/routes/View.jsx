import { useSearchParams, useNavigate  } from "react-router-dom";
import * as React from "react";
function View(){
    let [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();


      // Check if there are no search params and redirect
    useEffect(() => {
        if (searchParams.size === 0) {
        navigate("/"); // Navigate to the home route
        }
    }, [searchParams, navigate]);
    console.log(searchParams)
    
    return (
    <> 
        {searchParams}
    </>
    )
}

export default View