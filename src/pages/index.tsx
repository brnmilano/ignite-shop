import { HomeContainer, Product } from "@/styles/pages/home";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import Camiseta1 from "@/assets/camisetas/camisa-1.png";
import Camiseta2 from "@/assets/camisetas/camisa-2.png";
import Camiseta3 from "@/assets/camisetas/camisa-3.png";
import Camiseta4 from "@/assets/camisetas/camisa-4.png";

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      <Product className="keen-slider__slide">
        <Image src={Camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={Camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={Camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={Camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camiseta X</strong>

          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  );
}
