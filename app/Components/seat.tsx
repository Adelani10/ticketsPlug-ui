"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Seat({ seat, ticketsPlug, signer, currEvent }: any) {
  const [takenSeats, setTakenSeats] = useState<any[]>([]);

  const handleClick = async () => {
    await ticketsPlug.connect(signer).buyTicket(currEvent.id, seat, {
      value: currEvent.cost,
    });
  };

  const getSeatArray = async () => {
    const takenSeatsFromCall = await ticketsPlug.getTakenSeats(currEvent.id);
    setTakenSeats(takenSeatsFromCall);
  };

  useEffect(() => {
    if (currEvent) {
      getSeatArray();
    }
  }, [currEvent]);

  return (
    <button
      disabled={takenSeats.some((num) => num.eq(seat))}
      onClick={handleClick}
      className="h-8 w-8 hover:bg-cyan-300 disabled:bg-cyan-900 bg-cyan-600 text-white p-2 rounded-full flex items-center justify-center"
    >
      <h1>{seat}</h1>
    </button>
  );
}
