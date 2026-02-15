"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search, Plus } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: string;
  title: string;
  createHref?: string;
  createLabel?: string;
  editHref?: (item: T) => string;
  onDelete?: (item: T) => void;
  getId: (item: T) => string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchKey,
  title,
  createHref,
  createLabel = "Add New",
  editHref,
  onDelete,
  getId,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");

  const filtered = searchKey
    ? data.filter((item) => {
        const value = item[searchKey];
        return String(value).toLowerCase().includes(search.toLowerCase());
      })
    : data;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white font-[family-name:var(--font-montserrat)]">
          {title}
        </h2>
        <div className="flex items-center gap-3">
          {searchKey && (
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/50 w-64"
              />
            </div>
          )}
          {createHref && (
            <Link
              href={createHref}
              className="flex items-center gap-2 px-4 py-2 bg-[#F5A623] hover:bg-[#D4910A] text-black text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={16} />
              {createLabel}
            </Link>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0f1729] border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {(editHref || onDelete) && (
                <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-8 text-center text-gray-500 text-sm"
                >
                  No items found
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={getId(item)}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-gray-300"
                    >
                      {col.render
                        ? col.render(item)
                        : String(item[col.key] ?? "")}
                    </td>
                  ))}
                  {(editHref || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editHref && (
                          <Link
                            href={editHref(item)}
                            className="p-1.5 text-gray-400 hover:text-[#F5A623] transition-colors"
                          >
                            <Pencil size={16} />
                          </Link>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
