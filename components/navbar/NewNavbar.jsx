import Image from "next/image";
import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Nav = () => {
  return (
    <div className=" w-full absolute top-0 left-0 md:px-[3.8%] mx-auto z-[100]">
      <div className="flex items-center justify-between py-4 md:px-10 px-1">
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          {/* New */}
          <div
            // onClick={() => router.push("/")}
            className="w-[170px] sm:w-auto cursor-pointer"
          >
            <Image
              src={"https://media.discordapp.net/attachments/1010271482879934625/1048059704443687012/LOGO.png"}
              width={250}
              height={150}
              alt=""
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center ">
            <div className=" max-w-[114px]  overflow-hidden mx-1">
              <WalletMultiButton />
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
      </div>
    </div>
  );
};

export default Nav;
