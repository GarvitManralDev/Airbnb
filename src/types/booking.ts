export interface BookingAttributes {
  id: number;
  userId: number;
  hotelId: number;
  bookingAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  totalGuests: number;
  idempotencyKeyId?: number; // optional foreign key
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingCreationAttributes
  extends Partial<
    Pick<
      BookingAttributes,
      | "id"
      | "status"
      | "totalGuests"
      | "idempotencyKeyId"
      | "createdAt"
      | "updatedAt"
    >
  > {
  userId: number;
  hotelId: number;
  bookingAmount: number;
}
