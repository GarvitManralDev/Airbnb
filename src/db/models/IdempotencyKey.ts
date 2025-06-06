import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Booking } from "./Booking";
import {
  IdempotencyKeyAttributes,
  IdempotencyKeyCreationAttributes,
} from "../../types/idempotencyKey";

@Table({ tableName: "idempotency_keys" })
export class IdempotencyKey extends Model<
  IdempotencyKeyAttributes,
  IdempotencyKeyCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  key!: string;

  @ForeignKey(() => Booking)
  @Column({ type: DataType.INTEGER, allowNull: true })
  bookingId?: number;

  @BelongsTo(() => Booking)
  booking?: Booking;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  finalized!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
