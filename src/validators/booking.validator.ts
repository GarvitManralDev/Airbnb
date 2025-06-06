import { z } from "zod";

export const createBoookingSchema = z.object({
  userId: z.number({ message: "User Id must be present" }),
  hotelId: z.number({ message: "Hotel Id must be present" }),
  totalGuests: z
    .number({ message: "Total guests must be present" })
    .min(1, { message: "Total guests should be atleast 1" }),
  bookingAmount: z
    .number({ message: "Booking amount must be present" })
    .min(1, { message: "Booking amount should be atleast 1" }),
});
