export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "Kes",
  }).format(amount);
};
