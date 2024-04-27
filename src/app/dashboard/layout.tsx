export const metadata = {
  title: "Dashboard",
  description: "My Dashboard",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
