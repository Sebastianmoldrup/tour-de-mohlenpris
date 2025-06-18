import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log("Request URL:", request.nextUrl.pathname);

  // Store URL and Routes
  const url = request.nextUrl.clone();
  const protectedRoutes = ["/admin"];
  const authRoutes = ["/auth"];
  const publicRoutes = ["/auth/signin"];

  // 1. Redirect to the home page if the user is logged in and tries to access a protected route
  // 2. Redirect to the signin page if the user is not logged in and tries to access a protected route
  // 3. Redirect to the signin page if the user is not logged in and accesses a non-existing route
  if (user && authRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  } else if (!user && protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  } else if (!user && !publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    url.pathname = "/auth/signin";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
