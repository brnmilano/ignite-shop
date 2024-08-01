import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Container, Header } from "@/styles/pages/app";
import { globalStyles } from "@/styles/global";
import LogoImg from "@/assets/logo.svg";
import Image from "next/image";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container className={roboto.className}>
      <Header>
        <Image src={LogoImg} alt="" />
      </Header>

      <Component {...pageProps} />
    </Container>
  );
}
