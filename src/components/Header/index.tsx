import {
  CartContainer,
  CartTitle,
  HeaderContainer,
  ProductImage,
  ProductInfos,
  ProductName,
  ProductPrice,
  RemoveProductButton,
} from "@/styles/components/header";
import { Box, Drawer, List } from "@mui/material";
import { Handbag } from "phosphor-react";
import Image from "next/image";
import LogoImg from "@/assets/logo.svg";
import toast from "react-hot-toast";
import { productsInCartKey } from "@/types/keys";
import { useEffect, useState } from "react";
import { Product, ProductProps } from "@/types/cartItems";
import { useCart } from "@/hooks/useCart";

export interface RemoveProducts {
  product: ProductProps;
}

export default function Header({ product }: RemoveProducts) {
  const { removeAllProducts } = useCart();

  const [open, setOpen] = useState<boolean>(false);
  const [itemsInCart, setItemsInCart] = useState<Product[]>([]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dataJSON = JSON.parse(
        localStorage.getItem(productsInCartKey) ?? "[]"
      );

      setItemsInCart(dataJSON);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveCoffeFromCart = () => {
    removeAllProducts();

    toast.success("Produto removido do carrinho.");
  };

  const DrawerList = (
    <Box
      sx={{
        width: 480,
        height: "100vh",
        backgroundColor: "#121214",
        color: "white",
      }}
      onClick={toggleDrawer(false)}
    >
      <List sx={{ color: "white" }}>
        <CartTitle>Sacola de compras</CartTitle>

        {itemsInCart.map((item, index) => (
          <CartContainer key={`${item.id} ${index}`}>
            <ProductImage className="keen-slider__slide">
              <Image src={item.imageUrl} width={110} height={90} alt="" />
            </ProductImage>

            <ProductInfos>
              <ProductName>{item.name}</ProductName>

              <ProductPrice>{item.price}</ProductPrice>

              <RemoveProductButton onClick={handleRemoveCoffeFromCart}>
                Remover
              </RemoveProductButton>
            </ProductInfos>
          </CartContainer>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <HeaderContainer>
        <Image src={LogoImg} alt="" />

        <button onClick={toggleDrawer(true)}>
          <Handbag size={28} />
        </button>

        {/* {productsInLocalStorage.length > 0 && (
            <span>{productsInLocalStorage.length}</span>
          )} */}
      </HeaderContainer>
    </>
  );
}
