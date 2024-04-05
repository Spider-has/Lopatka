import { useEffect, useState } from "react"
import { fetchGetRequest } from "../../fetchRequests/fetchRequest"
import { TopPanel } from "../../components/topPanel/TopPanel";

export const MainPage = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        fetchGetRequest("/api/get-user-name").then((response) => {
            console.log(response)
            setUserName(response.email)
        }).catch((e) => {
            console.log(e)
        })
    }, [])
    return (
        <div>
            <TopPanel />
            {userName}
        </div>
    )
}