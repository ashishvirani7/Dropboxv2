const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
});

export const doSignup = (payload) =>
fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(payload)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doSessionCheck = (username) =>
fetch(`${api}/sessioncheck`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(username)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const doLogout = (username) =>
fetch(`${api}/logout`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify(username)
}).then(res => {
    return res;
})
    .catch(error => {
        console.log("This is error");
        return error;
});

export const getFiles = (payload) =>
fetch(`${api}/getFiles`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const fileUpload = (payload) =>
fetch(`${api}/uploadFile`, {
    method: 'POST',
    body:payload
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const fileDownload = (payload) =>
fetch(`${api}/downloadFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const createFolder = (payload) =>
fetch(`${api}/createFolder`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const getFolders = (payload) =>
fetch(`${api}/getFolders`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const deleteFile = (payload) =>
fetch(`${api}/deleteFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const deleteFolder = (payload) =>
fetch(`${api}/deleteFolder`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const starFile = (payload) =>
fetch(`${api}/starFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const unStarFile = (payload) =>
fetch(`${api}/unStarFile`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const starFolder = (payload) =>
fetch(`${api}/starFolder`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const unStarFolder = (payload) =>
fetch(`${api}/unStarFolder`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const fileShare = (payload) =>
fetch(`${api}/fileShare`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const folderShare = (payload) =>
fetch(`${api}/folderShare`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const getActivity = (payload) =>
fetch(`${api}/getActivity`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const share = (payload) =>
fetch(`${api}/share`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});

export const getSharedFiles = (payload) =>
fetch(`${api}/getSharedFiles`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(payload)
}).then(res => {
    return res;
}).catch(error => {
        console.log("This is error");
        return error;
});


