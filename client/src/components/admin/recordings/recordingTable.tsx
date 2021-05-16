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
      filters: props.filters,
      onFilter: (value, record) => record.userId === value
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
        style={{ marginBottom: 16 }}
        disabled={!props.hasSelected || props.isDownloading}
        loading={props.isDownloading}
        onClick={props.onClickDownloadBtn}>
        一括ダウンロード
      </Button>
      <span style={{ marginLeft: 8 }}>
        {props.hasSelected ? `${props.selectedRecordingKeys.length}項目を選択中です。` : ''}
      </span>
      <Table
        rowSelection={rowSelection}
        rowKey={recording => recording.audioObjKey}
        dataSource={props.recordings?.recordingList}
        columns={columns}
        pagination={{showSizeChanger: true}}
        loading={props.isLoadingData}
      />
    </>
  );
};