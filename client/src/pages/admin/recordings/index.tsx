import React from "react"
import { AdminLayout } from "../../../components/layout/admin"
import { RecordingTableContainer } from "../../../containers/admin/recordings/table"
import { gRPCClients } from "../../../gateways/gRPCClients"

const Recordings: React.FC = () => {
  return (
    <>
      <AdminLayout>
        <RecordingTableContainer clients={gRPCClients} />
      </AdminLayout>
    </>
  )
}

export default Recordings