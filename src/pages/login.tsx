import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import googleLogo from "@public/google-logo.png";
import githubLogo from "@public/github-logo.png";
import favmeLogo from "@public/favme-logo.png";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "src/store/store";
import { Provider } from "next-auth/providers";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

function LoginPage({ providers }: { providers: Record<string, Provider> }) {
  const router = useRouter();
  const { status } = useSession();

  const setLoading = useStore((state) => state.showScreenLoading);

  const getLogo = (provider: Provider) => {
    switch (provider.name) {
      case "Google":
        return googleLogo;
      default:
        return githubLogo;
    }
  };

  useEffect(() => {
    switch (status) {
      case "authenticated":
        setLoading(false);
        router.replace("/");
        break;
      case "loading":
        setLoading(true);
      default:
        setLoading(false);
    }
  }, [status]);

  return (
    <div className="w-full h-screen relative bg-fav-300">
      <div className="bg-white rounded-2xl shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 pt-10 pb-20">
        <form>
          <div className="w-1/3 mx-auto">
            <Image src={favmeLogo} alt="Google" objectFit="fill" />
          </div>

          <Typography variant="h2" className="flex text-me-50 font-extrabold text-center">
            Login to <span className="ml-3 text-fav-300">Fav.me</span>
          </Typography>
          <div className="mt-5">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  type="button"
                  className="btn btn-fav mt-5 shadow-fav"
                  onClick={() => signIn(provider.id)}
                >
                  <Image src={getLogo(provider)} alt="Google" width={30} height={30} />
                  Sign-in with {provider.name}
                </Button>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  return {
    props: { providers }
  };
};

export default LoginPage;
