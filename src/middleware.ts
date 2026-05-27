// ============================================
// Middleware — Clerk Authentication
// ============================================
// Protege rotas /admin/* exigindo autenticação.
// Rotas públicas (site institucional) são livres.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Rotas que exigem autenticação
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAccountRoute = createRouteMatcher(["/minha-conta(.*)"]);

// Rotas de login do Clerk — não proteger
const isAuthRoute = createRouteMatcher(["/admin/login(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Se é rota protegida (admin) e NÃO é a página de login → exigir auth
  if (isAdminRoute(req) && !isAuthRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/admin/login", req.url).toString(),
    });
  }

  if (isAccountRoute(req)) {
    await auth.protect({
      unauthenticatedUrl: new URL("/login", req.url).toString(),
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk's auto-proxy path
    "/__clerk/(.*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
