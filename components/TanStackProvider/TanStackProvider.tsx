"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TanStackProviderProps {
  children: React.ReactNode;
}

function TanStackProvider({ children }: TanStackProviderProps) {
  // const [queryClient] = useState(() => new QueryClient());

  // ✅ QueryClient створюється один раз
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 5 хвилин дані вважаються свіжими
            staleTime: 1000 * 60 * 5,
            // не перезапитуємо при фокусі
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default TanStackProvider;
