import React from "react";
import { Button, Table, Row, Col } from 'antd'
import { useTable } from "../../../containers/admin/users/table/hooks/useTable";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb"
import { keyOfTaskType } from "../../../grpc/keyOfTaskType";

type Props = ReturnType<typeof useTable>

export const UserTable: React.FC<Props> = (props) => {
  const columns = [
    {
      title: 'ユーザID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
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
      title: '終了タスク名',
      key: 'doneTaskId',
      render: (_, record) => {
        return (
          <>
            {keyOfTaskType(record.doneTaskType)}
          </>
        )
      }
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
      )},
      sorter: (a, b) => a.createdAt.seconds - b.createdAt.seconds
    }
  ]
  return (
    <>
      <Row>
        <Button
          type="primary"
          onClick={props.onClickDownloadCSVBtn}
          style={{ marginBottom: 16, marginRight: 8 }}
        >
          CSVダウンロード
        </Button>
        <Button 
          onClick={()=>props.setIsShowModal(true)}
          type="primary"
          style={{ marginRight: 8 }}
        >
          新規登録
        </Button>
        <Col>
          {props.searchInput}
        </Col>
      </Row>
      <Table
        rowKey={user => user.id}
        dataSource={props.dataSource}
        columns={columns}
        pagination={{showSizeChanger: true}}
        loading={props.isLoadingData}
      />
    </>
  );
};