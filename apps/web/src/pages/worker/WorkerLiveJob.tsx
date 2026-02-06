import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockData } from "../../mock/mockData";
import { CheckCircle, Clock, Shield, Zap } from "lucide-react";

export default function WorkerLiveJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const job = useMemo(
    () => mockData.jobs.find((j) => String(j.id) === String(jobId)) || mockData.jobs[0],
    [jobId]
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
              {job.isEmergency && (
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> EMERGENCY
                </span>
              )}
            </div>
            <p className="text-slate-600 mt-1">{job.summary}</p>
          </div>

          <button
            onClick={() => navigate("/worker/completion")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Complete
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Clock className="w-4 h-4" /> ETA
            </p>
            <p className="text-lg font-bold text-slate-900 mt-1">{job.etaMinutes} min</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Customer Reliability
            </p>
            <p className="text-lg font-bold text-emerald-700 mt-1">{job.poster.reliability}%</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600">Pay</p>
            <p className="text-lg font-bold text-slate-900 mt-1">${job.price}</p>
          </div>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
          <p className="font-semibold text-slate-900 mb-2">Locked scope</p>
          <p className="text-slate-700">{job.lockedScope}</p>

          <div className="mt-4 text-sm text-slate-600 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" /> Scope locked. Follow it to protect reliability.
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition">
            Decline (V1 placeholder)
          </button>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition">
            Accept (V1 placeholder)
          </button>
        </div>

        <div className="mt-6 text-xs text-slate-500">
          Sprint 3: accept triggers lock-on-accept (especially emergencies) + job state transitions.
        </div>
      </div>
    </div>
  );
}