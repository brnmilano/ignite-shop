import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import { ImageContainer, SuccessContainer } from "./styles.ts";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  custumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Success({ custumerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efetuada</h1>

        <ImageContainer>
          <Image src={product.imageUrl} width={120} height={110} alt="" />
        </ImageContainer>

        <p>
          Uhuul <strong>{custumerName}</strong>, sua{" "}
          <strong>{product.name}</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}

/**
 * Temos três formas de apresentar os dados da tela de sucesso:
 * 1 - Cliente-side (useEffect)
 * 2 - Server-side (getServerSideProps)
 * 3 - Static-side (getStaticProps)
 *
 * Qual a opção devo utilizar para renderizar essa página?
 * getStaticProps não faz sentido para essa página, pois ela é dinâmica.
 *
 * useEffect não é a melhor opção, pois primeiramente eu devo pensar em uma tela de loading
 * para que o usuário saiba que a requisição está sendo feita. Além disso, a API do Stripe
 * que estamos usando, não permite fazer chamadas para buscar dados de uma checkout session pelo
 * cliente-side, pois isso exporia informações sensíveis.
 *
 * A melhor opção é o getServerSideProps, pois ele permite que a página seja renderizada
 * no servidor, garantindo que o usuário não veja a tela de loading e que as informações
 * sensíveis não sejam expostas.
 */

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  console.log(session.line_items?.data);

  const custumerName = session?.customer_details?.name;
  const product = session?.line_items?.data[0]?.price
    ?.product as Stripe.Product;

  return {
    props: {
      custumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
