import React from "react"
import { LoginForm } from "../../components/LoginForm"
import { GRPCClients } from "../../gateways/gRPCClients"
import { useLoginForm } from "./hooks/useLoginForm"

type Props = {
  clients: GRPCClients;
};

export const LoginFormContainer: React.FC<Props> = ({ clients }) => {
  const userServiceClient = clients.userServiceClient
  const loginFormState = useLoginForm(userServiceClient)
  return (
    <div>
      <LoginForm {...loginFormState} />
    </div>
  );
};