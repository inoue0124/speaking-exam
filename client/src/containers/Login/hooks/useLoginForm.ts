import { LoginRequest } from "../../../grpc/user_pb"
import { useState, useCallback, SyntheticEvent } from "react"
import { UserServiceClient } from "../../../grpc/UserServiceClientPb"

export const useLoginForm = (client: UserServiceClient) => {
  const [loginId, setLoginId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = () => {
    setIsLoading(true)
    const req = new LoginRequest()
    req.setLoginId(loginId)
    req.setPassword(password)
    client.login(req, null, (err, res) => {
      setIsLoading(false)
      if (err) {
        setErrorMsg(err.message)
        return
      }
      localStorage.setItem("token", res.getToken())
      localStorage.setItem("user", JSON.stringify(res.getUser().toObject()))
    })
  }
  
  const onChangeLoginId = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement
      setLoginId(target.value)
      setErrorMsg("")
    },
    [setLoginId]
  )

  const onChangePassword = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement
      setPassword(target.value)
      setErrorMsg("")
    },
    [setPassword]
  )

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        login()
      }
    },
    [client, loginId, password]
  )

  const onClickLoginBtn = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault()
      login()
    },
    [client, loginId, password]
  )

  return {
    loginId,
    password,
    errorMsg,
    isLoading,
    onChangeLoginId,
    onChangePassword,
    onKeyPress,
    onClickLoginBtn
  }
}