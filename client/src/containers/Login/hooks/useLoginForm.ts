import { LoginRequest } from "../../../grpc/user_pb"
import { useState, useCallback, SyntheticEvent } from "react"
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { currentUserState } from '../../../hooks/states/currentUser'
import { UserServiceClient } from "../../../grpc/UserServiceClientPb"
import { message } from 'antd'
import { TaskServiceClient } from "../../../grpc/TaskServiceClientPb"
import { GetTaskRequest, TaskType } from "../../../grpc/task_pb"

export const useLoginForm = (userServiceClient: UserServiceClient, taskServiceClient: TaskServiceClient) => {
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
    userServiceClient.login(req, null, (err, res) => {
      if (err) {
        setIsLoading(false)
        message.error(err.message)
        return
      }
      const user = res.getUser()
      const token = res.getToken()
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user.toObject()))
      setCurrentUser(user)
      // アドミンの場合、管理画面にリダイレクト
      if (user.getType() === 2) {
        router.push("/admin/users")
        return
      }
      // 実施済みのタスクを取得する
      const req = new GetTaskRequest()
      req.setId(user.getDoneTaskId())
      const metadata = {'Authorization': 'bearer ' + token}
      taskServiceClient.getTask(req, metadata, (err, res) => {
        if (err) {
          if (err.message === 'not found') {
            router.push("/")
          } else {
            setIsLoading(false)
            message.error(err.message)
          }
          return
        }
        const taskType = res.getType()
        console.log(res.toObject())
        // typeによってリダイレクト先を変更
        switch(taskType) {
          case TaskType.READING:
            router.push("/reading")
            break
          case TaskType.SHADOWING:
            router.push("/shadowing")
            break
          case TaskType.ROLE_PLAYING:
            router.push("/roleplaying")
            break
          case TaskType.PICTURE_DESCRIPTION:
            router.push("/picturedescription")
            break
          case TaskType.STORY_RETELLING:
            router.push("/storyretelling")
            break
          case TaskType.OPINION_TELLING:
            router.push("/opiniontelling")
            break
          default:
            router.push("/")
            break
        }
      })
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
    [userServiceClient, loginId, password]
  )

  const onClickLoginBtn = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault()
      login()
    },
    [userServiceClient, loginId, password]
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