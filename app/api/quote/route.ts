import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { calculateEstimate } from "@/lib/pricing";
import { sendEmail } from "@/lib/email";
import { sendSmsMock } from "@/lib/sms";

export async function POST(req: Request) {
  const body = await req.json();
  const { data: pricing } = await supabaseAdmin.from("pricing_rules").select("*");
  const base = pricing?.find((p) => p.rule_type === "base_price" && p.key === body.dumpster_size)?.value || 425;
  const city = pricing?.find((p) => p.rule_type === "city_surcharge" && p.key === body.city)?.value || 0;
  const material = pricing?.find((p) => p.rule_type === "material_surcharge" && p.key === body.material_type)?.value || 0;
  const estimate = calculateEstimate({ basePrice: base, citySurcharge: city, materialSurcharge: material, rentalDays: Number(body.rental_duration_days || 7) });

  const { data, error } = await supabaseAdmin.from("leads").insert({ ...body, status: "New", estimated_min_price: estimate.min, estimated_max_price: estimate.max }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await sendEmail(body.email, "We got your dumpster quote request", `<p>Thanks ${body.customer_name}. We received your request for a ${body.dumpster_size} in ${body.city}.</p><p>Next step: availability and final pricing confirmation.</p>`);
  if (process.env.ADMIN_NOTIFICATION_EMAIL) {
    await sendEmail(process.env.ADMIN_NOTIFICATION_EMAIL, "New dumpster lead", `<p>${body.customer_name} | ${body.phone} | ${body.email}</p><p>${body.city} ${body.delivery_date} ${body.project_type}</p>`);
  }
  await sendSmsMock(body.phone, "OC Bin Broker received your quote request.");

  return NextResponse.json({ id: data.id, estimate });
}
