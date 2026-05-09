export default async function ThankYou({ searchParams }: { searchParams: Promise<{ estimate?: string }> }) {
  const params = await searchParams;
  return <main className="mx-auto max-w-2xl px-4 py-10"><div className="card"><h1 className="text-3xl font-bold">Thanks! We received your request.</h1>{params.estimate ? <p className="mt-3">Estimated range: ${params.estimate.replace("-", " - $")}. Final availability and pricing will be confirmed shortly.</p> : <p className="mt-3">We’re confirming availability with our hauler network and will follow up fast.</p>}</div></main>;
}
