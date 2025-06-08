//Note - issi file mei all function for both booking and idempotency table
import { Transaction } from "sequelize";
import { Booking } from "../db/models/Booking";
import { IdempotencyKey } from "../db/models/IdempotencyKey";
import { BookingCreationAttributes, BookingAttributes } from "../types/booking";
import { validate as isValidUUID } from "uuid";
import { BadRequestError } from "../utils/errors/app.error";

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

export async function getIdempotencyKeyWithLock(tx: Transaction, key: string) {
  //isValid is for raw sql queries mainly
  if (!isValidUUID(key)) {
    throw new BadRequestError("Invalid idempotency key format");
  }
  const idempotencyKey = await IdempotencyKey.findOne({
    where: { key },
    transaction: tx,
    lock: tx.LOCK.UPDATE,
  });
  return idempotencyKey;
}

export async function getBookingById(bookingId: number) {
  const booking = await Booking.findByPk(bookingId);
  return booking;
}

export async function confirmBooking(tx: Transaction, bookingId: number) {
  await Booking.update(
    { status: "confirmed" },
    { where: { id: bookingId }, transaction: tx }
  );

  const updatedBooking = await Booking.findByPk(bookingId, { transaction: tx });

  return updatedBooking;
}

export async function cancelBooking(bookingId: number) {
  await Booking.update({ status: "cancelled" }, { where: { id: bookingId } });

  const updatedBooking = await Booking.findByPk(bookingId);
  return updatedBooking;
}

export async function finalizeIdempotencyKey(tx: Transaction, key: string) {
  await IdempotencyKey.update(
    { finalized: true },
    { where: { key }, transaction: tx }
  );

  const updatedKey = await IdempotencyKey.findByPk(key, { transaction: tx });

  return updatedKey;
}
