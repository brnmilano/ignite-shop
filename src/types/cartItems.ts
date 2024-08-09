export interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    quantity: number;
  };
}

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  description: string;
  defaultPriceId: string;
  quantity: number;
  totalItemPrice: number;
  numberPrice: number;
}
