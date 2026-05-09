import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { Parser } from "json2csv";

export async function GET() {
  const { data } = await supabaseAdmin.from("leads").select("*");
  const csv = new Parser().parse(data || []);
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=leads.csv" } });
}
