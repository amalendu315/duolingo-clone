import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { protectedRoutes } from "./constants";

const isProtectedRoute = createRouteMatcher(protectedRoutes)

export default clerkMiddleware((auth, req)=> {
    if(isProtectedRoute(req)){
        auth().protect();
    }
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
