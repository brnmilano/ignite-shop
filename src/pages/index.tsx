import { HomeContainer, Product } from "@/styles/pages/home";
import { useKeenSlider } from "keen-slider/react";
import { GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import { Handbag } from "phosphor-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import "keen-slider/keen-slider.min.css";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product, index) => {
          return (
            <Link
              prefetch={false}
              key={`${product.id} ${index}`}
              href={`/product/${product.id}`}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>

                    <span>{product.price}</span>
                  </div>

                  <button>
                    <Handbag size={32} />
                  </button>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product: any) => {
    const price = product.default_price as Stripe.Price;

    const unit_amount = price.unit_amount ?? 0;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(unit_amount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
