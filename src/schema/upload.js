import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // Max file upload size for images
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]; // Allowed image MIME types

export const uploadSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    rotationDuration: z.coerce.number().optional(),
    file: z
      .any()
      .refine((files) => files?.length > 0, "File upload is required")
      .transform((list) => list[0])
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max size is 10MB`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only JPG, PNG, or GIF are allowed",
      ),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time", // Date validation
    path: ["endTime"],
  });
