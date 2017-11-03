export const getSharedFiles=(files) => {
    return(
    {
        type:"GET_SHARED_FILES",
        data: files
    }
    );
}
