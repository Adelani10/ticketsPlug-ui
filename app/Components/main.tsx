"use client";

import { ethers } from "ethers";
import abi from "../../constants/abi.json";
import contractAddresses from "../../constants/contractAddresses.json";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import Event from "./event";
import SeatPage from "./seatPage";

interface contractAddressesInterface {
  [key: string]: contractAddressesItemInterface;
}

interface contractAddressesItemInterface {
  [key: string]: string[];
}

export default function Main() {
  const { chainId, isWeb3Enabled, account } = useMoralis();
  const [events, setEvents] = useState<any[] | null>(null);
  const [ticketsPlug, setTicketsPlug] = useState<any>();
  const [toggleSeat, setToggleSeat] = useState<boolean>(false);
  const address: contractAddressesInterface = contractAddresses;
  const ABI: any = abi;

  const ca = chainId
    ? address[parseInt(chainId).toString()]["ticketsPlug"][0]
    : null;

  useEffect(() => {
    if (isWeb3Enabled) {
      loadBlockChainData();
    }
  }, [isWeb3Enabled]);

  const loadBlockChainData = async () => {
    const eventsArr: any[] = [];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(ca!, ABI, provider);
    setTicketsPlug(contract);

    if (ticketsPlug) {
      const totalEvents = await ticketsPlug.totalEvents();

      for (let i = 1; i <= totalEvents; i++) {
        const event = await ticketsPlug.getEvent(i);
        eventsArr.push(event);
      }

      setEvents(eventsArr);
    } else {
      console.log("ticketsPlug not set..");
    }
  };

  console.log(events);

  return (
    <div className="h-full">
      <div className="md:w-[75%] w-full mx-auto h-full p-3 md:space-y-4 space-y-3">
        <Event toggleSeat={toggleSeat} setToggleSeat={setToggleSeat} />
      </div>
      
      {toggleSeat && (
        <div>
          <div className="bg-black opacity-75 h-full w-full z-0 absolute top-0 left-0 right-0 bottom-0"></div>
          <SeatPage setToggleSeat={setToggleSeat} />
        </div>
      )}
    </div>
  );
}
