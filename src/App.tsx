import React, {useState} from 'react';
import {
    CloudServerOutlined,
    HomeOutlined,
    UserOutlined,
    WechatWorkOutlined
} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Layout, Menu, theme, Button, Dropdown, Space} from 'antd';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import AiAssistant from './page/ai/AiAssistant';
import HomePage from './page/homepage/HomePage';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to="/">首页</Link>, '1', <HomeOutlined/>),
    getItem(<Link to="/ai-assistant">ai 助手</Link>, '4', <WechatWorkOutlined/>),
    getItem('服务中心', '2', <CloudServerOutlined/>),
    getItem('环境配置', '3', <CloudServerOutlined/>),
    getItem('用户中心', 'sub1', <UserOutlined/>)
];

const userItems: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                个人信息
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                修改密码
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                退出登录
            </a>
        ),
    },
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    return (
        <Router>
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
                </Sider>
                <Layout>
                    <Header style={{padding: 0, background: colorBgContainer}}>
                        <Space direction="vertical" style={{float: "right", marginRight: "5px"}}>
                            <Space wrap>
                                <Dropdown menu={{items: userItems}} placement="bottomLeft" arrow>
                                    <Button>用户</Button>
                                </Dropdown>
                            </Space>
                        </Space>
                    </Header>
                    <Content style={{margin: '16px 16px 16px 16px'}}>
                        <div
                            style={{
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/ai-assistant" element={<AiAssistant/>}/>
                            </Routes>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Super Ops ©{new Date().getFullYear()} Created by Jianbin Chen
                    </Footer>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
