import * as z from "zod";

export const rocketSchema = z.object({
  name: z.string().nonempty({ message: "Rocket name is required" }),
  first_flight: z
    .date()
    .nullable()
    .refine((date) => date !== null, {
      message: "First flight date is required",
    }),
  height: z.number().positive({ message: "Height must be a positive number" }),
});
