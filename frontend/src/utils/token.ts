export function getJwtToken() {
    return localStorage.getItem("jwtToken")
}

export function setJwtToken(token: string) {
    localStorage.setItem("jwtToken", token)
}

export function getRefreshToken() {
    return localStorage.getItem("refreshToken")
}

export function setRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token)
}

export const getToken = (res: { token: string; }) => {
    console.log(res.token)
    console.log()
    getAndDecodePayloadFromToken(res.token)
}

export const getAndDecodePayloadFromToken = (token: string) => {
    const base64Url = token.split('.')[1];
    console.log(JSON.parse(atob(base64Url)))
}