"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useToast } from "@/components/admin/toast";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { Plus, Save, Trash2, GripVertical } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: string;
  order: number;
  active: boolean;
}

export default function FAQsAdminPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newFaq, setNewFaq] = useState<{ question: string; answer: string } | null>(null);
  const { toast } = useToast();

  const loadFaqs = useCallback(async () => {
    const res = await fetch("/api/faqs");
    setFaqs(await res.json());
  }, []);

  useEffect(() => { loadFaqs(); }, [loadFaqs]);

  const handleSave = async (faq: FAQ) => {
    const res = await fetch(`/api/faqs/${faq.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faq),
    });
    if (res.ok) { toast("FAQ updated", "success"); loadFaqs(); setEditingId(null); }
    else { toast("Failed to update", "error"); }
  };

  const handleCreate = async () => {
    if (!newFaq) return;
    const res = await fetch("/api/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newFaq, order: faqs.length }),
    });
    if (res.ok) { toast("FAQ created", "success"); loadFaqs(); setNewFaq(null); }
    else { toast("Failed to create", "error"); }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const res = await fetch(`/api/faqs/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) { toast("FAQ deleted", "success"); loadFaqs(); }
    else { toast("Failed to delete", "error"); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  return (
    <>
      <AdminHeader title="FAQs" />
      <main className="p-6 max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-montserrat)]">All FAQs</h2>
          <button onClick={() => setNewFaq({ question: "", answer: "" })} className="flex items-center gap-2 px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors">
            <Plus size={16} /> Add FAQ
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-[#0f1729] border border-white/10 rounded-xl p-4">
              {editingId === faq.id ? (
                <div className="space-y-3">
                  <input value={faq.question} onChange={(e) => setFaqs(faqs.map((f) => f.id === faq.id ? { ...f, question: e.target.value } : f))} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50" placeholder="Question" />
                  <textarea value={faq.answer} onChange={(e) => setFaqs(faqs.map((f) => f.id === faq.id ? { ...f, answer: e.target.value } : f))} rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50 resize-none" placeholder="Answer" />
                  <div className="flex gap-2">
                    <button onClick={() => handleSave(faq)} className="flex items-center gap-1 px-3 py-1.5 bg-[#F5A623] text-black text-xs rounded transition-colors"><Save size={14} /> Save</button>
                    <button onClick={() => { setEditingId(null); loadFaqs(); }} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <GripVertical size={16} className="text-gray-600 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{faq.question}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setEditingId(faq.id)} className="p-1.5 text-gray-400 hover:text-[#F5A623] transition-colors text-xs">Edit</button>
                    <button onClick={() => setDeleteTarget(faq)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {newFaq && (
            <div className="bg-[#0f1729] border border-[#F5A623]/20 rounded-xl p-4 space-y-3">
              <input value={newFaq.question} onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50" placeholder="Question" />
              <textarea value={newFaq.answer} onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })} rows={3} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/50 resize-none" placeholder="Answer" />
              <div className="flex gap-2">
                <button onClick={handleCreate} className="flex items-center gap-1 px-3 py-1.5 bg-[#F5A623] text-black text-xs rounded transition-colors"><Save size={14} /> Create</button>
                <button onClick={() => setNewFaq(null)} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {faqs.length === 0 && !newFaq && (
            <div className="text-center py-8 text-gray-500">No FAQs yet. Click &quot;Add FAQ&quot; to create one.</div>
          )}
        </div>

        <ConfirmDialog open={!!deleteTarget} title="Delete FAQ" message={`Delete this FAQ?`} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
      </main>
    </>
  );
}
