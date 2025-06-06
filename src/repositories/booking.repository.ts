import { Booking } from "../db/models/Booking";
import { IdempotencyKey } from "../db/models/IdempotencyKey";
import { BookingCreationAttributes, BookingAttributes } from "../types/booking";

//Note - issi file mei all function for both booking and idempotency table

export async function createBooking(
  bookingInput: BookingCreationAttributes
): Promise<BookingAttributes> {
  const booking = await Booking.create(bookingInput);
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId?: number) {
  const idempotencyKey = await IdempotencyKey.create({
    key,
    bookingId,
  });

  return idempotencyKey;
}

export async function getIdempotencyKey(key: string) {
  const idempotencyKey = await IdempotencyKey.findOne({
    where: { key },
  });
  return idempotencyKey;
}

export async function getBookingById(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);
  return booking;
}

// export async function changeBookingStatus(
//   bookingId: number,
//   status: "pending" | "confirmed" | "cancelled"
// ) {
//   await Booking.update({ status }, { where: { id: bookingId } });

//   const updatedBooking = await Booking.findByPk(bookingId);
//   return updatedBooking;
// }

export async function confirmBooking(bookingId: number) {
  await Booking.update({ status: "confirmed" }, { where: { id: bookingId } });

  const updatedBooking = await Booking.findByPk(bookingId);
  return updatedBooking;
}

export async function cancelBooking(bookingId: number) {
  await Booking.update({ status: "cancelled" }, { where: { id: bookingId } });

  const updatedBooking = await Booking.findByPk(bookingId);
  return updatedBooking;
}

export async function finalizeIdempotencyKey(key: string) {
  await IdempotencyKey.update({ finalized: true }, { where: { key: key } });
  const updatedKey = await IdempotencyKey.findByPk(key);
  return updatedKey;
}
