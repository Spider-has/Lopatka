import { fetchPostRequest } from "./fetchRequests/fetchRequest";
import { getToken, setJwtToken } from "./token";

export const signIn = (userEmail: string, password: string) => {
    const response = fetchPostRequest("http://localhost:8000/auth/sign-in", {
            userEmail: userEmail,
            password: password
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Error occurred!')
            }
            return response.json()
        }).then((response) => {
            if(response.token)
                setJwtToken(response.token)
            getToken(response)
        })
    return response
}
