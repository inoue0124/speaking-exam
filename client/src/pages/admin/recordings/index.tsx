import React from "react";
import { AdminLayout } from "../../../components/layout/admin";
import { RecordingTableContainer } from "../../../containers/admin/recordings/table";
import { gRPCClients } from "../../../gateways/gRPCClients";
import { LambdaClient } from "../../../gateways/lambdaClient";
import { useRequireLogin } from "../../../hooks/useRequireLogin";

const Recordings: React.FC = () => {
  const lambdaClient = new LambdaClient();
  useRequireLogin();
  return (
    <>
      <AdminLayout>
        <RecordingTableContainer
          clients={gRPCClients}
          lambdaClient={lambdaClient}
        />
      </AdminLayout>
    </>
  );
};

export default Recordings;
