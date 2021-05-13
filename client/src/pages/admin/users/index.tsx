import React from "react"
import { AdminLayout } from "../../../components/layout/admin"
import { UserTableContainer } from "../../../containers/admin/users/table"
import { gRPCClients } from "../../../gateways/gRPCClients"

const UsersList: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <UserTableContainer clients={gRPCClients} />
      </AdminLayout>
    </>
  )
}

export default UsersList