export const share=(data) => {
    return(
    {
        type:"SHARE",
        data,
    }
    );
}

export const shareDone=() => {
    return(
    {
        type:"SHARE_DONE",
    }
    );
}


export const shareEmailChange=(event) => {
    return(
    {
        type:"SHARE_EMAIL_CHANGE",
        data:event,
    }
    );
}


