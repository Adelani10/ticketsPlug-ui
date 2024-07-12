"use client";

import { ethers } from "ethers";

interface propsTypes {
  setToggleSeat: any;
  event: any;
  setCurrEvent: any;
}

export default function Event({
  setToggleSeat,
  event,
  setCurrEvent,
}: propsTypes) {
  const handleClick = () => {
    setToggleSeat(true);
    setCurrEvent(event);
  };

  return (
    <div className="border-b-2 border-zinc-400 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex items-center justify-between md:justify-normal md:gap-x-12">
          <div className="flex flex-col md:items-start items-center order-3 md:order-first">
            <h4 className="font-semibold text-xl">{event.date}</h4>
            <p className="text-sm md:tracking-normal tracking-tighter">
              {event.time}
            </p>
          </div>

          <div className="flex flex-col">
            <h4 className="font-bold text-xl">{event.name}</h4>
            <p className="text-sm md:tracking-normal tracking-tighter">
              {event.location}
            </p>
          </div>

          <h3 className="text-xl font-semibold">
            {ethers.utils.formatUnits(event.cost.toString(), "ether")} ETH
          </h3>
        </div>

        <button
          disabled={event.tickets.toNumber() === 0}
          onClick={handleClick}
          className={`${
            event.tickets <= 0 ? "bg-red-600" : "bg-cyan-400"
          } capitalize p-2 md:w-32 w-full rounded-sm text-white`}
        >
          {event.tickets <= 0 ? "Sold Out" : "View Seats"}
        </button>
      </div>
    </div>
  );
}
