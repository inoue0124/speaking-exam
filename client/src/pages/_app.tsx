import 'antd/dist/antd.css'
import { useEffect } from 'react'
import { Empty } from "google-protobuf/google/protobuf/empty_pb"
import { useSetRecoilState, RecoilRoot } from 'recoil'
import { currentUserState } from '../hooks/states/currentUser'
import { gRPCClients } from '../gateways/gRPCClients'
import { AppProps } from 'next/dist/next-server/lib/router/router'

function AppInit() {
  const setCurrentUser = useSetRecoilState(currentUserState)

  useEffect(() => {
    (async () => {
      const metadata = {'Authorization': 'bearer ' + localStorage.getItem("token")}
      const req = new Empty()
      await gRPCClients.userServiceClient.getCurrentUser(req, metadata, (err, res) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res.toObject()))
          setCurrentUser(res)
        } else {
          setCurrentUser(null)
        }
      })
    })()
  },[])

  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
      <AppInit />
    </RecoilRoot>
  )
}

export default MyApp
