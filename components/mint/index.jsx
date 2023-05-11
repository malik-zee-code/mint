import Image from "next/image";
import React from "react";

export default function index() {
  return (
    <>
      <div className="min-h-[80vh] xl:container w- mx-auto grid place-items-center">
        <div className="w-full max-w-[1600px] flex md:justify-around flex-col md:flex-row items-center justify-center">
          <div className="w-[90%] sm:w-auto">
            <Image
              src={
                "https://cdn.discordapp.com/attachments/1085293900706627595/1085580526380912670/Rectangle_9.png"
              }
              width={500}
              height={300}
              className="p"
              alt=""
            />
          </div>
          <div className="w-[90%] sm:w-[350px]  text-base text-white rounded-2xl bg-[#45658e]/30 my-8 md:my-0">
            <div className="mt-3 ml-5 ">
              <div className="text-[22px] font-bold">NFTLAB</div>
              <div className="text-[14px] mt-1 font-semibold">
                A collection of 1,111 potions Free mint
              </div>
            </div>
            <div className="mt-4 w-[86%] mb-4 mx-auto rounded-2xl bg-white/10 overflow-x-hidden min-h-[300px]">
              <div className="pt-4 w-full">
                <div className="flex font-semibold text-[14px] w-[230px] mx-auto justify-between items-center">
                  <div>Supply</div>
                  <div>0/1111</div>
                </div>
                <div className="my-3 w-[230px] overflow-hidden mx-auto h-2 rounded-full bg-black/40">
                  <div
                    className="bg-white rounded-full h-2"
                    style={{ width: 0 }}
                  ></div>
                </div>
                <div className="w-[330px] bg-white/20 h-[1px] my-5"></div>
                <div className="my-3 text-[13px] w-[230px] mx-auto flex justify-between items-center">
                  <div>
                    <div className="font-semibold"></div>
                    <div className="text-[#1EDCD1]">Launches soon</div>
                    {/* <div className="text-[#21F51D]">Live</div> */}
                  </div>
                  <div>
                    <div className="font-semibold">Free Mint</div>
                    {/* <div>01H 11min 00s</div> */}
                  </div>
                </div>
                <div className="w-[330px] bg-white/20 h-[1px] my-5"></div>
                <div className="my-3 text-[13px] w-[230px] mx-auto flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Phase P-W</div>
                    <div className="text-[#1EDCD1]">Launches soon</div>
                    {/* <div className="text-[#F51D1D]">END</div> */}
                  </div>
                  <div>
                    <div className="font-semibold">Free Mint</div>
                    {/* <div>01H 11min 00s</div> */}
                  </div>
                </div>
                <div className="w-[330px] bg-white/20 h-[1px] my-5"></div>
                <div className="my-3 h-[38px] text-[13px] w-[230px] mx-auto flex justify-between items-center">
                  <div>
                    <div className="font-semibold"></div>
                    <div className="text-[#1EDCD1]"></div>
                  </div>
                  <div>
                    <div className="font-semibold"></div>
                    {/* <div>01H 11min 00s</div> */}
                  </div>
                </div>
              </div>
              <div className="my-6 flex justify-center">
                <div className="px-[70px] text-xl py-1 font-bold montnormal border border-white rounded-full cursor-pointer active:scale-105 transition-all">
                  MINT
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[90%] md:w-[84%] mx-auto bg-[#45658e]/30 rounded-3xl text-white md:text-xl montnormal font-semibold py-7 max-w-[1190px] mt-5 md:mt-10 px-5 md:px-10">
          <p>
            NFT Lab is dedicated towards providing value for our holders as well
            as the NFT ecosystem as a whole through every product that is built
            out. We’re firm believers in building out products, delivering, and
            providing value firstly. Our goal is to make a direct change in the
            space by providing our products, while also making an indirect
            change by showing people that projects can and should provide and
            prove themselves before being rewarded. By minting your free, NFT
            Lab potion, you can become a member of the lab forever.
          </p>
          <p className="mt-4">
            Potions are your ticket into the NFT Lab ecosystem for long-term. In
            order to mint a gold potion, you must possess a P-A Gem. Gold potion
            holders will receive free access to all of our tools/products,
            substantial rewards via our raffle rewards system, a free mint for
            our Gen1 collection, WL allocation for every project that launches
            with us via our launchpad, and more. Gold potion holders will
            automatically mint a legendary NFT from our Gen1 collection, which
            will include their own portion of revenue share, larger than others.
            P-A Gem holders have a chance at minting either a mystic or 1/1
            potion as well. Mystic and 1/1 potion holders will receive the same
            benefits a gold potion holders, with the difference being that you
            will automatically mint a mystic or 1/1 potion for our Gen1
            collection. Gold, mystic, and 1/1 potions are your all-access,
            lifetime pass to the lab.
          </p>
          <p className="mt-4">
            In order to mint either a purple or green potion, you must posses a
            P-W gem. Purple and green potion holders will receive highly
            discounted access to all of our tools/products, benefits via our
            raffle rewards system, a highly discounted mint for our Gen1
            collection, partial WL allocation for every project that launches
            with us via our launchpad, and more. Purple and green potion holders
            will have a better chance at minting a higher rarity NFT from our
            Gen1 collection. Each rarity for Gen1 will include its own portion
            of revenue share. P-W gem holders will also have a chance at minting
            either a mystic or 1/1 potion.
          </p>
        </div>
      </div>
    </>
  );
}
