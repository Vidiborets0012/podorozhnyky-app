import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  // 1. Оновлена логіка приватних маршрутів (як у закоментованому коді)
  const isPrivateRoute =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/stories/create") ||
    (pathname.startsWith("/stories/") && pathname.includes("/edit"));

  // 2. Оновлена логіка auth маршрутів
  const isAuthRoute = pathname.startsWith("/auth");

  // Редірект, якщо немає токена і намагається зайти на приватний маршрут
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Редірект, якщо є токен і намагається зайти на сторінку логіну/реєстрації
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// 3. Оновлений matcher: тепер працює для профілю та історій
export const config = {
  matcher: [
    "/profile/:path*",
    "/stories/create",
    "/stories/:id/edit",
    "/auth/:path*",
  ],
};
