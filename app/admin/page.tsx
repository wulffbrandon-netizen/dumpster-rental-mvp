import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminPage(){
  await requireAdmin();
  const { data } = await supabaseAdmin.from("leads").select("*").order("created_at", { ascending:false });
  return <main className="mx-auto max-w-6xl px-4 py-8"><div className="mb-4 flex gap-2"><Link href="/admin/haulers" className="rounded border px-3 py-1">Manage Haulers</Link><a href="/api/admin/leads/export" className="rounded border px-3 py-1">Export CSV</a></div><div className="card overflow-x-auto"><table className="w-full text-sm"><thead><tr><th>Name</th><th>City</th><th>Size</th><th>Status</th><th>Margin</th></tr></thead><tbody>{data?.map((l)=><tr key={l.id} className="border-t"><td><Link href={`/admin/leads/${l.id}`}>{l.customer_name}</Link></td><td>{l.city}</td><td>{l.dumpster_size}</td><td>{l.status}</td><td>${l.quoted_price && l.partner_cost ? l.quoted_price-l.partner_cost : "-"}</td></tr>)}</tbody></table></div></main>
}
