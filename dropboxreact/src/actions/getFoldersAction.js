export const getFolders=(folders) => {
    return(
    {
        type:"GET_FOLDERS",
        data: folders
    }
    );
}
