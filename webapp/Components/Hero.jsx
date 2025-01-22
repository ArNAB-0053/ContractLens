import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="py-20 md:py-32 min-h-svh flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <h1 className=" font-semibold mb-8  leading-tight">
          <span className="text-4xl  md:text-6xl ">Transform Your </span>
          <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-blue-500 tracking-[.20em] contract">Contracts.</span>
          <span className="block mt-1 text-xl md:text-3xl text-gray-800 subheading">
            Compare • Analyze • Simplify
          </span>
        </h1>
        <p className="text-md md:text-xl lg:text-xl mb-8 text-gray-600 max-w-2xl mx-auto">
          ContractLens streamlines your workflow by identifying key changes and
          similarities in contracts, making your analysis more efficient.
        </p>
        <Link href="/compare-contract">
          <Button size="lg" className="text-lg px-8 py-3 ">
            Upload Contracts to Compare
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
