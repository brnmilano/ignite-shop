import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Container } from "@/styles/pages/app";
import { CartProvider } from "@/hooks/useCart";
import { globalStyles } from "@/styles/global";
import { Toaster } from "react-hot-toast";
import { Product } from "@/types/cartItems";
import Header from "@/components/Header";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

globalStyles();

export interface RemoveProducts {
  product: Product[];
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container className={roboto.className}>
        <Header />

        <CartProvider>
          <Toaster position="top-center" />

          <Component {...pageProps} />
        </CartProvider>
      </Container>
    </>
  );
}
