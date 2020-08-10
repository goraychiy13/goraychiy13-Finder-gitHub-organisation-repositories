import {
  MenuFoldOutlined, MenuUnfoldOutlined,
  UploadOutlined, UserOutlined, VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';
import React, { FunctionComponent, useState } from 'react';
import './App.css';
import { RepositoriesContainer } from './Components/Repositories';

const { Header, Content, Footer } = Layout;

const App: FunctionComponent = () => {

  return (
    <div>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Репозитории</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Репозитории</Breadcrumb.Item>
          </Breadcrumb>
          <RepositoriesContainer />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
      </Layout>
    </div>
  );
}

export default App;