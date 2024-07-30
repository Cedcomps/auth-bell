import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
      <Nav/>
        <div className="py-6 font-bold bg-blue-50 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <h1 className="text-3xl">Our users can use many popular Auth methods, including password, magic link, one-time password (OTP), social login, and single sign-on (SSO) with SAML 2.0.</h1>
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">Preferred Order of Social Login Use</h2>
          <p>Based on the analysis of various sources, here is the preferred order of use for Social Login (OAuth) among the listed applications, along with their approximate usage percentages:
          </p><h1 className="text-2xl font-bold mb-4">Preferred Order of Social Login Use</h1>
        <ol className="list-decimal list-inside">
            <li><strong>Google</strong>: 73% - 75% of social logins <sup>[2][3]</sup></li>
            <li><strong>Apple</strong>: 10% - 15% of social logins <sup>[1][2]</sup></li>
            <li><strong>Facebook</strong>: 5% - 10% of social logins <sup>[1][2]</sup></li>
            <li><strong>LinkedIn</strong>: 2% - 5% of social logins <sup>[1][3]</sup></li>
            <li><strong>GitHub</strong>: 2% - 5% of social logins <sup>[1][2]</sup></li>
            <li><strong>Microsoft (Azure)</strong>: 1% - 3% of social logins <sup>[3]</sup></li>
            <li><strong>Twitter</strong>: 1% - 3% of social logins <sup>[1][3]</sup></li>
        </ol>

        <h2 className="text-xl font-bold mt-6 mb-2">Analysis</h2>

        <h3 className="text-lg font-semibold mt-4 mb-2">Top Tier</h3>
        <ul className="list-disc list-inside">
            <li><strong>Google</strong> accounts for approximately 73% to 75% of social logins, making it the most popular choice among users. This high adoption rate ensures that a significant portion of Bell Canada's customer base is likely already using Google, which can streamline the login process. <sup>[2][3]</sup>.</li>
            <li><strong>Apple</strong> comes in second, with a focus on privacy and security, making it popular among users of Apple devices <sup>[1][2]</sup>.</li>
            <li><strong>Facebook</strong> remains a strong contender, although its usage has seen fluctuations due to privacy concerns <sup>[1][2]</sup>.</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Sources</h2>
        <ul className="list-disc list-inside">
            <li><a href="https://supertokens.com/blog/social-login" className="text-blue-500">[1] SuperTokens Blog</a></li>
            <li><a href="https://assets.ctfassets.net/2ntc334xpx65/77U9sLFO7rD7t9zdI6Q1SV/a8e2054b5affc0280769516eee70b0ea/Social-Login-Report.pdf" className="text-blue-500">[2] Social Login Report</a></li>
            <li><a href="https://www.okta.com/blog/2020/08/social-login/" className="text-blue-500">[3] Okta Blog</a></li>
            <li><a href="https://frontegg.com/blog/social-logins" className="text-blue-500">[4] Frontegg Blog</a></li>
        </ul>
        </main>
      </div>

      <Footer/>
    </div>
  );
}
