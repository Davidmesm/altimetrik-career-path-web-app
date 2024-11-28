import "server-only"
import { cookies } from "next/headers"
import { cache } from "react"
import { redirect } from "next/navigation"
 
export async function createSession(token) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = JSON.stringify({ token, expiresAt });
    const cookieStore = await cookies()
  
    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax", 
      path: "/",
    });
}

export const getSession = cache(async () => {
    const cookieStore = await cookies()

    const sessionCookie = cookieStore.get("session")?.value

    let session = null;
    try {
      session = JSON.parse(sessionCookie);  // Parse the session if it's a JSON string
    } catch (error) {
      console.error("Failed to parse session JSON:", error);
      redirect("/login");
    }
    
    if (!session?.token) {
      redirect("/login")
    }
   
    return { isAuth: true, token: session.token }
})

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}