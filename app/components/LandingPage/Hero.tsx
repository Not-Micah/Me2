import Button from "../Button";
import AbstractRects from "./AbstractRects";

import { signIn } from "@/app/utils/databasefunctions";

const Hero = () => {
  return (
    <section className="flex flex-row justify-center items-center gap-x-12 m-10
    max-lg:flex-col max-lg:mt-28">
      <div className="flex flex-col justify-center items-start max-w-[350px]
      max-lg:items-center">
        <h3 className="dynamic-heading font-semibold text-left leading-[65px]
        max-lg:leading-[60px]
        max-lg:text-center">The Chat App For Students</h3>
        <p className="dynamic-text text-gray-700 mt-10 text-left
        max-lg:text-center">
          Meet Me2! The chat app designed for students to find other students with similar interests and experiences.
        </p>
        <div className="flex justify-end mt-8">
          <Button
            className="px-12 py-4 rounded-full
            text-white font-semibold"
            onClick={signIn}
          >
            Sign Up
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center
      max-lg:hidden">
        <AbstractRects />
      </div>
    </section>
  );
};

export default Hero;