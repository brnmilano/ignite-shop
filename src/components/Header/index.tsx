import { Handbag } from "phosphor-react";
import { HeaderContainer } from "./styles";
import Image from "next/image";
import LogoImg from "@/assets/logo.svg";
import { Cart } from "../Cart";
import { useRouter } from "next/router";

export default function Header() {
  const { pathname } = useRouter();

  const showCartButton = pathname !== "/success";

  return (
    <HeaderContainer>
      <Image src={LogoImg} alt="" />

      {showCartButton && <Cart />}
    </HeaderContainer>
  );
}
