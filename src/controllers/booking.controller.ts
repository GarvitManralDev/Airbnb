import { Request, Response } from "express";
import {
  createBookingService,
  confirmBookingService,
} from "../service/booking.service";

export const createBookingHandler = async (req: Request, res: Response) => {
  const booking = await createBookingService(req.body);

  res.status(201).json({
    bookingId: booking.bookingId,
    IdempotencyKey: booking.idempotencyKey,
  });
};

export const confirmBookingHandler = async (req: Request, res: Response) => {
  const booking = await confirmBookingService(req.params.idempotencyKey);

  res.status(201).json({
    bookingId: booking?.id,
    status: booking?.status,
  });
};
