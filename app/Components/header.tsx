"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import ABI from "../../constants/abi.json";
import contractAddresses from "../../constants/contractAddresses.json";

const links: string[] = ["concerts", "sports", "arts & theater", "more"];
interface contractAddressesInterface {
  [key: string]: contractAddressesItemInterface;
}

interface contractAddressesItemInterface {
  [key: string]: string[];
}

export default function Header() {
  const { address, chainId } = useAccount();

  const addy: contractAddressesInterface = contractAddresses;

  const ca = chainId ? addy[chainId.toString()]["ticketsPlug"][0] : null;

  const withdrawFunds = async () => {
    const provider = await new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = await new ethers.Contract(ca!, ABI, signer);

    const res = await contract.withdraw();
    await res.wait(1);
  };

  return (
    <div className="bg-gradient-to-br flex flex-col justify-between to-cyan-300 px-3 from-sky-500 py-4 md:h-64 h-44">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-3">
          <h1 className="text-2xl font-bold">ticketsPlug</h1>

          {address && (
            <input
              type="text"
              name="events"
              id=""
              placeholder="Find Events"
              className="rounded-lg hidden md:inline-block px-2 h-10 w-64"
            />
          )}

          {address && (
            <div className="lg:flex text-md hidden md:gap-x-5">
              {links.map((link, index) => {
                return (
                  <button key={index} className="capitalize tracking-tighter ">
                    <Link href={""}>{link}</Link>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <ConnectButton
            accountStatus="address"
            chainStatus="none"
            showBalance={false}
          />
        </div>
      </div>

      <div className="px-3 flex items-center justify-between">
        <h3 className="font-semibold text-xl">Popular Happenings...</h3>

        {address === "0xeD670599BacD6B6e50431B49288c4dCE266a26EF" && <button
          onClick={withdrawFunds}
          className="p-2 rounded-md font-bold bg-sky-950 text-white"
        >
          withdraw
        </button>}
      </div>
    </div>
  );
}
