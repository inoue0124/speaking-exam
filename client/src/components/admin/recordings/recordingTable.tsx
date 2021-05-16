import React from "react";
import { Button, Table } from 'antd'
import { useTable } from "../../../containers/admin/recordings/table/hooks/useTable";
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb"

type Props = ReturnType<typeof useTable>

export const RecordingTable: React.FC<Props> = (props) => {
  const columns = [
    {
      title: '録音ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'ユーザID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'タスクID',
      dataIndex: 'taskId',
      key: 'taskId',
    },
    {
      title: 'ファイル名',
      dataIndex: 'audioObjKey',
      key: 'audioObjKey',
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
      <Button type="primary" style={{ marginBottom: 16 }}>
        一括ダウンロード
      </Button>
      <Table dataSource={props.recordings?.recordingList} columns={columns} />
    </>
  );
};