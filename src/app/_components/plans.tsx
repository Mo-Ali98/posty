export const plans = [
  {
    name: "Basic",
    description: "Perfect for individuals and small teams.",
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_3cs9Dg9F5gV09ywcMM"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PKQBIRwYtrOJacvkwGQeU5m"
        : "",
    price: 9,
    duration: "/month",
  },
  {
    name: "Pro",
    description: "Ideal for growing teams and small businesses.",

    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEU16K8B15cibGEaEG"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PKR6KRwYtrOJacvspFeAFsn"
        : "",
    price: 29,
    duration: "/month",
  },
  {
    name: "Enterprise",
    description: "Tailored for large teams and organizations.",

    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_00gbLo8B17kq5ig6op"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1PKR6fRwYtrOJacvC9eEa9xJ"
        : "",
    price: 99,
    duration: "/month",
  },
];
