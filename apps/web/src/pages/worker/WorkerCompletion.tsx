import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield, Zap } from "lucide-react";

export default function WorkerCompletion() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900">Worker Completion</h1>
        <p className="text-slate-600 mt-1">Confirm completion and trigger customer review (mock).</p>

        <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Completion recorded</p>
              <p className="text-sm text-slate-600">In V1 this is UI-only.</p>
            </div>
          </div>

          <div className="mt-5 text-sm text-slate-600 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Reliability updates after job completion.
          </div>

          <div className="mt-3 text-sm text-slate-600 flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-500" />
            Emergency jobs require reviews (Sprint 5).
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/worker/dashboard")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}