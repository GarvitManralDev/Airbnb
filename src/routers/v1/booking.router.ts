import express from "express";
import { validateRequestBody } from "../../validators";
import { createBoookingSchema } from "../../validators/booking.validator";
import {
  confirmBookingHandler,
  createBookingHandler,
} from "../../controllers/booking.controller";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  validateRequestBody(createBoookingSchema),
  createBookingHandler
);

bookingRouter.post("/confirm/:idempotencyKey", confirmBookingHandler);
export default bookingRouter;
