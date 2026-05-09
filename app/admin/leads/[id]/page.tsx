import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { LEAD_STATUSES } from "@/lib/types";

export default async function LeadDetail({ params }: { params: Promise<{ id:string }>}){
  await requireAdmin(); const {id}=await params;
  const { data: lead } = await supabaseAdmin.from("leads").select("*, partner_haulers(company_name)").eq("id",id).single();
  const { data: haulers } = await supabaseAdmin.from("partner_haulers").select("id,company_name").eq("active",true);
  async function updateLead(formData: FormData){"use server";
    await supabaseAdmin.from("leads").update({ status:String(formData.get("status")), quoted_price:Number(formData.get("quoted_price")||0), partner_cost:Number(formData.get("partner_cost")||0), partner_hauler_id:String(formData.get("partner_hauler_id")||"")||null, payment_status:String(formData.get("payment_status")||"unpaid"), customer_facing_notes:String(formData.get("customer_facing_notes")||""), internal_notes:String(formData.get("internal_notes")||"") }).eq("id", id);
  }
  return <main className="mx-auto max-w-3xl px-4 py-8"><form action={updateLead} className="card grid gap-3"><h1 className="text-2xl font-bold">{lead?.customer_name}</h1><select name="status" defaultValue={lead?.status}>{LEAD_STATUSES.map(s=><option key={s}>{s}</option>)}</select><input name="quoted_price" defaultValue={lead?.quoted_price||""} placeholder="Quoted customer price" className="rounded border p-2"/><input name="partner_cost" defaultValue={lead?.partner_cost||""} placeholder="Partner cost" className="rounded border p-2"/><select name="partner_hauler_id" defaultValue={lead?.partner_hauler_id||""}><option value="">Unassigned</option>{haulers?.map(h=><option value={h.id} key={h.id}>{h.company_name}</option>)}</select><select name="payment_status" defaultValue={lead?.payment_status||"unpaid"}><option>unpaid</option><option>deposit_paid</option><option>paid_in_full</option></select><textarea name="internal_notes" defaultValue={lead?.internal_notes||""} placeholder="Internal notes" className="rounded border p-2"/><textarea name="customer_facing_notes" defaultValue={lead?.customer_facing_notes||""} placeholder="Customer-facing notes" className="rounded border p-2"/><button className="rounded bg-brand-500 p-2 text-white">Save</button></form></main>
}
