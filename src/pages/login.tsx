import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import Image from "next/image";
import googleLogo from "@public/google-logo.png";
import discordLogo from "@public/discord-logo.png";
import githubLogo from "@public/github-logo.png";
import favmeLogo from "@public/favme-logo.png";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useStore } from "src/store/store";
import { Provider } from "next-auth/providers";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Link from "next/link";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useBoolean } from "usehooks-ts";

function LoginPage({ providers }: { providers: Record<string, Provider> }) {
  const router = useRouter();
  const { status } = useSession();

  const setLoading = useStore((state) => state.showScreenLoading);

  const { toggle, value } = useBoolean(true);

  const getLogo = (provider: Provider) => {
    switch (provider.name) {
      case "Google":
        return googleLogo;
      case "GitHub":
        return githubLogo;
      default:
        return discordLogo;
    }
  };

  const getBtnColor = (provider: Provider) => {
    switch (provider.name) {
      case "Google":
        return "btn-google";
      case "GitHub":
        return "btn-github";
      default:
        return "btn-discord";
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
      <div className="w-[35em] min-h-[calc(100vh-500px)] bg-white rounded-2xl shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-20">
        <form>
          <div className="w-1/5 mx-auto mb-2">
            <Image src={favmeLogo} alt="Favme" objectFit="fill" />
          </div>

          <Typography variant="h2" className="flex text-me font-extrabold justify-center">
            Login to <span className="ml-3 text-fav-300">Fav.me</span>
          </Typography>
          {/* <div className="mt-5">
            <Input
              variant="outlined"
              size="lg"
              label="Email"
              color="light-green"
              className="text-base"
            />
          </div>
          <div className="mt-3">
            <Input
              variant="outlined"
              label="Password"
              size="lg"
              type={value ? "password" : "text"}
              icon={
                <IconButton variant="text" className="h-7 w-7" color="light-green">
                  {value ? (
                    <AiFillEye className="h-7 w-7 text-fav-300" onClick={toggle} />
                  ) : (
                    <AiFillEyeInvisible className="h-7 w-7 text-fav-300" onClick={toggle} />
                  )}
                </IconButton>
              }
              color="light-green"
              className="text-base"
            />
          </div>
          <div className="flex justify-end mt-2">
            <Link href="/forgot-password">
              <p className="text-sm hover:underline text-fav-500 hover:cursor-pointer">
                Forgot Password?
              </p>
            </Link>
          </div> */}
          <div className="divide-y divide-gray-300 w-full">
            {/* <Button type="button" className="btn btn-fav mt-5 shadow-fav">
              Sign In
            </Button> */}
            {/* <div className="text-gray-400 w-full text-center mt-5 pt-3">Or</div> */}
            <div></div>
            <div className="mt-5 pt-5">
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    type="button"
                    className={`btn mt-3 mb-5 shadow-outline ${getBtnColor(provider)}`}
                    onClick={() => signIn(provider.id)}
                  >
                    <Image src={getLogo(provider)} alt="Google" width={30} height={30} />
                    Sign-in with {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </form>
        {/* <div className="flex justify-center align-center mt-10">
          <p className="pr-2 text-sm">Don&apos;t have any account? </p>
          <Link href="/sign-up">
            <p className="text-fav-500 text-sm hover:underline hover:cursor-pointer">Register</p>
          </Link>
        </div> */}
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
