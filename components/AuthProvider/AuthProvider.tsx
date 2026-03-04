"use client";

import { ReactNode, useEffect } from "react";
import useAuthStore from "@/lib/store/authStore";
// import { checkSession } from "@/lib/api/clientApi";
import GlobalLoader from "../common/GlobalLoader/GlobalLoader";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  // ✅ React Query керує user
  const { data: user, isLoading, isError } = useCurrentUser();

  // ✅ Синхронізуємо Zustand з React Query
  useEffect(() => {
    if (user) {
      setUser(user);
    } else if (isError) {
      clearIsAuthenticated();
    }
  }, [user, isError, setUser, clearIsAuthenticated]);

  // ⚠️ Показуємо loader лише поки перевіряється сесія
  if (isLoading) {
    return <GlobalLoader />;
  }

  // const [checking, setChecking] = useState(true);

  // useEffect(() => {
  //   let mounted = true;

  //   async function verify() {
  //     setChecking(true);
  //     try {
  //       const user = await checkSession();
  //       if (!mounted) return;

  //       if (user) {
  //         setUser(user);
  //       }
  //     } catch (error) {
  //       console.error("Auth check failed:", error);
  //       clearIsAuthenticated();
  //     } finally {
  //       if (mounted) setChecking(false);
  //     }
  //   }

  //   verify();

  //   return () => {
  //     mounted = false;
  //   };
  // }, [setUser, clearIsAuthenticated]);

  // if (checking) {
  //   return <GlobalLoader />;
  // }

  return <>{children}</>;
}
