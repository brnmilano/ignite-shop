import { styled } from "..";

export const HeaderContainer = styled("header", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  position: "relative",

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$gray800",
    color: "$gray500",
    border: "none",
    padding: "0.6rem 0.7rem",
    borderRadius: "6px",
    cursor: "pointer",
  },

  span: {
    position: "absolute",
    right: "-14px",
    top: "20px",
    backgroundColor: "$green500",
    padding: "0.2rem 0.5rem",
    borderRadius: "50%",
    border: "4px solid $gray900",
  },
});

export const CartTitle = styled("h1", {
  fontSize: "1.25rem",
  marginTop: "5rem",
  marginBottom: "2rem",
  padding: "0 3rem",
});

export const CartContainer = styled("div", {
  display: "flex",
  gap: "1rem",
  padding: "0 3rem",

  div: {
    marginBottom: "1.5rem",
  },

  "&:last-child": {
    div: {
      marginBottom: "0",
    },
  },
});

export const ProductImage = styled("div", {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  color: "$white",
  padding: "1rem",

  img: {
    objectFit: "cover",
  },
});

export const ProductInfos = styled("span", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  fontSize: "1.125rem",
});

export const ProductName = styled("span", {
  color: "$gray300",
});

export const ProductPrice = styled("span", {
  color: "$gray100",
  fontWeight: 600,
});

export const RemoveProductButton = styled("button", {
  color: "$green500",
  width: 0,
  backgroundColor: "transparent",
  border: "none",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
});
