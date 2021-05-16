import { LoginRequest } from "../../../grpc/user_pb"
import { useState, useCallback, SyntheticEvent } from "react"
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from '../../../hooks/states/currentUser'
import { UserServiceClient } from "../../../grpc/UserServiceClientPb"
import { message } from 'antd'

export const useLoginForm = (client: UserServiceClient) => {
  const [loginId, setLoginId] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  const setCurrentUser = useSetRecoilState(currentUserState)


  const login = () => {
    setIsLoading(true)
    const req = new LoginRequest()
    req.setLoginId(loginId)
    req.setPassword(password)
    client.login(req, null, (err, res) => {
      if (err) {
        setIsLoading(false)
        message.error(err.message)
        return
      }
      localStorage.setItem("token", res.getToken())
      localStorage.setItem("user", JSON.stringify(res.getUser().toObject()))
      setCurrentUser(res.getUser())
      router.push("/")
    })
  }
  
  const onChangeLoginId = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement
      setLoginId(target.value)
    },
    [setLoginId]
  )

  const onChangePassword = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement
      setPassword(target.value)
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
    isLoading,
    onChangeLoginId,
    onChangePassword,
    onKeyPress,
    onClickLoginBtn
  }
}