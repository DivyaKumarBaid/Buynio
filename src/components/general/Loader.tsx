import { tomorrow } from "@/lib/Fonts";

const Loader = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-6 justify-center items-center  animate-pulse duration-500 opacity-5">
      <img src="/logoLight.png" alt="" className="h-[30vh]" />
      {/* <h2 className={`${tomorrow.className} text-3xl tracking-widest`}>BUYNIO</h2> */}
      <h2 className={`${tomorrow.className} text-md tracking-widest`}>Loading...</h2>
    </div>
  );
};

export default Loader;
