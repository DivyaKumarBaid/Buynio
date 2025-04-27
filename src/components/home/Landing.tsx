import { fragmentMono } from "@/lib/Fonts";

const Landing = () => {
  return (
    <div className="flex flex-col w-full h-max justify-center break-keep">
      <div
        className={`${fragmentMono.className} w-full min-h-[85vh] flex items-center justify-center px-16 bg-[url('/homeLander.png')] bg-no-repeat rounded-xl bg-top bg-contain`}
      >
        <div className="w-[40vw] flex flex-col gap-4 text-center">
          <div className="text-4xl font-bold leading-relaxed tracking-widest text-balance">
            Build. Publish. Grow
            <br />
            All Without Code.
          </div>
          <div className="text-md text-[var(--text-secondary-color)]">
            Turn your ideas into live landing pages — no coding, no waiting. Our
            builder is made for smalltimers who want to move fast and look pro.
            Choose, customize, and launch in minutes. Your hustle deserves a
            home — start now.
          </div>
        </div>
      </div>
      <div
        className={`${fragmentMono.className} w-full min-h-[70vh] flex items-center justify-center px-16 rounded-xl gap-8`}
      >
        <div className="w-[40vw]">
          <img src="/secondPara.png" alt={""} className="" />
        </div>
        <div className="w-[40vw] flex flex-col gap-4">
          <div className="text-3xl text-right font-bold leading-relaxed tracking-widest">
            Worried About Too Many Complicated Components?
            <br />
            We have just what you need.
          </div>
          <div className="text-md text-right text-[var(--text-secondary-color)]">
            Start simple with features like a carousel, landing hero image, and
            product matrix. We are keeping it easy — and yes, more cool stuff is
            coming soon!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
