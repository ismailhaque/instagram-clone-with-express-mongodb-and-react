import { useReducer } from "react";
import LoaderContext from "../Context/LoaderContext";
import LoaderReducer from "../Reducers/LoaderReducer";


const INITIAL_STATE = 0;

const LoaderContextProvider = ({ children }) => {

    const[loader_state, loader_dispatch] = useReducer( LoaderReducer, INITIAL_STATE);

    return (
        <LoaderContext.Provider value={{
            loader_state,
            loader_dispatch
        }}>
            { children }
        </LoaderContext.Provider>
    );

}

export default LoaderContextProvider;