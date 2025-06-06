import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasOne,
} from "sequelize-typescript";
import { IdempotencyKey } from "./IdempotencyKey";
import {
  BookingAttributes,
  BookingCreationAttributes,
} from "../../types/booking";

@Table({ tableName: "bookings" })
export class Booking extends Model<
  BookingAttributes,
  BookingCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  hotelId!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  bookingAmount!: number;

  @Column({
    type: DataType.ENUM("pending", "confirmed", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  })
  status!: "pending" | "confirmed" | "cancelled";

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  totalGuests!: number;

  @HasOne(() => IdempotencyKey)
  IdempotencyKey?: IdempotencyKey;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
