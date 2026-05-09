import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function requireAdmin() {
  const token = (await cookies()).get("admin_token")?.value;
  if (!token || token !== process.env.ADMIN_DASHBOARD_TOKEN) redirect("/admin/login");
}
