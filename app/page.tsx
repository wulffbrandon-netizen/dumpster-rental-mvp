import Link from "next/link";
import { DUMPSTER_SIZES } from "@/lib/constants";

export default function Home() {
  return <main className="mx-auto max-w-6xl space-y-10 px-4 py-8">
    <section className="card">
      <h1 className="text-4xl font-bold">Dumpster Rentals Made Easy in Orange County</h1>
      <p className="mt-3 text-slate-600">Reliable, fast, transparent service from OC Bin Broker.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3"><input className="rounded border p-3" placeholder="ZIP or City"/><select className="rounded border p-3"><option>Home cleanout</option></select><Link href="/quote" className="rounded bg-brand-500 p-3 text-center font-semibold text-white">Get My Quote</Link></div>
    </section>
    <section className="grid gap-4 md:grid-cols-4">{DUMPSTER_SIZES.map((s)=><div key={s} className="card"><h3 className="font-semibold">{s}</h3><p className="text-sm">Driveway-friendly option.</p></div>)}</section>
    <section className="grid gap-4 md:grid-cols-2"><div className="card"><h2 className="font-bold">Why choose us</h2><ul className="mt-2 list-disc pl-5 text-sm"><li>Transparent pricing</li><li>Fast delivery coordination</li><li>Local hauler network</li><li>Driveway-friendly bins</li></ul></div><div className="card"><h2 className="font-bold">FAQ</h2><p className="text-sm">Q: Can I book same-day? A: Availability varies by city and size.</p></div></section>
    <section className="card"><h2 className="font-bold">Service areas</h2><p className="text-sm">Anaheim, Orange, Fullerton, Garden Grove, Santa Ana, Irvine, Huntington Beach.</p></section>
  </main>;
}
