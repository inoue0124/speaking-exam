import { useEffect } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "./useCurrentUser";
import { message } from "antd";

export function useRequireLogin() {
  const { isAuthChecking, currentUser } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecking) return;
    if (!currentUser) router.push("/login");
    if (currentUser.getType() !== 2 && router.pathname.includes("admin")) {
      router.push("/login");
      message.error("forbidden");
    }
  }, [isAuthChecking, currentUser]);
}
