import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/NewNavbar";
import dynamic from "next/dynamic";
import { ConterProvider } from "../components/Counter/CounterCountext";

const WalletProvider = dynamic(() => import("@/components/WalletProvider"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConterProvider>
      <WalletProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </WalletProvider>
    </ConterProvider>
  );
}
