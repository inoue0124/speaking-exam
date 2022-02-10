import React from "react";
import { RecordingTable } from "../../../../components/admin/recordings/recordingTable";
import { GRPCClients } from "../../../../gateways/gRPCClients";
import { useTable } from "./hooks/useTable";

type Props = {
  clients: GRPCClients;
};

export const RecordingTableContainer: React.FC<Props> = ({ clients }) => {
  const recordingServiceClient = clients.recordingServiceClient;
  const tableState = useTable(recordingServiceClient);
  return (
    <>
      <RecordingTable {...tableState} />
    </>
  );
};
