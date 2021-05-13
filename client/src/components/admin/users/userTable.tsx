import React from "react";
import { Table } from 'antd'
import { useTable } from "../../../containers/admin/users/table/hooks/useTable";

type Props = ReturnType<typeof useTable>

export const UserTable: React.FC<Props> = ({
  users
}) => {
  const columns = [
    {
      title: 'ログインID',
      dataIndex: 'loginId',
      key: 'loginId',
    },
    {
      title: 'テストID',
      dataIndex: 'examId',
      key: 'examId',
    },
    {
      title: '作成日',
      dataIndex: 'createdAt',
      key: 'createdAt'
    }

  ]
  return (
    <>
      <Table dataSource={users?.userList} columns={columns} />
    </>
  );
};