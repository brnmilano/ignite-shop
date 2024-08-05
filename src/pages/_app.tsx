import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Container, Header } from "@/styles/pages/app";
import { globalStyles } from "@/styles/global";
import { Handbag } from "phosphor-react";
import { useEffect, useState } from "react";
import { CartProvider, useCart } from "@/hooks/useCart";
import LogoImg from "@/assets/logo.svg";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { productsInCartKey } from "@/types/keys";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { cartItems } = useCart();

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>testado</ListItemIcon>

              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <div>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>

      <Container className={roboto.className}>
        <Header>
          <Image src={LogoImg} alt="" />

          <button onClick={toggleDrawer(true)}>
            <Handbag size={28} />
          </button>

          {/* {productsInLocalStorage.length > 0 && (
            <span>{productsInLocalStorage.length}</span>
          )} */}
        </Header>

        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </Container>
    </>
  );
}
