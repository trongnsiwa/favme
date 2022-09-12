import { useEffect } from "react";
import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import { GetServerSideProps } from "next";
import { Provider } from "next-auth/providers";
import { getProviders, signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useStore } from "src/store/store";
import googleLogo from "@public/google-logo.png";
import discordLogo from "@public/discord-logo.png";
import favmeLogo from "@public/favme-text-logo.png";
import { useBoolean } from "usehooks-ts";
import Image from "next/image";

function SignUpPage({ providers }: { providers: Record<string, Provider> }) {
  const router = useRouter();
  const { status } = useSession();

  const setLoading = useStore((state) => state.showScreenLoading);

  const { toggle, value } = useBoolean(true);
  const { toggle: toggleConfirm, value: valueConfirm } = useBoolean(true);

  const getLogo = (provider: Provider) => {
    switch (provider.name) {
      case "Google":
        return googleLogo;
      default:
        return discordLogo;
    }
  };

  const getBtnColor = (provider: Provider) => {
    switch (provider.name) {
      case "Google":
        return "btn-google";
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
      <div className="w-[35em] min-h-[calc(100vh-500px)] bg-white rounded-2xl shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-10">
        <form>
          <div className="w-1/2 mx-auto mb-2">
            <Image src={favmeLogo} alt="Favme" objectFit="fill" />
          </div>
          <Typography variant="h3" className="flex text-me font-extrabold gap-2">
            <span className="text-fav-300">Join</span> now!
          </Typography>
          <div className="mt-5">
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
              type={value ? "password" : "text"}
              size="lg"
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
          <div className="mt-3">
            <Input
              variant="outlined"
              label="Confirm password"
              size="lg"
              type={valueConfirm ? "password" : "text"}
              icon={
                <IconButton variant="text" className="h-7 w-7" color="light-green">
                  {valueConfirm ? (
                    <AiFillEye className="h-7 w-7 text-fav-300" onClick={toggleConfirm} />
                  ) : (
                    <AiFillEyeInvisible className="h-7 w-7 text-fav-300" onClick={toggleConfirm} />
                  )}
                </IconButton>
              }
              color="light-green"
              className="text-base"
            />
          </div>
          <div className="divide-y divide-gray-300 w-full">
            <Button type="button" className="btn btn-fav mt-5 shadow-fav">
              Sign Up
            </Button>
            <div className="text-gray-400 w-full text-center mt-5 pt-3">Or</div>
            <div className="mt-3">
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    type="button"
                    className={`btn mt-3 mb-5 shadow-fav ${getBtnColor(provider)}`}
                    onClick={() => signIn(provider.id)}
                  >
                    <Image src={getLogo(provider)} alt="Google" width={30} height={30} />
                    Sign-up with {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </form>
        <div className="flex justify-center align-center mt-10">
          <p className="pr-2 text-sm">Already have account? </p>
          <Link href="/login">
            <p className="text-fav-500 text-sm hover:underline hover:cursor-pointer">Login</p>
          </Link>
        </div>
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

export default SignUpPage;
