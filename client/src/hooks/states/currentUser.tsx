import { atom } from 'recoil'
import { User } from '../../grpc/user_pb'

export const currentUserState = atom<undefined | null | User>({
  key: 'CurrentUser',
  default: undefined,
})