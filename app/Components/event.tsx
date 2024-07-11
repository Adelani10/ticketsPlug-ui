"use client";

interface propsTypes {
    toggleSeat: boolean,
    setToggleSeat: any
}

export default function Event({toggleSeat, setToggleSeat}: propsTypes) {
  return (
    <div className="border-b-2 border-zinc-400 py-2">
      <div className="flex flex-col md:flex-row md:items-center justify-between">

        <div className="flex items-center justify-between md:justify-normal md:gap-x-12">
          <div className="flex flex-col md:items-start items-center order-3 md:order-first">
            <h4 className="font-semibold text-xl">May 31</h4>
            <p className="text-sm md:tracking-normal tracking-tighter">
              6:00PM EST
            </p>
          </div>

          <div className="flex flex-col md:items-center">
            <h4 className="font-bold text-xl">UFC Miami</h4>
            <p className="text-sm md:tracking-normal tracking-tighter">
              Mami-Diade Arena-Miami, FL
            </p>
          </div>

          <h3 className="text-xl font-semibold">3.0 ETH</h3>
        </div>

        <button onClick={() => setToggleSeat(true)} className="capitalize p-2 rounded-sm text-white bg-cyan-400">
          View Seats
        </button>
      </div>
    </div>
  );
}
