import React from "react";
import { RecordingTable } from "../../../../components/admin/recordings/recordingTable";
import { GRPCClients } from "../../../../gateways/gRPCClients";
import { LambdaClient } from "../../../../gateways/lambdaClient";
import { useTable } from "./hooks/useTable";

type Props = {
  clients: GRPCClients;
  lambdaClient: LambdaClient;
};

export const RecordingTableContainer: React.FC<Props> = (props) => {
  const recordingServiceClient = props.clients.recordingServiceClient;
  const tableState = useTable(recordingServiceClient, props.lambdaClient);
  return (
    <>
      <RecordingTable {...tableState} />
    </>
  );
};
