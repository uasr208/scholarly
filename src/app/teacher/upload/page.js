"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { uploadSchema } from "@/schema/upload";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function UploadContent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(uploadSchema),
  });

  const onFinalize = async (data) => {
    try {
      // 1. Create a FormData instance
      const formData = new FormData();

      // 2. Append all text fields
      formData.append("title", data.title);
      formData.append("subject", data.subject);
      formData.append("description", data.description || "");
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      formData.append("rotationDuration", data.rotationDuration || 0);

      // 3. Append the file (this is why we used .transform(list => list[0]) in Zod)
      formData.append("file", data.file);

      // 4. Send with Axios
      const response = await axios.post("/api/content/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", response.data);
      alert("Broadcast Finalized Successfully!");
    } catch (err) {
      console.error("Axios Error:", err);
      alert(
        err.response?.data?.message || "Something went wrong during upload.",
      );
    }
  };

  return (
    <DashboardLayout role="TEACHER">
      <form
        onSubmit={handleSubmit(onFinalize)}
        className="max-w-5xl mx-auto space-y-6"
      >
        <h1 className="font-serif text-3xl font-bold">Publish Content</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section 1: Basic Info */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/5 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Title *
              </label>
              <input
                {...register("title")}
                className={`w-full p-3 rounded-xl border mt-1 ${errors.title ? "border-red-500" : "border-gray-100"}`}
              />
              {errors.title && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Subject *
              </label>
              <select
                {...register("subject")}
                className="w-full p-3 rounded-xl border border-gray-100 mt-1"
              >
                <option value="">Select Subject</option>
                <option value="math">Mathematics</option>
                <option value="science">Applied Sciences</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Description
              </label>
              <textarea
                {...register("description")}
                rows="3"
                className="w-full p-3 rounded-xl border border-gray-100 mt-1"
              />
            </div>
          </div>

          {/* Section 2: Timing & File */}
          <div className="bg-white p-8 rounded-[32px] shadow-sm border border-black/5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Start Time *
                </label>
                <input
                  type="datetime-local"
                  {...register("startTime")}
                  className="w-full p-3 rounded-xl border border-gray-100 mt-1"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  End Time *
                </label>
                <input
                  type="datetime-local"
                  {...register("endTime")}
                  className="w-full p-3 rounded-xl border border-gray-100 mt-1"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                File Upload (JPG, PNG, GIF - Max 10MB) *
              </label>
              <input
                type="file"
                {...register("file")}
                className="w-full p-3 border-2 border-dashed rounded-xl mt-1 text-xs"
              />
              {errors.file && (
                <p className="text-red-500 text-[10px] mt-1">
                  {errors.file.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-12 py-4 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Uploading..." : "Finalize & Broadcast"}
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}
