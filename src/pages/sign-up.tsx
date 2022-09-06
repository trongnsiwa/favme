import { Button, IconButton, Input, Typography } from "@material-tailwind/react";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";

function SignUpPage() {
  return (
    <div className="w-full h-screen relative bg-fav-300">
      <div className="w-[35em] min-h-[calc(100vh-500px)] bg-white rounded-2xl shadow-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-20 py-10">
        <form>
          <Typography variant="h2" className="flex text-me-50 font-extrabold">
            Join <span className="mx-3 text-fav-300">Fav.me</span> now!
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
              type="password"
              size="lg"
              icon={
                <IconButton variant="text" className="h-7 w-7" color="light-green">
                  <AiFillEye className="h-7 w-7 text-fav-300" />
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
              type="password"
              size="lg"
              icon={
                <IconButton variant="text" className="h-7 w-7" color="light-green">
                  <AiFillEye className="h-7 w-7 text-fav-300" />
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
            <div className="text-gray-400 w-full text-center mt-10 pt-3">or</div>
            <Button type="button" className="btn btn-git mt-3 shadow-fav">
              Sign-up with Github
            </Button>
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

export default SignUpPage;
