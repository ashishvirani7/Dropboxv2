const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res.status;
})
    .catch(error => {
        console.log("This is error");
        return error;
    });

export const doSignin = (payload) =>
fetch(`${api}/signin`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
    });

export const doFileUpload = (payload) =>
fetch(`${api}/fileUpload`, {
    method: 'POST',
    body: payload
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
    });

export const doGetFiles = (path) =>
fetch(`${api}/getFiles`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({"path":path})
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
    });
    