"use client";
import DashboardLayout from "@/layouts/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";

const allData = [
  {
    id: 1,
    title: "Quantum Physics",
    teacher: "Utkarsh Singh",
    status: "APPROVED",
    subject: "Science",
  },
  {
    id: 2,
    title: "Modernist Arts",
    teacher: "Sarah Jay",
    status: "REJECTED",
    subject: "Arts",
  },
  {
    id: 3,
    title: "Macroeconomics",
    teacher: "Anurag Singh",
    status: "PENDING",
    subject: "Commerce",
  },
];

export default function AllContentAudit() {
  return (
    <DashboardLayout role="PRINCIPAL">
      <div className="space-y-8">
        <header>
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            Institutional Audit
          </p>
          <h1 className="font-serif text-4xl font-bold text-scholarly-charcoal">
            All Published Content
          </h1>
        </header>

        <div className="bg-white rounded-[40px] p-8 border border-black/5">
          <div className="hidden lg:grid grid-cols-12 px-6 mb-4 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
            <div className="col-span-4">Content Title</div>
            <div className="col-span-3">Faculty / Teacher</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="space-y-3">
            {allData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 lg:grid-cols-12 items-center p-6 border border-gray-50 rounded-[24px] hover:bg-gray-50/50 transition-all"
              >
                <div className="lg:col-span-4 font-serif font-bold text-lg">
                  {item.title}
                </div>
                <div className="lg:col-span-3 text-sm font-medium text-gray-400">
                  {item.teacher}
                </div>
                <div className="lg:col-span-3">
                  <StatusBadge status={item.status} />
                </div>
                <div className="lg:col-span-2 text-right">
                  <button className="text-[10px] font-bold underline tracking-widest uppercase text-gray-400 hover:text-black">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
