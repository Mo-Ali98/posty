export const metadata = {
  title: "Pricing",
  description: "My Pricing",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Pricing({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
