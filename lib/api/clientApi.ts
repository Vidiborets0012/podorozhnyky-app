import api from "./api";
import { User } from "@/types/user";
import { Story } from "@/types/index";
import { Category } from "@/types/category";
// import { AxiosError } from "axios";

export type LoginRequest = { email: string; password: string };

export async function login(payload: LoginRequest): Promise<User> {
  const res = await api.post<User>("/auth/login", payload);
  return res.data;
}

export async function logout(): Promise<void> {
  const res = await api.post("/auth/logout");
  if (res.status >= 400) {
    throw new Error("Logout failed");
  }
}

export async function checkSession(): Promise<User | null> {
  try {
    // 1. Пробуємо отримати юзера
    const res = await api.get<User>("/users/me");
    // Тепер бекенд повертає 200 навіть якщо юзер не залогінений
    // res.data може бути null
    return res.data;
  } catch {
    // const axiosError = error as AxiosError;
    // 2. Якщо помилка 401 (Unauthorized) — можливо, треба оновити токен

    // if (axiosError.response?.status === 401) {
    //   try {
    //     await api.post("/auth/refresh");
    //     // Спроба №2 після рефрешу
    //     const retryRes = await api.get<User>("/users/me");
    //     // const res = await api.get<User>("/users/me");
    //     return retryRes.data;
    //     // return res.data;
    //   } catch {
    //     // Якщо рефреш не вдався — юзер точно гість, повертаємо null без помилки
    //     return null;
    //   }
    // }
    // 3. Якщо помилка 400 або інша — швидше за все, юзер не залогінений
    // Повертаємо null, щоб AuthProvider зрозумів, що це гість

    // Якщо сервер повернув помилку (наприклад, 500),
    // ми все одно повертаємо null, щоб додаток не впав
    return null;
  }
}

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export async function register(payload: RegisterRequest): Promise<User> {
  const res = await api.post<User>("/auth/register", payload);
  return res.data;
}

// export async function addToFavorite(storyId: string): Promise<string[]> {
//   const res = await api.post(`/stories/${storyId}/save`);
//   return res.data;
// }

// export async function removeFromFavorite(storyId: string): Promise<string[]> {
//   const res = await api.delete(`/stories/${storyId}/save`);
//   return res.data;
// }
export async function addToFavorite(storyId: string): Promise<string[]> {
  const res = await api.post<{ data: string[] }>(`/stories/${storyId}/save`);
  return res.data.data;
}

export async function removeFromFavorite(storyId: string): Promise<string[]> {
  const res = await api.delete<{ data: string[] }>(`/stories/${storyId}/save`);
  return res.data.data;
}

// отримання всіх юзерів

interface GetUsersProps {
  page?: number;
  perPage?: number;
}

interface GetUsersResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export async function getUsers({
  page = 1,
  perPage = 4,
}: GetUsersProps): Promise<GetUsersResponse> {
  const options = {
    params: {
      page,
      perPage,
    },
  };
  const response = await api.get("/users", options);
  return response.data;
}

// створення історії

export async function createStory(payload: FormData): Promise<Story> {
  const res = await api.post<{ data: Story }>("/stories", payload);
  return res.data.data;
}

// отримання всіх категорій

// export interface Category {
//   _id: string;
//   name: string;
// }

export async function getCategories(): Promise<Category[]> {
  const res = await api.get<{ data: Category[] }>("/categories");
  // якщо вертає масив - .data
  return res.data.data;
}

export type StoriesListResponse = {
  data: Story[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

interface GetStoriesByCategoryProps {
  limit?: number;
  category?: string | null;
  page: number;
}

export const getStoriesByCategory = async ({
  limit = 9,
  category,
  page = 1,
}: GetStoriesByCategoryProps) => {
  const res = await api.get<StoriesListResponse>("/stories", {
    params: { page, limit, sortBy: "popular", category },
  });
  return res.data;
};
