import React from "react";
import { Button, Table } from 'antd'
import { useTable } from "../../../containers/admin/users/table/hooks/useTable";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb"

type Props = ReturnType<typeof useTable>

export const UserTable: React.FC<Props> = (props) => {
  const columns = [
    {
      title: 'ユーザID',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: 'テスト名',
      key: 'examName',
      render: (_, record) => {
        return(
          <>
            {props.exams?.examList.find((exam) => exam.id === record.examId)?.name}
          </>
      )}
    },
    {
      title: '作成日',
      key: 'createdAt',
      render: (_, record) => {
        const timestamp = new Timestamp()
        timestamp.setSeconds(record.createdAt.seconds)
        timestamp.setNanos(record.createdAt.nanos)
        return(
          <>
            {timestamp.toDate().toLocaleString()}
          </>
      )}
    }
  ]
  return (
    <>
      <Button onClick={()=>props.setIsShowModal(true)} type="primary" style={{ marginBottom: 16 }}>
        新規登録
      </Button>
      <Table
        rowKey={user => user.id}
        dataSource={props.users?.userList}
        columns={columns}
        pagination={{showSizeChanger: true}} />
    </>
  );
};