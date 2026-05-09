import Link from "next/link";
import { notFound } from "next/navigation";

const cityMap: Record<string,{city:string;title:string;description:string}> = {
  "anaheim-ca": { city:"Anaheim", title:"Dumpster Rental in Anaheim, CA | OC Bin Broker", description:"Fast dumpster rental quotes in Anaheim with transparent pricing."},
  "orange-ca": { city:"Orange", title:"Dumpster Rental in Orange, CA | OC Bin Broker", description:"Local dumpster rental broker for Orange homeowners and contractors."},
  "fullerton-ca": { city:"Fullerton", title:"Dumpster Rental in Fullerton, CA | OC Bin Broker", description:"Reliable Fullerton dumpster rental coordination across multiple sizes."},
  "garden-grove-ca": { city:"Garden Grove", title:"Dumpster Rental in Garden Grove, CA | OC Bin Broker", description:"Garden Grove dumpster rentals with local hauler dispatch."},
  "santa-ana-ca": { city:"Santa Ana", title:"Dumpster Rental in Santa Ana, CA | OC Bin Broker", description:"Santa Ana dumpster quote support for remodels and cleanouts."},
  "irvine-ca": { city:"Irvine", title:"Dumpster Rental in Irvine, CA | OC Bin Broker", description:"Irvine dumpster rental services with easy online quote flow."},
  "huntington-beach-ca": { city:"Huntington Beach", title:"Dumpster Rental in Huntington Beach, CA | OC Bin Broker", description:"Huntington Beach dumpster rentals with dependable scheduling."}
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const p = await params; return cityMap[p.slug] ?? {}; }

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = await params; const info = cityMap[p.slug]; if (!info) notFound();
  const faqJson = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":`How fast can I get a dumpster in ${info.city}?`,`acceptedAnswer":{"@type":"Answer","text":"Often next-day, sometimes same-day depending on inventory."}}]};
  return <main className="mx-auto max-w-4xl px-4 py-8"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqJson)}}/><div className="card"><h1 className="text-3xl font-bold">Dumpster Rental in {info.city}, CA</h1><p className="mt-2">We coordinate local haulers in {info.city} for cleanouts, remodels, and job sites.</p><p className="mt-2 text-sm">Service includes delivery coordination, transparent quote review, prohibited-item reminders, permit responsibility, and overage policy confirmation.</p><Link href="/quote" className="mt-4 inline-block rounded bg-brand-500 px-4 py-2 text-white">Start My Quote</Link></div></main>;
}
