import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/products";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "@/lib/stripe";
import { useEffect, useState } from "react";
import { Product, ProductProps } from "@/types/cartItems";
import { useCart } from "@/hooks/useCart";
import Stripe from "stripe";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import toast from "react-hot-toast";
import { productsInCartKey } from "@/types/keys";

export default function Products({ product }: ProductProps) {
  const { addProductsInCart } = useCart();

  const { imageUrl, name, description, price } = product;

  const [productExists, setProductExists] = useState<[]>([]);

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState<boolean>(false);

  async function handleBuyButton() {
    // try catch deve ser usado quando vamos lidar com requisições de
    // api's externas principalmente para operações que vem atráves
    // de ações do usuário, dessa forma, conseguimos apresentar ao usuário
    // se está tudo certo ou se houve algum erro.
    try {
      setIsCreatingCheckoutSession(true);

      // Como quero criar uma checkout session, o melhor método a ser usado
      // é o post.
      // Nesse caso não é necessário criar um arquivo service, setando o baseUrl
      // Aqui a API está rodando no mesmo endereço localhost:3000.
      // O axios já entende que a requisição é para a mesma origem.
      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      // Modelo utilizado para redirecionamento de páginas externas
      // Para páginas dentro da aplicação, o ideal é usar o useRouter
      window.location.href = checkoutUrl;
    } catch (err) {
      // Aqui, podemos conectar com alguma ferramenta de observabilidade
      // Datadog ou Sentry para monitorar os erros que estão acontecendo.
      setIsCreatingCheckoutSession(false);

      alert("Falha ao redirecionar ao checkout!");
    }
  }

  const handleAddProductToCart = (product: Product) => {
    addProductsInCart(product);

    if (!productExists) {
      toast.success("Produto adicionado ao carrinho!");
    } else {
      toast.error("Produto já está no carrinho!");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataJSON = JSON.parse(
        localStorage.getItem(productsInCartKey) ?? "[]"
      );

      setProductExists(dataJSON.find((item: any) => item.id === product.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={imageUrl} width={520} height={480} alt={name} />
        </ImageContainer>

        <ProductDetails>
          <h1>{name}</h1>
          <span>{price}</span>

          <p>{description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            //onClick={handleBuyButton}
            onClick={() => handleAddProductToCart(product)}
          >
            Colocar na sacola
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
      },
    },
    revalidate: 60 * 60 * 1, // 1 hours
  };
};
