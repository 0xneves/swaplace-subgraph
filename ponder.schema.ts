import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  Status: p.createEnum(["CREATED", "ACCEPTED", "CANCELED"]),
  Database: p.createTable({
    id: p.hex(),
    blockTimestamp: p.bigint(),
    transactionHash: p.hex(),
    status: p.enum("Status"),
    swapId: p.bigint(),
    owner: p.hex(),
    allowed: p.hex(),
    expiry: p.bigint(),
    bid: p.string(),
    ask: p.string(),
  }),
}));
