export interface IdempotencyKeyAttributes {
  id: number;
  key: string;
  bookingId?: number | null;
  finalized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IdempotencyKeyCreationAttributes
  extends Partial<
    Pick<
      IdempotencyKeyAttributes,
      "id" | "bookingId" | "finalized" | "createdAt" | "updatedAt"
    >
  > {
  key: string;
}
