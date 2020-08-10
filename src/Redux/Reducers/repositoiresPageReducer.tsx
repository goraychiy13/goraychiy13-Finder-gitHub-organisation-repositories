import axios from "axios";
import { RepositoryData, StateNewRepositoryData } from "../../models/repositories-page.model";
import { warning } from "../../utils/utils";

const SET_STATE_REPOSITORY_DATA = "SET_STATE_REPOSITORY_DATA";
const SET_STATE_NOT_FOUND_ERROR_TRUE = "SET_STATE_NOT_FOUND_ERROR";
const SET_STATE_NOT_FOUND_ERROR_FALSE = "SET_STATE_NOT_FOUND_ERROR_FALSE";
const SET_STATE_SORTED_INFO = "SET_STATE_SORTED_INFO";

export interface StateRepositoriesPage {
    repositoryData: StateNewRepositoryData[];
    sortedInfo: any,
    notFoundError: boolean
}

let initialState: StateRepositoriesPage = {
    repositoryData: [],
    sortedInfo: [],
    notFoundError: false
}

const repositoiresPageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATE_REPOSITORY_DATA:
            return {
                ...state,
                repositoryData: action.payload
            }
        case SET_STATE_NOT_FOUND_ERROR_TRUE:
            return {
                ...state,
                notFoundError: true
            }
        case SET_STATE_NOT_FOUND_ERROR_FALSE:
            return {
                ...state,
                notFoundError: false
            }
        case SET_STATE_SORTED_INFO:
            return {
                ...state,
                sortedInfo: action.payload
            }
        default:
            return state;
    }
}


const setStateRepositoryData = (repositoryData: StateNewRepositoryData[]) => (
    { type: SET_STATE_REPOSITORY_DATA, payload: repositoryData }
)

const setStateNotFoundErrorTrue = () => (
    { type: SET_STATE_NOT_FOUND_ERROR_TRUE }
)

const setStateNotFoundErrorFalse = () => (
    { type: SET_STATE_NOT_FOUND_ERROR_FALSE }
)

const setStateSortedInfo = (sortedInfo: any) => (
    { type: SET_STATE_SORTED_INFO, payload: sortedInfo }
)

export const handleChange = (sorter: any) => (dispatch: any) => {
    // console.log('Various parameters', pagination, null, sorter);
    dispatch(setStateSortedInfo(sorter));
};

export const getRepositories = (repositoryName: string) => (dispatch: any) => {
    console.log(repositoryName);
    dispatch(setStateRepositoryData([]));
    dispatch(setStateNotFoundErrorFalse());
    const options = {
        headers: {
            "Accept": "application/json"
        },
        params: {
            per_page: 100
        }
    }
    axios.get(`https://api.github.com/orgs/${repositoryName}/repos`, options)
        .then(
            (response: { data: RepositoryData[] }) => {
                dispatch(setStateRepositoryData(
                    response.data.map((repositoryData: RepositoryData, index: number) => {
                        return {
                            key: index,
                            name: repositoryData.name,
                            url: repositoryData.url,
                            forks_count: repositoryData.forks_count,
                            watchers_count: repositoryData.watchers_count,
                            stargazers_count: repositoryData.stargazers_count
                        }
                    })
                ))
                if (!response.data.length) {
                    warning();
                }
            }
        ).catch(
            (error: any) => {
                // console.log(error)
                warning();
                dispatch(setStateNotFoundErrorTrue())
            }
        )
}

export default repositoiresPageReducer