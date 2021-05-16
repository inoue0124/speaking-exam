import React from "react"
import { UserTable } from "../../../../components/admin/users/userTable"
import { AddUserModal } from "../../../../components/admin/users/addUserModal"
import { GRPCClients } from "../../../../gateways/gRPCClients"
import { useTable } from "./hooks/useTable"

type Props = {
  clients: GRPCClients
}

export const UserTableContainer: React.FC<Props> = ({ clients }) => {
  const userServiceClient = clients.userServiceClient
  const examServiceClient = clients.examServiceClient
  const tableState = useTable(userServiceClient, examServiceClient)
  return (
    <>
      <UserTable {...tableState} />
      <AddUserModal {...tableState} />
    </>
  )
}