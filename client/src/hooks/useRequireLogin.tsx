import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser } from "./useCurrentUser"

export function useRequireLogin() {
  const { isAuthChecking, currentUser } = useCurrentUser()
  const router = useRouter()
  
  useEffect(()=>{
    if(isAuthChecking) return
    if(!currentUser) router.push("/login")
  },[isAuthChecking, currentUser])
}