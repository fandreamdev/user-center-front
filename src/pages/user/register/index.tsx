import { Footer } from "@/components";
import { register } from "@/services/ant-design-pro/api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { Helmet } from "@umijs/max";
import { App } from "antd";
import { createStyles } from "antd-style";
import Tabs from "antd/lib/tabs";
import React from "react";
import Settings from "../../../../config/defaultSettings";
const useStyles = createStyles(({}) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    },
  };
});

const Register: React.FC = () => {
  const { styles } = useStyles();
  const { message } = App.useApp();
  const handleSubmit = async (values: API.RegisterParams) => {
    console.log(values);
    try {
      // 登录
      console.log("start register");
      const result = await register({
        ...values,
      });
      console.log("end register");
      if (result) {
        message.success("注册成功");
        window.location.href = "/user/login";
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <Helmet>
        <title>
          {"注册"}
          {Settings.title && ` - ${Settings.title}`}
        </title>
      </Helmet>

      <div
        style={{
          flex: "1",
          padding: "32px 0",
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="User Center"
          subTitle={"多平台用户服务中心"}
          submitter={{
            submitButtonProps: {},
            searchConfig: {
              submitText: "注册",
            },
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs
            activeKey={"account"}
            centered
            items={[
              {
                key: "account",
                label: "新用户注册",
              },
            ]}
          />
          <ProFormText
            name="account"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined />,
            }}
            placeholder={"请输入账号"}
            rules={[
              {
                required: true,
                message: "用户名是必填项！",
              },
              {
                min: 4,
                message: "用户名不能小于4",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"请输入密码"}
            rules={[
              {
                required: true,
                message: "密码是必填项！",
              },
              {
                min: 8,
                message: "密码不能小于8",
              },
            ]}
          />
          <ProFormText.Password
            name="checkPassword"
            fieldProps={{
              size: "large",
              prefix: <LockOutlined />,
            }}
            placeholder={"请重复输入密码"}
          />
          <div
            style={{
              marginBottom: 24,
              textAlign: "right",
            }}
          >
            <a href="login">已有账号！去登录</a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
