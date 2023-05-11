import Head from "next/head";
import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  CandyMachine,
  Metaplex,
  Nft,
  NftWithToken,
  PublicKey,
  Sft,
  SftWithToken,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { Keypair, Transaction, AccountMeta } from "@solana/web3.js";
import Mintlogo from "../../public/images/Solgwais_Box.gif";
import { ToastContainer, toast } from "react-toastify";
import background from "../../public/images/background.png";
import { getRemainingAccountsByGuardType, mintV2Instruction, get_token_account } from "@/utils/mintV2";
import { fromTxError } from "@/utils/errors";
import { CountdownTimer } from "../../components/Counter/Counter";

export default function Home() {
  const wallet = useWallet();
  const { publicKey } = wallet;
  const { connection } = useConnection();
  const [metaplex, setMetaplex] = useState<Metaplex | null>(null);
  const [candyMachine, setCandyMachine] = useState<CandyMachine | null>(null);
  const [collection, setCollection] = useState<Sft | SftWithToken | Nft | NftWithToken | null>(null);
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [OG_time, setOGTime] = useState(1680969600000);
  const [WL_time, setWLTime] = useState(1680976800000);

  useEffect(() => {
    (async () => {
      if (wallet && connection) {
        if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
          throw new Error("Please provide a candy machine id");
        }
        const metaplex = new Metaplex(connection).use(walletAdapterIdentity(wallet));
        setMetaplex(metaplex);

        const candyMachine = await metaplex.candyMachines().findByAddress({
          address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID),
        });

        setCandyMachine(candyMachine);

        const collection = await metaplex.nfts().findByMint({ mintAddress: candyMachine.collectionMintAddress });

        setCollection(collection);
        console.log(collection);

        console.log(collection);
      }
    })();

    const intervalId = setInterval(async () => {
      const metaplex = new Metaplex(connection).use(walletAdapterIdentity(wallet));
      const candyMachine = await metaplex.candyMachines().findByAddress({
        address: new PublicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!),
      });
      setCandyMachine(candyMachine);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [wallet, connection]);

  /** Mints NFTs through a Candy Machine using Candy Guards */
  const handleMintV2 = async () => {
    if (!metaplex || !candyMachine || !publicKey || !candyMachine.candyGuard) return null;

    if (!candyMachine.candyGuard)
      throw new Error("This app only works with Candy Guards. Please setup your Guards through Sugar.");
    try {
      notify_laoding("Minting Pending...");
      let remainingAccounts: AccountMeta[] = [];
      let token_mint: any;
      let label: string;

      var OG_date = new Date("2023-04-08 16:00:00 +0000"); // some mock date
      var Wl_date = new Date("2023-04-08 18:00:00 +0000"); // some mock date
      var Wl_milliseconds = 1680976800000;
      var OG_milliseconds = 1680969600000;
      console.log(Wl_milliseconds);
      console.log(OG_milliseconds);

      const now = Date.now();

      const { guards } = candyMachine.candyGuard;
      console.log(guards);
      /** Filter only enabled Guards */
      const enabledGuards = guards && Object.keys(guards).filter((guardKey) => guards[guardKey]);

      console.log(enabledGuards);
      if (enabledGuards.length) {
        /** Map all Guards and grab their remaining accounts */
        enabledGuards.forEach((guard) => {
          console.log(guard);
          const candyGuard = candyMachine.candyGuard?.guards[guard];

          console.log("candyGuard");
          console.log(candyGuard);

          if (!candyGuard) return null;
          const remaining = getRemainingAccountsByGuardType(candyGuard, guard);

          console.log(remaining);

          /** Push to the accounts array */
          if (remaining.length) {
            remainingAccounts.push(...remaining);
          }
        });
      }

      console.log(remainingAccounts);

      if (now >= Wl_milliseconds) {
        token_mint = new PublicKey("PAqX35g6Z1SDdGbJWqPj6kCJ846GKV4egiw56eTJeCk");
        label = "PW";
        console.log(label);
        const token_account = await get_token_account(publicKey, token_mint, connection);
        const balance = await connection.getBalance(token_account!);

        if (balance == 0) {
          notify_delete();
          return notify_warning("You don't have enough token!");
        } else {
          const account_info = await connection.getAccountInfo(token_account!);
          const offsetInBytes = 2 * 32;
          let amount = 0;
          for (let i = 0; i < 8; i++) {
            amount += account_info!.data[offsetInBytes + i] * 2 ** (i * 8);
          }
          if (amount == 0) {
            notify_delete();
            return notify_warning("You don't have enough token!");
          } else {
            remainingAccounts.push({
              pubkey: token_account!,
              isSigner: false,
              isWritable: true,
            });

            remainingAccounts.push({
              pubkey: token_mint,
              isSigner: false,
              isWritable: true,
            });
          }
        }
      } else if (now >= OG_milliseconds) {
        token_mint = new PublicKey("PAqX35g6Z1SDdGbJWqPj6kCJ846GKV4egiw56eTJeCk");
        label = "PA";
        console.log(label);
        const token_account = await get_token_account(publicKey, token_mint, connection);
        const balance = await connection.getBalance(token_account!);

        if (balance == 0) {
          notify_delete();
          return notify_warning("You don't have enough token!");
        } else {
          const account_info = await connection.getAccountInfo(token_account!);
          const offsetInBytes = 2 * 32;
          let amount = 0;
          for (let i = 0; i < 8; i++) {
            amount += account_info!.data[offsetInBytes + i] * 2 ** (i * 8);
          }
          if (amount == 0) {
            notify_delete();
            return notify_warning("You don't have enough token!");
          } else {
            remainingAccounts.push({
              pubkey: token_account!,
              isSigner: false,
              isWritable: true,
            });

            remainingAccounts.push({
              pubkey: token_mint,
              isSigner: false,
              isWritable: true,
            });
          }
        }
      } else {
        token_mint = new PublicKey("NLGqbH6penwo5FaGQ8DRGs8AYri3dxQwDWbTgQuhrAf");
        label = "PA";
        console.log(label);
        const token_account = await get_token_account(publicKey, token_mint, connection);
        const balance = await connection.getBalance(token_account!);

        if (balance == 0) {
          notify_delete();
          return notify_warning("You don't have enough token!");
        } else {
          const account_info = await connection.getAccountInfo(token_account!);
          const offsetInBytes = 2 * 32;
          let amount = 0;
          for (let i = 0; i < 8; i++) {
            amount += account_info!.data[offsetInBytes + i] * 2 ** (i * 8);
          }
          if (amount == 0) {
            notify_delete();
            return notify_warning("You don't have enough token!");
          } else {
            remainingAccounts.push({
              pubkey: token_account!,
              isSigner: false,
              isWritable: true,
            });

            remainingAccounts.push({
              pubkey: token_mint,
              isSigner: false,
              isWritable: true,
            });
          }
        }
      }

      console.log("remainingAccounts");
      console.log(remainingAccounts);

      const mint = Keypair.generate();
      const { instructions } = await mintV2Instruction(
        candyMachine.candyGuard?.address,
        candyMachine.address,
        publicKey,
        publicKey,
        mint,
        connection,
        metaplex,
        remainingAccounts,
        null,
        label!
      );

      const tx = new Transaction().add(...instructions);

      tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      const txid = await wallet.sendTransaction(tx, connection, {
        signers: [mint],
      });

      const latest = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latest.blockhash,
        lastValidBlockHeight: latest.lastValidBlockHeight,
        signature: txid,
      });
      notify_delete();
      notify_success("You Mint Successfully!");
    } catch (e) {
      console.log(e);
      const msg = fromTxError(e);
      notify_delete();
      notify_error("Transaction failed!");
      if (msg) {
        setFormMessage(msg.message);
      }
    }
  };

  const cost = candyMachine
    ? candyMachine.candyGuard?.guards.solPayment
      ? Number(candyMachine.candyGuard?.guards.solPayment?.amount.basisPoints) / 1e9 + " SOL"
      : "Free mint"
    : "...";

  const notify_success = (msg: string) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_warning = (msg: string) => {
    toast.warning(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify_error = (msg: string) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const notify_laoding = (msg: string) => {
    toast.loading(msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const notify_delete = () => {
    toast.dismiss();
  };

  return (
    <>
      {/* <div className="n bg-black/20 z-30 fixed top-0 left-0 w-screen h-screen"></div> */}
      <Head>
        <title>Plang | Mint</title>
        <meta name="description" content="Plang mint page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/LOGO.ico" />
      </Head>
      <div className="min-h-[80vh] xl:container w- mx-auto grid place-items-center">
        <ToastContainer theme="dark" />
        <div className="w-full max-w-[1600px] md:-mt-[14%] flex md:justify-around flex-col md:flex-row items-center justify-center">
          <div className="w-[90%] sm:w-auto">
            <Image src={Mintlogo} width={500} height={300} className="p rounded-3xl" alt="" />
          </div>
          <div className="w-[90%]  sm:w-[350px] text-base text-white rounded-2xl bg-[#45658e]/30 my-8 md:my-0">
            <div className="mt-3 ml-5">
              <div className="text-[22px] font-bold">Solgwais</div>
              <div className="text-[14px] mt-1 font-semibold">A collection of 1,111 potions</div>
            </div>
            <div className="mt-4 w-[86%] mb-4 mx-auto rounded-2xl bg-white/10 overflow-x-hidden min-h-[300px]">
              <div className="pt-4 w-full">
                <div className="flex font-semibold text-[14px] w-[260px] mx-auto justify-between items-center">
                  <div>Supply</div>
                  <div>
                    {`${candyMachine ? Number(candyMachine.itemsMinted) : "Loading.."}`}
                    /1111
                  </div>
                </div>
                {candyMachine && (
                  <div className="my-3 w-[260px] overflow-hidden mx-auto h-2 rounded-full bg-black/40">
                    <div
                      className="bg-white rounded-full h-2"
                      style={{
                        width: Number(candyMachine!.itemsMinted) * (260 / 1111),
                      }}
                    ></div>
                  </div>
                )}
                <div className="w-[330px] bg-white/20 h-[1px] my-5"></div>
                <div className="my-3 text-[13px] w-[260px] mx-auto flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Phase P-A</div>
                    <div className="text-[#1EDCD1] flex items-center text-xs">
                      <CountdownTimer countdownTimestampMs={OG_time} finish={1000 * 60 * 60 * 2} />
                    </div>
                    {/* <div className="text-[#21F51D]">Live</div> */}
                  </div>
                  <div>
                    <div className="font-semibold">Free Mint</div>
                    {/* <div>01H 11min 00s</div> */}
                  </div>
                </div>
                <div className="w-[330px] bg-white/20 h-[1px] my-5"></div>
                <div className="my-3 text-[13px] w-[260px] mx-auto flex justify-between items-center">
                  <div>
                    <div className="font-semibold">Phase P-W</div>
                    <div className="text-[#1EDCD1]">
                      <CountdownTimer countdownTimestampMs={WL_time} finish={1000 * 60 * 60 * 2} />
                    </div>
                    {/* <div className="text-[#F51D1D]">END</div> */}
                  </div>
                  <div>
                    <div className="font-semibold">Free Mint</div>
                    {/* <div>01H 11min 00s</div> */}
                  </div>
                </div>
                <div className="w-[330px] bg-white/20 h-[1px] my-5"></div>
                <div className="my-3 h-[38px] text-[13px] w-[260px] mx-auto flex justify-between items-center">
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
              {publicKey && publicKey?.toBase58() == "FCULaLnb8z7mue9u1J21BixMwv1Whi6gF4XmTFJUKbVs" ? (
                <div className="my-6 flex justify-center">
                  <div
                    onClick={handleMintV2}
                    className="px-[70px] text-xl py-1 font-bold montnormal border border-white rounded-full cursor-pointer active:scale-105 transition-all"
                  >
                    MINT
                  </div>
                </div>
              ) : (
                <div className="my-6 flex justify-center">
                  <div className="px-[70px] text-xl py-1 font-bold montnormal  rounded-full active:scale-105 transition-all">
                    SOLD OUT
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
