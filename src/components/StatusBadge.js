// Renders a compact badge for approval status values.
export default function StatusBadge({ status }) {
  const styles = {
    APPROVED: "bg-green-50 text-green-600 border-green-100",
    PENDING: "bg-gray-50 text-gray-400 border-gray-100",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-black/5 uppercase ${styles[status] || styles.PENDING}`}
    >
      {status}
    </span>
  );
}
