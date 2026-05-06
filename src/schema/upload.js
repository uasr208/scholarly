import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"]; // Requirements: JPG, PNG, GIF

export const uploadSchema = z
  .object({
    title: z.string().min(1, "Title is required"), // Required field
    subject: z.string().min(1, "Subject is required"), // Required field
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"), // Required field
    endTime: z.string().min(1, "End time is required"), // Required field
    rotationDuration: z.coerce.number().optional(),
    file: z
      .any()
      .refine((files) => files?.length > 0, "File upload is required") // Required field
      .transform((list) => list[0])
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max size is 10MB`) // Size validation
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only JPG, PNG, or GIF are allowed", // Type validation
      ),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time", // Date validation
    path: ["endTime"],
  });
