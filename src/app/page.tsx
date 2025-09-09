import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const token = (await cookies()).get(process.env.JWT_COOKIE_NAME ?? "auth_token")?.value;
  redirect(token ? "/dashboard" : "/login");
}
