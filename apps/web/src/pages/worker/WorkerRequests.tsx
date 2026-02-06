import { useNavigate } from "react-router-dom";
import { Clock, Shield, Zap } from "lucide-react";
import { mockData } from "../../mock/mockData";

export default function WorkerRequests({ user }: { user: any }) {
  const navigate = useNavigate();
  const jobs = mockData.jobs;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Requests</h1>
            <p className="text-slate-600 mt-1">Incoming jobs ranked by fit (mocked).</p>
          </div>
          <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-emerald-700">{user.reliabilityScore}%</span>
          </div>
        </div>

        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 border border-slate-200 rounded-xl hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-900">{job.title}</p>
                    {job.isEmergency && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" /> EMERGENCY
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{job.summary}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> ETA {job.etaMinutes} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-emerald-600" /> Customer {job.poster.reliability}%
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">${job.price}</p>
                  <button
                    onClick={() => navigate(`/worker/live-job/${job.id}`)}
                    className="mt-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-slate-500">Sprint 3: add accept/decline buttons + emergency lock rules.</div>
      </div>
    </div>
  );
}