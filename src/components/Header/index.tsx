import { Handbag } from "phosphor-react";
import { HeaderContainer } from "./styles";
import Image from "next/image";
import LogoImg from "@/assets/logo.svg";

export default function Header() {
  return (
    <HeaderContainer>
      <Image src={LogoImg} alt="" />

      <button>
        <Handbag size={28} />
      </button>
    </HeaderContainer>
  );
}
