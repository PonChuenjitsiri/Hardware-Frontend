import { cookies } from "next/headers";


export async function getToken() {
    const cookieName = process.env.JWT_COOKIE_NAME || "auth_token";
    const token = (await cookies()).get(cookieName)?.value;
    return token || null;
}