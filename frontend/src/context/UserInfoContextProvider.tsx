import { createContext, useContext, useState } from "react"


const UserContext = createContext<any>(null);
export const UserInfoContextProvider = ({ children }: any) => {

    const [uId, setUId] = useState("");


    return <UserContext.Provider value={{ uId, setUId }}>{children}</UserContext.Provider>
}

export const useInfo = () => {
    return useContext(UserContext);
};