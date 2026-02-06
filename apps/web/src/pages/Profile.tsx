import { Shield, User, Phone, Mail, TrendingUp } from "lucide-react";

export default function Profile({ user }: { user: any }) {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-2xl">
              {user.name?.charAt(0)}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-600 capitalize">{user.role}</p>
            </div>

            <div className="px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="text-lg font-bold text-emerald-700">{user.reliabilityScore}%</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <User className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Completed jobs</p>
                <p className="font-semibold text-slate-900">{user.completedJobs}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Emergency history</p>
                <p className="font-semibold text-slate-900">{user.emergencyResponseHistory}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <Phone className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Phone</p>
                <p className="font-semibold text-slate-900">{user.phone}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 flex items-center gap-3">
              <Mail className="w-5 h-5 text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="font-semibold text-slate-900">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-sm text-slate-500">
            V1: Profile is view-only. Sprint 2–3: we connect reliability events + account settings.
          </div>
        </div>
      </div>
    </div>
  );
}