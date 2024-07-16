"use client";

import { ethers } from "ethers";
import abi from "../../constants/abi.json";
import contractAddresses from "../../constants/contractAddresses.json";
import { useEffect, useState } from "react";
import Event from "./event";
import SeatPage from "./seatPage";
import { useAccount } from "wagmi";

interface contractAddressesInterface {
  [key: string]: contractAddressesItemInterface;
}

interface contractAddressesItemInterface {
  [key: string]: string[];
}

export default function Main() {
  const { chainId, isConnected, address } = useAccount();
  const [events, setEvents] = useState<any[] | null>(null);
  const [ticketsPlug, setTicketsPlug] = useState<any>(null);
  const [toggleSeat, setToggleSeat] = useState<boolean>(false);
  const [currEvent, setCurrEvent] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const addy: contractAddressesInterface = contractAddresses;
  const ABI: any = abi;

  const ca = chainId ? addy[chainId.toString()]["ticketsPlug"][0] : null;

  useEffect(() => {
    if (isConnected) {
      loadBlockChainData();
    }
  }, [isConnected]);


  const loadBlockChainData = async () => {
    const eventsArr: any[] = [];
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const realSigner = await provider.getSigner();

    const contract = await new ethers.Contract(ca!, ABI, provider);
    setSigner(realSigner);

    try {
      const totalEvents = await contract.totalEvents();

      for (let i = 1; i <= totalEvents; i++) {
        const event = await contract.getEvent(i);
        eventsArr.push(event);
      }

      setTicketsPlug(contract);
      setEvents(eventsArr);
    } catch(error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  return (
    <div className="h-full">
      {address ? (
        <div className="h-full">
          <div className="md:w-[75%] w-full mx-auto h-full p-3 md:space-y-4 space-y-3">
            {events?.map((event) => {
              return (
                <Event
                  key={event.id}
                  setToggleSeat={setToggleSeat}
                  event={event}
                  setCurrEvent={setCurrEvent}
                />
              );
            })}
          </div>

          {toggleSeat && (
            <div>
              <div className="bg-black opacity-75 h-full w-full z-0 absolute top-0 left-0 right-0 bottom-0"></div>
              <SeatPage
                setToggleSeat={setToggleSeat}
                currEvent={currEvent}
                ticketsPlug={ticketsPlug}
                signer={signer}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex text-sky-700 justify-center items-center h-screen">
          <svg
            className="animate-spin h-5 w-5 mr-3 border-sky-400 border-b rounded-full ..."
            viewBox="0 0 24 24"
          >
            ...
          </svg>
          Connect Wallet...
        </div>
      )}
    </div>
  );
}
