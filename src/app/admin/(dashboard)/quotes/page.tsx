"use client";

import { useState, useEffect, useCallback } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { useToast } from "@/components/admin/toast";
import {
  Plus,
  X,
  Search,
  Trash2,
  Phone,
  Mail,
  ChevronRight,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LeadItem {
  id: string;
  referenceNumber: string;
  companyName: string;
  contactPerson: string;
  email: string | null;
  phone: string;
  city: string;
  fleetSize: string | null;
  planInterest: string | null;
  status: string;
  source: string;
  callDate: string | null;
  nextFollowUpDate: string | null;
  adminNotes: string | null;
  createdAt: string;
}

interface LeadDetail extends LeadItem {
  industry: string | null;
  jobTitle: string | null;
  vehicleTypes: string[];
  fleetLocations: string | null;
  hasTrackingSystem: string | null;
  currentProvider: string | null;
  coreFeatures: string[];
  hardwareNeeded: string[];
  mobileApp: string | null;
  challenges: string[];
  integrationNeeds: string[];
  budgetRange: string | null;
  timeline: string | null;
  preferredDate: string | null;
  contactMethod: string | null;
  bestTime: string | null;
  howHeard: string | null;
  additionalNotes: string | null;
  termsAccepted: boolean;
  marketingConsent: boolean;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  prospect: { label: "Prospect", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  "follow-up": { label: "Follow-up", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  closed: { label: "Closed", color: "text-green-400", bg: "bg-green-400/10" },
  "not-interested": { label: "Not Interested", color: "text-red-400", bg: "bg-red-400/10" },
};

const allStatuses = ["all", "prospect", "follow-up", "closed", "not-interested"];

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AdminQuotesPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadDetail | null>(null);
  const { toast } = useToast();

  const loadLeads = useCallback(async () => {
    const res = await fetch(
      `/api/fleet-quotes${filter !== "all" ? `?status=${filter}` : ""}`
    );
    if (res.ok) setLeads(await res.json());
  }, [filter]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/fleet-quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
        if (selectedLead?.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status } : null));
        }
        toast("Status updated", "success");
      }
    } catch {
      toast("Failed to update status", "error");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead permanently?")) return;
    try {
      await fetch(`/api/fleet-quotes/${id}`, { method: "DELETE" });
      toast("Lead deleted", "success");
      if (selectedLead?.id === id) setSelectedLead(null);
      loadLeads();
    } catch {
      toast("Failed to delete", "error");
    }
  };

  const openDetail = async (id: string) => {
    const res = await fetch(`/api/fleet-quotes/${id}`);
    if (res.ok) setSelectedLead(await res.json());
  };

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.companyName.toLowerCase().includes(q) ||
      l.contactPerson.toLowerCase().includes(q) ||
      l.phone.includes(q)
    );
  });

  const statusCounts = leads.reduce(
    (acc, l) => {
      acc[l.status] = (acc[l.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <>
      <AdminHeader title="Fleet Leads" />
      <main className="p-4 sm:p-6">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {allStatuses.map((s) => {
            const cfg = statusConfig[s];
            const count = s === "all" ? leads.length : statusCounts[s] || 0;
            return (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  filter === s
                    ? "bg-[#F5A623]/10 border-[#F5A623]/30 text-[#F5A623]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                )}
              >
                {s === "all" ? "All" : cfg?.label || s} ({count})
              </button>
            );
          })}
        </div>

        {/* Search + Add Lead */}
        <div className="flex items-center justify-between mb-4 gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search company or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            Add Lead
          </button>
        </div>

        {/* CRM Table */}
        <div className="bg-[#0f1729] border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-10">
                    #
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Call Date
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Sales Status
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Next Follow-up
                  </th>
                  <th className="text-left px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    Remarks
                  </th>
                  <th className="text-right px-3 py-3 text-[10px] font-medium text-gray-500 uppercase tracking-wider w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-500 text-sm">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead, idx) => {
                    const cfg = statusConfig[lead.status] || statusConfig.prospect;
                    return (
                      <tr
                        key={lead.id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => openDetail(lead.id)}
                      >
                        <td className="px-3 py-3 text-xs text-gray-500">{idx + 1}</td>
                        <td className="px-3 py-3 text-xs text-gray-300">
                          {formatDate(lead.callDate || lead.createdAt)}
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-300">{lead.city}</td>
                        <td className="px-3 py-3 text-sm text-white font-medium">
                          {lead.contactPerson}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-300">
                          {lead.companyName}
                          {lead.source === "form" && (
                            <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">
                              Form
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-300 font-mono">
                          {lead.phone}
                        </td>
                        <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                            className={cn(
                              "text-[11px] font-semibold px-2 py-1 rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40",
                              cfg.color,
                              cfg.bg
                            )}
                          >
                            {Object.entries(statusConfig).map(([key, c]) => (
                              <option key={key} value={key} className="bg-[#0f1729] text-white">
                                {c.label}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-300">
                          {formatDate(lead.nextFollowUpDate)}
                        </td>
                        <td className="px-3 py-3 text-xs text-gray-400 max-w-[200px] truncate">
                          {lead.adminNotes || "—"}
                        </td>
                        <td
                          className="px-3 py-3 text-right"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-600 mt-3">
          {filtered.length} lead{filtered.length !== 1 ? "s" : ""}
          {search && ` matching "${search}"`}
        </p>
      </main>

      {/* Add Lead Modal */}
      {showAddModal && (
        <AddLeadModal
          onClose={() => setShowAddModal(false)}
          onAdded={() => {
            setShowAddModal(false);
            loadLeads();
          }}
          toast={toast}
        />
      )}

      {/* Detail Side Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={(status) => updateStatus(selectedLead.id, status)}
          onDelete={() => deleteLead(selectedLead.id)}
          onSaved={() => {
            loadLeads();
            // Refresh detail
            openDetail(selectedLead.id);
          }}
          toast={toast}
        />
      )}
    </>
  );
}

// ─── Add Lead Modal ──────────────────────────────────────────

function AddLeadModal({
  onClose,
  onAdded,
  toast,
}: {
  onClose: () => void;
  onAdded: () => void;
  toast: (msg: string, type: "success" | "error") => void;
}) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    contactPerson: "",
    companyName: "",
    phone: "",
    email: "",
    city: "",
    callDate: new Date().toISOString().split("T")[0],
    status: "prospect",
    nextFollowUpDate: "",
    adminNotes: "",
  });

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = async () => {
    if (!form.contactPerson || !form.companyName || !form.phone || !form.city) {
      toast("Please fill all required fields", "error");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/fleet-quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "manual" }),
      });
      if (res.ok) {
        toast("Lead added successfully", "success");
        onAdded();
      } else {
        const data = await res.json();
        toast(data.error || "Failed to add lead", "error");
      }
    } catch {
      toast("Failed to add lead", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-[#0f1729] border border-white/10 rounded-xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white font-[family-name:var(--font-montserrat)]">
            Add New Lead
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ModalInput label="Customer Name *" value={form.contactPerson} onChange={(v) => update("contactPerson", v)} />
          <ModalInput label="Company Name *" value={form.companyName} onChange={(v) => update("companyName", v)} />
          <ModalInput label="Phone *" value={form.phone} onChange={(v) => update("phone", v)} />
          <ModalInput label="Email" value={form.email} onChange={(v) => update("email", v)} type="email" />
          <ModalInput label="Location / City *" value={form.city} onChange={(v) => update("city", v)} />
          <ModalInput label="Call Date" value={form.callDate} onChange={(v) => update("callDate", v)} type="date" />
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Sales Status</label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50"
            >
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <option key={key} value={key} className="bg-[#0f1729]">
                  {cfg.label}
                </option>
              ))}
            </select>
          </div>
          <ModalInput label="Next Follow-up" value={form.nextFollowUpDate} onChange={(v) => update("nextFollowUpDate", v)} type="date" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Remarks</label>
          <textarea
            value={form.adminNotes}
            onChange={(e) => update("adminNotes", e.target.value)}
            rows={3}
            placeholder="Notes about this lead..."
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-5 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? "Adding..." : "Add Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModalInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50"
      />
    </div>
  );
}

// ─── Lead Detail Side Panel ─────────────────────────────────

function LeadDetailPanel({
  lead,
  onClose,
  onStatusChange,
  onDelete,
  onSaved,
  toast,
}: {
  lead: LeadDetail;
  onClose: () => void;
  onStatusChange: (status: string) => void;
  onDelete: () => void;
  onSaved: () => void;
  toast: (msg: string, type: "success" | "error") => void;
}) {
  const [notes, setNotes] = useState(lead.adminNotes || "");
  const [nextFollowUp, setNextFollowUp] = useState(
    lead.nextFollowUpDate ? new Date(lead.nextFollowUpDate).toISOString().split("T")[0] : ""
  );
  const [saving, setSaving] = useState(false);

  const saveNotes = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/fleet-quotes/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminNotes: notes,
          nextFollowUpDate: nextFollowUp || null,
        }),
      });
      if (res.ok) {
        toast("Saved", "success");
        onSaved();
      }
    } catch {
      toast("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  };

  const cfg = statusConfig[lead.status] || statusConfig.prospect;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-screen w-full max-w-lg bg-[#0a1020] border-l border-white/10 z-50 overflow-y-auto">
        <div className="p-6 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{lead.companyName}</h3>
              <p className="text-xs text-gray-500 font-mono mt-0.5">{lead.referenceNumber}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", cfg.color, cfg.bg)}>
                  {cfg.label}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-500">
                  {lead.source === "form" ? "Form Submission" : "Manual Entry"}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Contact Info */}
          <DetailSection title="Contact Information">
            <DetailGrid>
              <DetailItem label="Contact Person" value={lead.contactPerson} />
              <DetailItem label="Job Title" value={lead.jobTitle} />
              <DetailItem label="Email" value={lead.email} />
              <DetailItem label="Phone" value={lead.phone} />
              <DetailItem label="Industry" value={lead.industry} />
              <DetailItem label="City" value={lead.city} />
            </DetailGrid>
          </DetailSection>

          {/* Fleet Details (only for form submissions) */}
          {lead.source === "form" && (
            <>
              <DetailSection title="Fleet Details">
                <DetailGrid>
                  <DetailItem label="Fleet Size" value={lead.fleetSize} />
                  <DetailItem label="Vehicle Types" value={lead.vehicleTypes?.join(", ")} />
                  <DetailItem label="Locations" value={lead.fleetLocations} />
                  <DetailItem label="Current Tracking" value={lead.hasTrackingSystem} />
                  <DetailItem label="Current Provider" value={lead.currentProvider} />
                </DetailGrid>
              </DetailSection>

              <DetailSection title="Services Required">
                <DetailGrid>
                  <DetailItem label="Plan Interest" value={lead.planInterest} />
                  <DetailItem label="Core Features" value={lead.coreFeatures?.join(", ")} />
                  <DetailItem label="Hardware" value={lead.hardwareNeeded?.join(", ") || "None"} />
                  <DetailItem label="Mobile App" value={lead.mobileApp} />
                </DetailGrid>
              </DetailSection>

              <DetailSection title="Requirements">
                <DetailGrid>
                  <DetailItem label="Challenges" value={lead.challenges?.join(", ")} />
                  <DetailItem label="Integrations" value={lead.integrationNeeds?.join(", ") || "None"} />
                  <DetailItem label="Budget Range" value={lead.budgetRange} />
                  <DetailItem label="Timeline" value={lead.timeline} />
                  {lead.preferredDate && (
                    <DetailItem label="Preferred Date" value={formatDate(lead.preferredDate)} />
                  )}
                </DetailGrid>
              </DetailSection>

              <DetailSection title="Contact Preferences">
                <DetailGrid>
                  <DetailItem label="Contact Method" value={lead.contactMethod} />
                  <DetailItem label="Best Time" value={lead.bestTime} />
                  <DetailItem label="How Heard" value={lead.howHeard} />
                  <DetailItem label="Marketing Consent" value={lead.marketingConsent ? "Yes" : "No"} />
                </DetailGrid>
                {lead.additionalNotes && (
                  <div className="mt-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider">Additional Notes</p>
                    <p className="text-sm text-gray-300 whitespace-pre-wrap mt-1">{lead.additionalNotes}</p>
                  </div>
                )}
              </DetailSection>
            </>
          )}

          {/* CRM Section */}
          <DetailSection title="Sales Tracking">
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Status</label>
                <select
                  value={lead.status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40"
                >
                  {Object.entries(statusConfig).map(([key, c]) => (
                    <option key={key} value={key} className="bg-[#0f1729]">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Next Follow-up Date</label>
                <input
                  type="date"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Remarks / Admin Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:ring-1 focus:ring-[#F5A623]/40"
                />
              </div>
              <button
                onClick={saveNotes}
                disabled={saving}
                className="px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </DetailSection>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/10">
            {lead.email && (
              <a
                href={`mailto:${lead.email}?subject=Re: Fleet Quote ${lead.referenceNumber}`}
                className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/20 rounded-lg transition-colors"
              >
                <Mail size={13} /> Email
              </a>
            )}
            <a
              href={`tel:${lead.phone}`}
              className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 text-xs text-gray-300 hover:text-white hover:border-white/20 rounded-lg transition-colors"
            >
              <Phone size={13} /> Call
            </a>
            <button
              onClick={onDelete}
              className="inline-flex items-center gap-2 px-3 py-2 border border-white/10 text-xs text-gray-400 hover:text-red-400 hover:border-red-400/20 rounded-lg transition-colors ml-auto"
            >
              <Trash2 size={13} /> Delete
            </button>
          </div>

          {/* Timestamps */}
          <p className="text-[10px] text-gray-600">
            Created: {new Date(lead.createdAt).toLocaleString()} |
            Updated: {new Date(lead.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Detail Helpers ──────────────────────────────────────────

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-[#F5A623] uppercase tracking-wider mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

function DetailGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">{children}</div>;
}

function DetailItem({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm text-gray-300">{value}</p>
    </div>
  );
}
