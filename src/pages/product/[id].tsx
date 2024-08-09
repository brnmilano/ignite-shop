import { ImageContainer, ProductContainer, ProductDetails } from "./styles";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useCart } from "@/hooks/useCart";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import Head from "next/head";
import { IProduct } from "@/types/cartItems";

interface ProductProps {
  product: IProduct;
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter();

  const { addToCart, checkIfItemAlreadyExists } = useCart();

  if (isFallback) {
    return <p>Loading...</p>;
  }

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id);

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={itemAlreadyInCart}
            onClick={() => addToCart(product)}
          >
            {itemAlreadyInCart
              ? "Produto já está no carrinho"
              : "Colocar na sacola"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
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
        numberPrice: unit_amount / 100,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
