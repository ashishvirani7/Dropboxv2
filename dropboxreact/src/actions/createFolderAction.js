export const createFolder=() => {
    return(
    {
        type:"CREATE_FOLDER",
    }
    );
}

export const createFolderDone=() => {
    return(
    {
        type:"CREATE_FOLDER_DONE",
    }
    );
}

export const createFolderNameChange=(event) => {
    return(
    {
        type:"CREATE_FOLDER_NAME_CHANGE",
        data:event,

    }
    );
}

