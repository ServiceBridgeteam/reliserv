import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Star, ThumbsDown, ThumbsUp, Zap } from "lucide-react";
import { mockData } from "../mock/mockData";

export default function Completion() {
  const navigate = useNavigate();
  const job = mockData.jobs[1];
  const [rating, setRating] = useState(5);
  const [reliabilityImpact, setReliabilityImpact] = useState<"positive" | "negative">("positive");
  const [notes, setNotes] = useState("");

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Complete Job</h1>
            <p className="text-slate-600 mt-1">{job.title}</p>
          </div>
          {job.isEmergency && (
            <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full flex items-center gap-2">
              <Zap className="w-4 h-4" /> Emergency review required
            </span>
          )}
        </div>

        <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 mb-6">
          <p className="font-semibold text-slate-900 mb-3">Rate the experience</p>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)}>
                <Star
                  className={`w-7 h-7 ${i < rating ? "text-yellow-400" : "text-slate-300"}`}
                  fill={i < rating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-slate-700 mb-2">Reliability impact (primary)</p>
            <div className="flex gap-3">
              <button
                onClick={() => setReliabilityImpact("positive")}
                className={`flex-1 p-3 rounded-xl border font-semibold flex items-center justify-center gap-2 ${
                  reliabilityImpact === "positive"
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <ThumbsUp className="w-4 h-4" /> Positive
              </button>

              <button
                onClick={() => setReliabilityImpact("negative")}
                className={`flex-1 p-3 rounded-xl border font-semibold flex items-center justify-center gap-2 ${
                  reliabilityImpact === "negative"
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <ThumbsDown className="w-4 h-4" /> Negative
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-slate-700">Notes (optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3"
            placeholder="What went well? Any issues?"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-600 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Reliability score updates after completion.
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}