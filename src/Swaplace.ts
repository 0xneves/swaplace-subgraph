import { ponder } from "@/generated";

ponder.on("Swaplace:SwapCreated", async ({ event, context }) => {
  const { client } = context;
  const { Swaplace } = context.contracts;
  const { Database } = context.db;
  const { swapId, owner } = event.args;

  const contractResponse = await client.readContract({
    abi: Swaplace.abi,
    address: Swaplace.address,
    functionName: "getSwap",
    args: [event.args.swapId],
  });

  let config = contractResponse.config;

  const expiry: bigint =
    BigInt(config) & ((BigInt(1) << BigInt(96)) - BigInt(1));
  const allowed: string = (BigInt(config) >> BigInt(96)).toString(16);

  interface Asset {
    addr: string;
    amountOrId: string;
  }

  let biding = contractResponse.biding.map((token) => {
    let asset: Asset = {
      addr: token.addr,
      amountOrId: token.amountOrId.toString(),
    };
    return asset;
  });

  let asking = contractResponse.asking.map((token) => {
    let asset: Asset = {
      addr: token.addr,
      amountOrId: token.amountOrId.toString(),
    };
    return asset;
  });

  let strinfiedBid = JSON.stringify(biding);
  let strinfiedAsk = JSON.stringify(asking);

  await Database.create({
    id: `0x${swapId}`,
    data: {
      blockTimestamp: event.block.timestamp,
      transactionHash: event.transaction.hash,
      status: "CREATED",
      swapId: swapId,
      owner: owner,
      allowed: `0x${allowed}`,
      expiry: expiry,
      bid: strinfiedBid,
      ask: strinfiedAsk,
    },
  });
});

ponder.on("Swaplace:SwapCanceled", async ({ event, context }) => {
  const { Database } = context.db;
  const { swapId } = event.args;

  try {
    await Database.update({
      id: `0x${swapId}`,
      data: {
        status: "CANCELED",
      },
    });
  } catch (error) {
    console.log("Error updating database. Creating new entry instead.");
    const { client } = context;
    const { Swaplace } = context.contracts;
    const { swapId, owner } = event.args;

    const contractResponse = await client.readContract({
      abi: Swaplace.abi,
      address: Swaplace.address,
      functionName: "getSwap",
      args: [swapId],
    });

    let config = contractResponse.config;

    const expiry: bigint =
      BigInt(config) & ((BigInt(1) << BigInt(96)) - BigInt(1));
    const allowed: string = (BigInt(config) >> BigInt(96)).toString(16);

    interface Asset {
      addr: string;
      amountOrId: string;
    }

    let biding = contractResponse.biding.map((token) => {
      let asset: Asset = {
        addr: token.addr,
        amountOrId: token.amountOrId.toString(),
      };
      return asset;
    });

    let asking = contractResponse.asking.map((token) => {
      let asset: Asset = {
        addr: token.addr,
        amountOrId: token.amountOrId.toString(),
      };
      return asset;
    });

    let strinfiedBid = JSON.stringify(biding);
    let strinfiedAsk = JSON.stringify(asking);

    await Database.create({
      id: `0x${swapId}`,
      data: {
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        status: "CANCELED",
        swapId: swapId,
        owner: owner,
        allowed: `0x${allowed}`,
        expiry: expiry,
        bid: strinfiedBid,
        ask: strinfiedAsk,
      },
    });
  } finally {
    console.log("Database updated successfully.");
  }
});

ponder.on("Swaplace:SwapAccepted", async ({ event, context }) => {
  const { Database } = context.db;
  const { swapId } = event.args;

  try {
    await Database.update({
      id: `0x${swapId}`,
      data: {
        status: "ACCEPTED",
      },
    });
  } catch (error) {
    console.log("Error updating database. Creating new entry instead.");
    const { client } = context;
    const { Swaplace } = context.contracts;
    const { swapId, owner } = event.args;

    const contractResponse = await client.readContract({
      abi: Swaplace.abi,
      address: Swaplace.address,
      functionName: "getSwap",
      args: [swapId],
    });

    let config = contractResponse.config;

    const expiry: bigint =
      BigInt(config) & ((BigInt(1) << BigInt(96)) - BigInt(1));
    const allowed: string = (BigInt(config) >> BigInt(96)).toString(16);

    interface Asset {
      addr: string;
      amountOrId: string;
    }

    let biding = contractResponse.biding.map((token) => {
      let asset: Asset = {
        addr: token.addr,
        amountOrId: token.amountOrId.toString(),
      };
      return asset;
    });

    let asking = contractResponse.asking.map((token) => {
      let asset: Asset = {
        addr: token.addr,
        amountOrId: token.amountOrId.toString(),
      };
      return asset;
    });

    let strinfiedBid = JSON.stringify(biding);
    let strinfiedAsk = JSON.stringify(asking);

    await Database.create({
      id: `0x${swapId}`,
      data: {
        blockTimestamp: event.block.timestamp,
        transactionHash: event.transaction.hash,
        status: "ACCEPTED",
        swapId: swapId,
        owner: owner,
        allowed: `0x${allowed}`,
        expiry: expiry,
        bid: strinfiedBid,
        ask: strinfiedAsk,
      },
    });
  } finally {
    console.log("Database updated successfully.");
  }
});
