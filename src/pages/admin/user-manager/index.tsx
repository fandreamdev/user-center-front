import { deleteUser, userList } from "@/services/ant-design-pro/api";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";
import { Image, message } from "antd";
import React, { useCallback, useRef, useState } from "react";
import CreateForm from "./components/CreateForm";
import UpdateForm from "./components/UpdateForm";
const UserManager: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<API.CurrentUser>();
  const [selectedRowsState, setSelectedRows] = useState<API.CurrentUser[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const [messageApi, contextHolder] = message.useMessage();
  const { run: delRun } = useRequest(deleteUser, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      messageApi.success("Deleted successfully and will refresh soon");
    },
    onError: () => {
      messageApi.error("Delete failed, please try again");
    },
  });

  const columns: ProColumns<API.CurrentUser>[] = [
    {
      title: "序号",
      hideInSearch: true,
      render: (_dom, _entity, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "账号",
      dataIndex: "userAccount",
      valueType: "text",
    },
    {
      title: "用户名",
      dataIndex: "username",
      valueType: "text",
    },
    {
      title: "用户头像",
      hideInSearch: true,
      dataIndex: "avatarUrl",
      valueType: "avatar",
      render: (_, record) => (
        <div>
          <Image src={record.avatarUrl} width={35}></Image>
        </div>
      ),
    },
    {
      title: "性别",
      dataIndex: "gender",
      valueEnum: {
        0: {
          text: "未知",
        },
        1: {
          text: "男性",
        },
        2: {
          text: "女性",
        },
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      valueType: "text",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      valueType: "text",
    },
    {
      title: "状态",
      dataIndex: "status",
      hideInForm: true,
      valueEnum: {
        1: {
          text: "正常",
          status: "Success",
        },
        2: {
          text: "锁定",
          status: "Default",
        },
        3: {
          text: "注销",
          status: "Error",
        },
      },
    },
    {
      title: "角色",
      dataIndex: "roleId",
      valueType: "select",
      valueEnum: {
        0: {
          text: "管理员",
        },
        1: {
          text: "普通用户",
        },
      },
    },
    {
      title: "创建时间",
      sorter: true,
      dataIndex: "createTime",
      valueType: "dateTime",
    },
    {
      title: "更新时间",
      sorter: true,
      dataIndex: "updateTime",
      valueType: "dateTime",
    },
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      render: (_, record) => [
        <UpdateForm
          trigger={<a>更新</a>}
          onOk={actionRef.current?.reload}
          values={record}
        />,
        <span
          style={{
            cursor: "pointer",
            color: "red",
          }}
          onClick={async () => handleRemove(selectedRowsState)}
        >
          删除
        </span>,
      ],
    },
  ];

  /**
   *  Delete node
   * @zh-CN 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: API.CurrentUser[]) => {
      if (!selectedRows?.length) {
        messageApi.warning("请选择删除项");
        return;
      }
      await delRun(selectedRows.map((row) => row.id!));
    },
    [delRun, messageApi.warning]
  );
  return (
    <PageContainer>
      {contextHolder}
      <ProTable<API.CurrentUser, API.PageParams>
        headerTitle={"用户列表"}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <CreateForm key="create" reload={actionRef.current?.reload} />,
        ]}
        request={userList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
    </PageContainer>
  );
};
export default UserManager;
