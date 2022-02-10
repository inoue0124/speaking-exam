import React from "react";
import { AdminLayout } from "../../../components/layout/admin";
import { UserTableContainer } from "../../../containers/admin/users/table";
import { gRPCClients } from "../../../gateways/gRPCClients";
import { useRequireLogin } from "../../../hooks/useRequireLogin";

const Users: React.FC = () => {
  useRequireLogin();
  return (
    <>
      <AdminLayout>
        <UserTableContainer clients={gRPCClients} />
      </AdminLayout>
    </>
  );
};

export default Users;
