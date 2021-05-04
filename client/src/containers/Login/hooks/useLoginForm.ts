import { LoginRequest } from "../../../grpc/user_pb"
import { useState, useCallback, SyntheticEvent } from "react"
import { UserServiceClient } from "../../../grpc/UserServiceClientPb"

export const useLoginForm = (client: UserServiceClient) => {
  const [loginId, setLoginId] = useState<string>("")

  const onChange = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      setLoginId(target.value);
    },
    [setLoginId]
  );

  const onSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      const req = new LoginRequest();
      req.setLoginId(loginId);
      client.createMessage(req, null, res => console.log(res));
      setLoginId("");
    },
    [client, loginId]
  );

  return {
    loginId,
    onChange,
    onSubmit
  };
};