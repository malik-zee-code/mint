import React from "react";
import powered from "../../public/images/POWERED BY_ NFT LAB.png";
import { SiDiscord } from "react-icons/si";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

export default function footer() {
  return (
    <div>
      <div className="relative w-full z-50">
        <div className=" mx-auto px-[3.8%] py-6 flex justify-between items-center">
          <div className="">
            <Image src={powered} width={200} height={90} alt="" />
          </div>
          <p className="hidden sm:blocktext-sm text-gray-50/60">Copyright © 2023. All rights reserved.</p>
          <div className="grid grid-cols-2 gap-4 text-2xl text-white">
            <Link href={"https://twitter.com/NFTIab"} target={"_blank"} className="hover:scale-110 transition-all">
              <BsTwitter />
            </Link>
            <Link href={"https://discord.gg/F2Cm9AD78h"} target={"_blank"} className="hover:scale-110 transition-all">
              <SiDiscord />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
