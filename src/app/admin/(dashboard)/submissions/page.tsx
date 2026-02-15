"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useToast } from "@/components/admin/toast";
import { Mail, MailOpen, Clock, User } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selected, setSelected] = useState<Submission | null>(null);
  const { toast } = useToast();

  const loadSubmissions = useCallback(async () => {
    const res = await fetch("/api/contact");
    setSubmissions(await res.json());
  }, []);

  useEffect(() => { loadSubmissions(); }, [loadSubmissions]);

  const markAsRead = async (id: string) => {
    // We don't have a PATCH endpoint yet, but the UI is ready
    toast("Message viewed", "info");
  };

  return (
    <>
      <AdminHeader title="Contact Submissions" />
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-2">
            <p className="text-sm text-gray-500 mb-3">{submissions.length} messages</p>
            {submissions.map((sub) => (
              <button
                key={sub.id}
                onClick={() => { setSelected(sub); markAsRead(sub.id); }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selected?.id === sub.id
                    ? "bg-[#F5A623]/5 border-[#F5A623]/20"
                    : "bg-[#0f1729] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {sub.read ? (
                    <MailOpen size={14} className="text-gray-500" />
                  ) : (
                    <Mail size={14} className="text-[#F5A623]" />
                  )}
                  <span className="text-sm font-medium text-white truncate">{sub.name}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{sub.subject || sub.message}</p>
                <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  <Clock size={10} />
                  {new Date(sub.createdAt).toLocaleString()}
                </p>
              </button>
            ))}
            {submissions.length === 0 && (
              <div className="text-center py-8 text-gray-500 text-sm">No submissions yet</div>
            )}
          </div>

          {/* Detail */}
          <div className="lg:col-span-2">
            {selected ? (
              <div className="bg-[#0f1729] border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{selected.subject || "No Subject"}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><User size={14} /> {selected.name}</span>
                      <span>{selected.email}</span>
                      {selected.phone && <span>{selected.phone}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(selected.createdAt).toLocaleString()}</span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{selected.message}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors">
                    <Mail size={16} /> Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-[#0f1729] border border-white/10 rounded-xl p-12 text-center text-gray-500">
                <Mail size={32} className="mx-auto mb-3 opacity-50" />
                <p>Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
