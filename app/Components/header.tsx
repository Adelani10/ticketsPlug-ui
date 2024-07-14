"use client";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

const providerOptions = {};
const links: string[] = ["concerts", "sports", "arts & theater", "more"];

export default function Header() {
  const { account } = useMoralis();

  const connectWallet = async () => {
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(
        web3ModalInstance
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-br flex flex-col justify-between to-cyan-300 px-3 from-sky-500 py-4 md:h-64 h-44">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-x-3">
          <h1 className="text-2xl font-bold">ticketsPlug</h1>

          {account && (
            <input
              type="text"
              name="events"
              id=""
              placeholder="Find Events"
              className="rounded-lg hidden md:inline-block px-2 h-10 w-64"
            />
          )}

          {account && (
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
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      </div>

      <div className="px-3">
        <h3 className="font-semibold text-xl">Popular Happenings...</h3>
      </div>
    </div>
  );
}
