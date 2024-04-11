const fetchPostRequest = async (requestUrl: string, dataObject?: object) => {
    return fetch(requestUrl, {
        method: 'POST',
        body: JSON.stringify(dataObject),
    }).then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error();
        }
        return response;
    });
};

const fetchGetRequest = async (requestUrl: string) => {
    return fetch(requestUrl, {
        method: 'GET',
    }).then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    });
};

export { fetchGetRequest, fetchPostRequest };
