import { useNavigate } from "react-router-dom";
import { Clock, DollarSign, MapPin, Package, Shield, TrendingUp, Zap, CheckCircle } from "lucide-react";
import { mockData } from "../mock/mockData";

export default function Dashboard({ user }: { user: any }) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => navigate("/post-job")}
          className="p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 text-lg">Post a Job</h3>
              <p className="text-sm text-slate-600">Describe what you need</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate("/emergency")}
          className="p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-white text-lg">Emergency</h3>
              <p className="text-sm text-red-100">Get help now</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate("/map")}
          className="p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-slate-900 text-lg">View Map</h3>
              <p className="text-sm text-slate-600">See nearby workers</p>
            </div>
          </div>
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm">Jobs Completed</span>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{user.completedJobs}</p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm">Reliability</span>
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-bold text-emerald-600">{user.reliabilityScore}%</p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600 text-sm">Spending</span>
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-slate-900">${user.spending}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Recent Jobs</h3>
        <div className="space-y-3">
          {mockData.jobs.map((job) => (
            <div
              key={job.id}
              onClick={() => navigate("/live-job")}
              className="p-4 border border-slate-200 rounded-lg hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-slate-900">{job.title}</h4>
                    {job.isEmergency && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        EMERGENCY
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {job.poster.reliability}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-900">${job.price}</p>
                  <p className="text-xs text-slate-500">{job.complexity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}