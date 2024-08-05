import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
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
