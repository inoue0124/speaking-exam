import React from "react";
import { Modal, InputNumber, Select, Table, Button, Row, Tooltip } from 'antd'
import { useTable } from "../../../containers/admin/users/table/hooks/useTable";

type Props = ReturnType<typeof useTable>

export const AddUserModal: React.FC<Props> = (props) => {
  const { Option } = Select
  const columns = [
    {
      title: 'ログインID',
      dataIndex: 'loginId',
      key: 'loginId',
    },
    {
      title: 'パスワード',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'テストID',
      dataIndex: 'examId',
      key: 'examId'
    },
    {
      title: 'テスト名',
      dataIndex: 'examName',
      key: 'examName'
    }
  ]
  return (
    <>
        <Modal
          title="ユーザ新規登録"
          visible={props.isShowModal}
          onCancel={props.onClickModalCancel}
          onOk={props.onClickModalOk}
          okText="登録"
          okButtonProps={{disabled: props.generateUsers.length === 0}}
          cancelText="キャンセル"
          confirmLoading={props.confirmLoading}
        >
          <Row>
            <Tooltip title="追加対象のテストを選択して下さい。">
              <Select
                showSearch
                style={{ width: 300 }}
                placeholder="対象のテスト"
                optionFilterProp="children"
                onChange={props.onSelectExam}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.exams?.examList.map((exam) => (
                  <Option value={exam.id} key={exam.id}>テストID:{exam.id} {exam.name}</Option>
                ))}
              </Select>
            </Tooltip>
            <Tooltip title="生成するユーザの数を選択して下さい (1以上100以下)。">
              <InputNumber
                style={{ margin: "0 5px" }}
                min={1}
                max={100}
                defaultValue={props.numGenerate}
                onChange={(value)=>props.setNumGenerate(value)}
              />
            </Tooltip>
            <Button
              type="primary"
              onClick={props.onClickGenerateBtn}
              disabled={!props.selectedExam}
            >
              生成
            </Button>
          </Row>
          <Table
            style={{ marginTop: 20 }}
            rowKey={user => user.loginId}
            dataSource={props.generateUsers}
            columns={columns}
          />
        </Modal>
    </>
  )
}