import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Login(){
  async function act(formData: FormData){"use server"; const t=String(formData.get("token")||""); if(t===process.env.ADMIN_DASHBOARD_TOKEN){(await cookies()).set("admin_token", t); redirect("/admin");}}
  return <main className="mx-auto max-w-md px-4 py-10"><form action={act} className="card space-y-3"><h1 className="text-2xl font-bold">Admin Login</h1><input name="token" className="w-full rounded border p-2" placeholder="Admin token"/><button className="w-full rounded bg-brand-500 p-2 text-white">Sign In</button></form></main>
}
