import { MapPin, Shield, Zap } from "lucide-react";
import { mockData } from "../mock/mockData";

export default function MapView() {
  const jobs = mockData.jobs;
  const workers = mockData.workers;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Map View</h1>
        <p className="text-slate-600 mb-6">V1 placeholder “map” with nearby workers + job markers.</p>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 min-h-[480px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center gap-2 text-slate-700 font-semibold mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                Map (placeholder)
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-3">
                {jobs.map((j) => (
                  <div key={j.id} className="p-3 bg-white/90 border border-slate-200 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900 truncate">{j.title}</span>
                      {j.isEmergency && <Zap className="w-4 h-4 text-red-500" />}
                    </div>
                    <div className="mt-2 text-xs text-slate-600 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      {j.poster.reliability}%
                      <span className="text-slate-400">•</span>
                      {j.distanceMiles} mi
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Sprint 4: Replace this panel with real Google Maps / Mapbox + markers.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Nearby Workers</h2>
            <div className="space-y-3">
              {workers.map((w) => (
                <div key={w.id} className="p-4 border border-slate-200 rounded-xl">
                  <p className="font-semibold text-slate-900">{w.name}</p>
                  <p className="text-sm text-slate-600 capitalize">{w.specialty}</p>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-slate-600">ETA {w.eta}</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {w.reliability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-xs text-slate-500">
              Sprint 3–4: tie this to emergency opt-in + realtime availability.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}