"use client";
import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";

// Sample broadcast data for pending approvals. Replace with real API payloads when available.
const initialPendingItems = [
  {
    id: "B101",
    teacher: "Utkarsh Singh",
    title: "Sustainable Farming in UP",
    date: "2026-05-06",
  },
  {
    id: "B102",
    teacher: "Meera Bai",
    title: "Introduction to React Native",
    date: "2026-05-05",
  },
];

export default function PendingApprovals() {
  const [items, setItems] = useState(initialPendingItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Approval and rejection handlers for administrator workflow.

  const handleApprove = async (id) => {
    try {
      // Mark the selected broadcast as approved in the backend.
      await axios.patch(`/api/admin/broadcast/${id}`, { status: "APPROVED" });
      setItems(items.filter((item) => item.id !== id));
      alert("Broadcast approved and published.");
    } catch (err) {
      console.error("Approval failed", err);
    }
  };

  const openRejectModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) return alert("Please provide a reason.");

    try {
      // Mark the broadcast as rejected and send reviewer feedback.
      await axios.patch(`/api/admin/broadcast/${selectedItem.id}`, {
        status: "REJECTED",
        reason: rejectReason,
      });

      setItems(items.filter((item) => item.id !== selectedItem.id));
      setIsModalOpen(false);
      setRejectReason("");
      alert("Broadcast rejected with feedback.");
    } catch (err) {
      console.error("Rejection failed", err);
    }
  };

  return (
    <DashboardLayout role="PRINCIPAL">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl font-bold text-scholarly-charcoal">
          Approval Queue
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] p-8 border border-black/5 flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">
                  {item.teacher}
                </p>
                <h4 className="font-serif text-xl font-bold">{item.title}</h4>
                <p className="text-gray-400 text-sm mt-1 font-medium">
                  Submitted on {item.date}
                </p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button
                  onClick={() => openRejectModal(item)}
                  className="flex-1 md:flex-none px-6 py-3 border border-red-100 text-red-500 text-[10px] font-bold tracking-widest rounded-xl hover:bg-red-50 uppercase transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex-1 md:flex-none px-8 py-3 bg-black text-white text-[10px] font-bold tracking-widest rounded-xl hover:bg-gray-800 uppercase shadow-lg shadow-black/10 transition-all"
                >
                  Approve & Publish
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="py-20 text-center bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
              <p className="font-serif italic text-gray-400 text-lg">
                No pending approvals left.
              </p>
            </div>
          )}
        </div>

        {/* Rejection reason modal for the selected pending broadcast */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-300">
              <h3 className="font-serif text-2xl font-bold mb-2">
                Rejection Reason
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Explain why {selectedItem?.title} is being rejected.
              </p>

              <textarea
                className="w-full h-32 p-4 bg-gray-50 border border-black/5 rounded-2xl text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all resize-none mb-6"
                placeholder="Type the reason here..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 text-[10px] font-bold tracking-widest uppercase text-gray-400 hover:text-black transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectSubmit}
                  className="flex-[2] py-4 bg-black text-white rounded-2xl text-[10px] font-bold tracking-widest uppercase hover:bg-gray-800 transition-all"
                >
                  Submit Rejection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
