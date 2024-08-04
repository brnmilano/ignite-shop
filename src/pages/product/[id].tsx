import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/products";
import { stripe } from "@/lib/stripe";
import { useState } from "react";
import Stripe from "stripe";
import axios from "axios";
import Image from "next/image";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Products({ product }: ProductProps) {
  const { query } = useRouter();

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  async function handleBuyButton() {
    console.log(product.defaultPriceId);

    // try {
    //   setIsCreatingCheckoutSession(true);

    //   const response = await axios.post("/api/checkout", {
    //     priceId: product.defaultPriceId,
    //   });

    //   const { checkoutUrl } = response.data;

    //   window.location.href = checkoutUrl;
    // } catch (err) {
    //   setIsCreatingCheckoutSession(false);

    //   alert("Falha ao redirecionar ao checkout!");
    // }
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores
          aliquid rerum exercitationem facere a molestiae ut sed velit non
          mollitia? Officiis hic velit assumenda aspernatur nihil, sint sed
          laboriosam tempora?
        </p>

        <button onClick={handleBuyButton}>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_QacmZ6Y7gvdeNn" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId ?? "", {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  const unit_amount = price.unit_amount ?? 0;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
