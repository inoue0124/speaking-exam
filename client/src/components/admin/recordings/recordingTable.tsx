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
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'ユーザID',
      dataIndex: 'userId',
      key: 'userId',
      filters: props.userFilter,
      onFilter: (value, record) => record.userId === value,
      sorter: (a, b) => a.userId - b.userId
    },
    {
      title: 'タスクID',
      dataIndex: 'taskId',
      key: 'taskId',
      filters: props.taskFilter,
      onFilter: (value, record) => record.taskId === value,
      sorter: (a, b) => a.taskId - b.taskId
    },
    {
      title: 'ファイル名',
      dataIndex: 'audioObjKey',
      key: 'audioObjKey'
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
  const rowSelection = {
    selectedRowKeys: props.selectedRecordingKeys,
    onChange: props.onSelectChange,
    getCheckboxProps: () => ({
      disabled: props.isDownloading
    }),
  }
  return (
    <>
      <Button
        type="primary"
        style={{ marginBottom: 16, marginRight: 8 }}
        disabled={props.isDownloading}
        onClick={props.onClickDownloadCSVBtn}
      >
        CSVダウンロード
      </Button>
      <Button
        type="primary"
        disabled={!props.hasSelected || props.isDownloading}
        loading={props.isDownloading}
        onClick={props.onClickDownloadBtn}>
        選択音声ダウンロード
      </Button>
      <span style={{ marginLeft: 8 }}>
        {props.hasSelected ? `${props.selectedRecordingKeys.length}項目を選択中です。` : ''}
      </span>
      <Table
        rowSelection={rowSelection}
        rowKey={recording => recording.id}
        dataSource={props.recordings?.recordingList}
        columns={columns}
        pagination={{showSizeChanger: true, pageSizeOptions: ['10', '20', '50', '100', '500', '1000']}}
        loading={props.isLoadingData}
      />
    </>
  );
};