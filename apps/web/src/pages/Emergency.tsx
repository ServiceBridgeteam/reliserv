import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Shield, Zap } from "lucide-react";
import { mockData } from "../mock/mockData";

export default function Emergency({ user }: { user: any }) {
  const navigate = useNavigate();
  const workers = mockData.workers;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white mb-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Zap className="w-7 h-7" />
                Emergency Mode
              </h1>
              <p className="text-red-100 mt-2">
                We prioritize nearby workers by ETA + reliability. First accept locks the job.
              </p>
            </div>

            <div className="bg-white/15 rounded-xl p-4 border border-white/20">
              <p className="text-sm text-red-100">Your reliability</p>
              <p className="text-2xl font-bold">{user.reliabilityScore}%</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-red-100">
            <MapPin className="w-5 h-5" />
            Location required • Current location enabled
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate("/live-job")}
              className="px-6 py-3 bg-white text-red-600 rounded-xl font-semibold hover:bg-red-50 transition"
            >
              Create Emergency Request
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Nearby reliable workers</h2>
          <p className="text-slate-600 text-sm mb-6">This list is ordered by reliability + ETA (mocked for now).</p>

          <div className="space-y-3">
            {workers.map((w) => (
              <div key={w.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{w.name}</p>
                    <p className="text-sm text-slate-600 capitalize">{w.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        ETA {w.eta}
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-emerald-600" />
                        {w.reliability}%
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/live-job")}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xs text-slate-500">
            V1 note: this is mocked. In Sprint 3–4 we’ll implement lock-on-accept + realtime updates.
          </div>
        </div>
      </div>
    </div>
  );
}