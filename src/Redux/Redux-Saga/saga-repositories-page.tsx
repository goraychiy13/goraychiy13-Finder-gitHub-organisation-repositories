import { takeEvery, call, put } from 'redux-saga/effects';
import { SET_STATE_REPOSITORY_DATA, setStateRepositoryData, setStateNotFoundError, loadData } from '../Redux-Saga/saga-repositories-page-actions'
import axios from "axios";
import { RepositoryData } from '../../models/repositories-page.model';
import { warning } from '../../utils/utils';
export const LOAD_DATA = "LOAD_DATA";

export function* getRepositories(organizationName: string) {
    const options = {
        headers: {
            "Accept": "application/json"
        },
        params: {
            per_page: 100
        }
    }
    axios.get(`https://api.github.com/orgs/${organizationName}/repos`, options)
        .then(
            (response: { data: RepositoryData[] }) => {
                setStateRepositoryData({
                    repositoryData: response.data.map((repositoryData: RepositoryData, index: number) => {
                        return {
                            key: index,
                            name: repositoryData.name,
                            url: repositoryData.url,
                            forks_count: repositoryData.forks_count,
                            watchers_count: repositoryData.watchers_count,
                            stargazers_count: repositoryData.stargazers_count
                        }
                    })
                })
            }
        ).catch(
            (error: any) => {
                // console.log(error)
                warning();
            }
        )
}

function* workerLoadData(organisationNameInc: any) {
    yield put(setStateRepositoryData([]));
    yield put(setStateNotFoundError());
    const data = yield call(getRepositories, organisationNameInc);
    yield put(setStateRepositoryData(data));
    yield put(setStateNotFoundError());
}

export function* watchLoadData() {
    // console.log(loadData('apple'))
    // const organisationName = 'microsoft';
    // yield takeEvery(loadData(organisationNameInc).type, workerLoadData, loadData(organisationNameInc).organisationName);
}