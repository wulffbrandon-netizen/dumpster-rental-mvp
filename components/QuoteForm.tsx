"use client";

import { useState } from "react";
import { DUMPSTER_SIZES, PROJECT_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function QuoteForm() {
  const [form, setForm] = useState({ customer_name:"", phone:"", email:"", address:"", city:"", zip:"", delivery_date:"", rental_duration_days:7, dumpster_size:"20 yd", project_type:PROJECT_TYPES[0], material_type:"Mixed", estimated_weight_tons:"", special_notes:"", consent:false });
  const router = useRouter();

  async function submit() {
    const res = await fetch("/api/quote", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({...form, estimated_weight_tons: Number(form.estimated_weight_tons || 0)}) });
    const data = await res.json();
    router.push(`/thank-you?id=${data.id}&estimate=${data.estimate ? `${data.estimate.min}-${data.estimate.max}` : ""}`);
  }

  return <div className="card space-y-3">
    {Object.entries(form).map(([k,v])=> k !== "consent" && k !== "special_notes" && k !== "project_type" && k !== "dumpster_size" ? <input key={k} className="w-full rounded border p-2" placeholder={k.replaceAll("_"," ")} value={String(v)} onChange={(e)=>setForm({...form,[k]:e.target.value})} /> : null)}
    <select className="w-full rounded border p-2" value={form.dumpster_size} onChange={(e)=>setForm({...form,dumpster_size:e.target.value})}>{DUMPSTER_SIZES.map(s=><option key={s}>{s}</option>)}</select>
    <select className="w-full rounded border p-2" value={form.project_type} onChange={(e)=>setForm({...form,project_type:e.target.value})}>{PROJECT_TYPES.map(s=><option key={s}>{s}</option>)}</select>
    <textarea className="w-full rounded border p-2" placeholder="Special notes" onChange={(e)=>setForm({...form,special_notes:e.target.value})} />
    <label className="flex gap-2 text-sm"><input type="checkbox" onChange={(e)=>setForm({...form,consent:e.target.checked})} /> I agree to terms and compliance policies.</label>
    <button onClick={submit} className="sticky bottom-2 w-full rounded bg-brand-500 p-3 font-semibold text-white">Submit Quote Request</button>
  </div>;
}
