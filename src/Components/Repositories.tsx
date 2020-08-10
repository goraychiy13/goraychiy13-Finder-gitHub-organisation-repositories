import { Form, Input, Table } from "antd";
import React, { FunctionComponent, useEffect, useRef } from "react";
import { StateNewRepositoryData } from "../models/repositories-page.model";
import './Repositories.css';
import { connect, useDispatch } from "react-redux";
// import { getRepositories, } from "../Redux/Redux-Saga/saga-repositories-page"
// import { handleChange, getRepositories } from "../Redux/Reducers/repositories-page-reducer";
import { handleChange, getRepositories } from "../Redux/Reducers/repositoiresPageReducer"
// import { loadData } from "../Redux/Redux-Saga/saga-repositories-page-actions";

const { Search } = Input;

interface RepositoriesProps {
    repositoryData: StateNewRepositoryData[];
    sortedInfo: any;
    notFoundError: boolean;
    handleChange: (sorter: any) => void;
    getRepositories: (organizationName: string) => void;
}

const Repositories: FunctionComponent<RepositoriesProps> = (props) => {

    const refSearch = useRef<any>(null);
    // const dispatch = useDispatch();

    // const dispatchLoadData = (organisationName: string) => dispatch(loadData(organisationName));

    const columns = [
        {
            title: 'Название репозитория',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name?.length - b.name?.length,
            sortOrder: props.sortedInfo?.columnKey === 'name' && props.sortedInfo?.order,
            ellipsis: true,
        },
        {
            title: 'URL репозитория',
            dataIndex: 'url',
            key: 'url',
            sorter: (a: any, b: any) => a.url?.length - b.url?.length,
            sortOrder: props.sortedInfo?.columnKey === 'url' && props.sortedInfo?.order,
            ellipsis: true,
        },
        {
            title: 'Количество forks',
            dataIndex: 'forks_count',
            key: 'forksCount',
            sorter: (a: any, b: any) => a.forksCount?.length - b.forksCount?.length,
            sortOrder: props.sortedInfo?.columnKey === 'forks_count' && props.sortedInfo?.order,
            ellipsis: true,
        },
        {
            title: 'Количество watchers',
            dataIndex: 'watchers_count',
            key: 'watchers_count',
            sorter: (a: any, b: any) => a.watchersCount?.length - b.watchersCount?.length,
            sortOrder: props.sortedInfo?.columnKey === 'watchers_count' && props.sortedInfo?.order,
            ellipsis: true,
        },
        {
            title: 'Количество звезд у репозитория',
            dataIndex: 'stargazers_count',
            key: 'stargazers_count',
            sorter: (a: any, b: any) => a.excess?.length - b.excess?.length,
            sortOrder: props.sortedInfo?.columnKey === 'stargazers_count' && props.sortedInfo?.order,
            ellipsis: true,
        }
    ];

    // useEffect(() => {
    //     console.log(props.repositoryData)
    // }, [props.repositoryData])

    return (
        <div className="repositories-wrapper">
            <Form
                ref={refSearch}
                initialValues={{
                    SearchInput: ''
                }}
            >
                <Form.Item
                    name={'SearchInput'}
                >
                    <Search
                        placeholder="Введите название компании"
                        onSearch={async () => {
                            props.getRepositories.call(Repositories, await refSearch.current?.getFieldsValue().SearchInput);
                            // dispatch(loadData.call(Repositories, await refSearch.current?.getFieldsValue().SearchInput))
                        }}
                        enterButton
                    />
                </Form.Item>
                {
                    !props.notFoundError ?
                        refSearch.current?.getFieldsValue() ?
                            <Table
                                style={{ marginTop: 30 }}
                                loading={props.repositoryData?.length ? false : true}
                                columns={columns} dataSource={props.repositoryData}
                                onChange={() => props.handleChange.call(Repositories, props.sortedInfo)}
                                rowKey="key"
                            />
                            : <div className="enter-company-name">
                                Введите название компании
                            </div>
                        : <div className="not-found-data">
                            Организация не найдена. Пожалуйста, введите корректное название компании.
                        </div>
                }
            </Form>
        </div>
    )
}

let mapStateToProps = (state: any) => {
    return {
        repositoryData: state.repositoriesPage?.repositoryData,
        sortedInfo: state.repositoriesPage?.sortedInfo,
        notFoundError: state.repositoriesPage?.notFoundError
    }
}

export const RepositoriesContainer = connect(mapStateToProps,
    { getRepositories, handleChange })(Repositories)
