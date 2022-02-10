import React from "react";
import { Row } from "antd";
import { ShadowingContainer } from "../containers/shadowing";
import { useRequireLogin } from "../hooks/useRequireLogin";
import { gRPCClients } from "../gateways/gRPCClients";
import { ProgressStepper } from "../components/progressStepper";

const Shadowing: React.FC = () => {
  useRequireLogin();
  return (
    <Row justify="center" style={{ marginTop: 50 }}>
      <ProgressStepper />
      <ShadowingContainer clients={gRPCClients} />
    </Row>
  );
};

export default Shadowing;
