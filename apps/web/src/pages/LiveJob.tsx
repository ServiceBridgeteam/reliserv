import { useNavigate } from "react-router-dom";
import { Clock, MapPin, Shield, Zap, MessageCircle, CheckCircle } from "lucide-react";
import { mockData } from "../mock/mockData";

export default function LiveJob() {
  const navigate = useNavigate();
  const job = mockData.jobs[1];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                {job.isEmergency && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    EMERGENCY
                  </span>
                )}
              </div>
              <p className="text-slate-600 mt-1">{job.summary}</p>
            </div>

            <button
              onClick={() => navigate("/completion")}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              Mark Complete
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Clock className="w-4 h-4" />
                ETA
              </div>
              <p className="text-lg font-bold text-slate-900 mt-1">{job.etaMinutes} min</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <MapPin className="w-4 h-4" />
                Distance
              </div>
              <p className="text-lg font-bold text-slate-900 mt-1">{job.distanceMiles} mi</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <Shield className="w-4 h-4 text-emerald-600" />
                Assigned worker reliability
              </div>
              <p className="text-lg font-bold text-emerald-700 mt-1">{mockData.workers[0].reliability}%</p>
            </div>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
            <p className="font-semibold text-slate-900 mb-2">Locked scope</p>
            <p className="text-slate-700">{job.lockedScope}</p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Scope locked — reduces disputes and cancellations.
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-slate-500" />
                Chat (mock)
              </p>
              <span className="text-xs text-slate-500">Sprint 4: realtime chat</span>
            </div>

            <div className="mt-3 space-y-3 text-sm">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                Worker: On my way. ETA ~12 minutes.
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">You: Great, thank you!</div>
            </div>

            <div className="mt-4 flex gap-2">
              <input className="flex-1 border border-slate-200 rounded-xl px-4 py-2" placeholder="Type message..." />
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition">
                Send
              </button>
            </div>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            V1 note: Live job is UI only. Sprint 3–5 adds lock-on-accept, state machine, payments, and reviews.
          </div>
        </div>
      </div>
    </div>
  );
}