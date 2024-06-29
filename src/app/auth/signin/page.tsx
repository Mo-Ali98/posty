import { getProviders } from "next-auth/react";

import SignInForm from "./SignInForm";

export default async function SignInPage() {
  const providers = await getProviders();

  return <SignInForm providers={providers} />;
}
