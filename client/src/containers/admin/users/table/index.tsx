import React from "react"
import { UserTable } from "../../../../components/admin/users/userTable"
import { GRPCClients } from "../../../../gateways/gRPCClients"
import { useTable } from "./hooks/useTable"

type Props = {
  clients: GRPCClients
}

export const UserTableContainer: React.FC<Props> = ({ clients }) => {
  const userServiceClient = clients.userServiceClient
  const tableState = useTable(userServiceClient)
  return (
    <UserTable {...tableState} />
  )
}