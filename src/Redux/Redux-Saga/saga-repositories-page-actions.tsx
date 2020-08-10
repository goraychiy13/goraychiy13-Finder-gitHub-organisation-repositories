export const SET_STATE_REPOSITORY_DATA = "SET_STATE_REPOSITORY_DATA";
export const SET_STATE_NOT_FOUND_ERROR = "SET_STATE_NOT_FOUND_ERROR";
export const LOAD_DATA = "LOAD_DATA";

export const setStateRepositoryData = (dataFromServer: any) => {
    return {
        type: SET_STATE_REPOSITORY_DATA,
        payload: dataFromServer
    }
}

export const setStateNotFoundError = () => {
    return {
        type: SET_STATE_NOT_FOUND_ERROR
    }
}

export const loadData = (organisationName: string) => {
    // console.log(organisationName)
    return {
        type: LOAD_DATA,
        organisationName: organisationName
    }
}