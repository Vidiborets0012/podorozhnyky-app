"use client";

import { useQuery } from "@tanstack/react-query";
import { checkSession } from "@/lib/api/clientApi";

/**
 * Хук для отримання поточного користувача.
 * React Query керує кешем, фоновим оновленням та станами.
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: checkSession,
    staleTime: 1000 * 60 * 5,
    retry: false, // якщо неавторизований — не треба retry
  });
}
