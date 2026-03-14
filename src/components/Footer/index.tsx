import { GithubOutlined } from "@ant-design/icons";
import { DefaultFooter } from "@ant-design/pro-components";
import React from "react";

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: "none",
      }}
      copyright="Powered by Fandream"
      links={[
        {
          key: "User Center",
          title: "User Center",
          href: "https://pro.ant.design",
          blankTarget: true,
        },
        {
          key: "github",
          title: <GithubOutlined />,
          href: "https://github.com/fandreamdev",
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
