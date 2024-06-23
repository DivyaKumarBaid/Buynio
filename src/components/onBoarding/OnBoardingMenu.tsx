"use client";
import React, { useEffect } from "react";
import { FaShop } from "react-icons/fa6";
import { PiShoppingCartDuotone } from "react-icons/pi";
import { Montserrat } from "next/font/google";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toggleOnboarding } from "@/service/onboarding";
import { useUser } from "@/wrappers/UserWrapper";
import toast from "react-hot-toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });

type PathType = {
  text: string;
  backgroundImage: string;
  subtext: string;
  icon: React.JSX.Element;
  onClickFunc: () => void;
};

const OnBoardingMenu = () => {
  const { data: session, status } = useSession();
  const userModule = useUser();
  const router = useRouter()

  const onBoardingMutation = useMutation({
    mutationFn: async (_:string) => {
      const payload = await toggleOnboarding(session);
      return payload;
    }
  });

  const paths: PathType[] = [
    {
      text: "Take me to the hoping world!",
      backgroundImage: "",
      subtext: "",
      icon: (
        <PiShoppingCartDuotone className="md:text-[80px] text-[60px] text-[var(--text-secondary-low-color)] group-hover:text-[var(--text-secondary-secondary-color)] duration-200" />
      ),
      onClickFunc: () => {
        onBoardingMutation.mutate("Explore",{
          onSuccess: () => {
            userModule?.updateUser();
            router.push("/home/explore");
          },
          onError: () => {
              toast.error("Something went wrong!");
          },
        });
      },
    },
    {
      text: "Setup my own world",
      backgroundImage: "",
      subtext: "",
      icon: (
        <FaShop className="md:text-[80px] text-[60px] text-[var(--text-secondary-low-color)] group-hover:text-[var(--text-secondary-secondary-color)] duration-200" />
      ),
      onClickFunc: () => {
        onBoardingMutation.mutate("Create",{
          onSuccess: () => {
            userModule?.updateUser();
            router.push("/home/hop/create");
          },
          onError: (_) => {
              toast.error("Something went wrong!");
          },
        });
      },
    },
  ];


  useEffect(()=>{
    if(status!="loading"){
      if(!!session?.user?.onBoarded)
        redirect('/')
    }
  },[session,status])

  return (
    <div className="w-full min-h-[100vh] flex md:flex-row flex-col items-center justify-center">
      {paths.map(({ text, icon, onClickFunc }, idx) => {
        return (
          <div
            key={`path${idx}`}
            onClick={onClickFunc}
            className="group w-full md:h-[100vh] h-[50vh] bg-black hover:bg-[rgba(10,10,10)] cursor-pointer md:gap-[10vw] gap-8 p-8 flex md:flex-row flex-col items-center justify-center duration-100"
          >
            <div
              className={`flex md:gap-8 gap-4 text-center tracking-wider flex-col justify-start items-center md:w-[20vw] w-[50vw] md:h-[30vh] h-[25vh] duration-500 rounded-lg md:p-8 p-4 md:text-xl text-md cursor-pointer bg-transparent ${montserrat.className}`}
            >
              <div className="md:p-8 p-4 rounded-full bg-[rgba(28,30,32)] shadow-[6px_6px_15px_rgba(0,0,0,0.25)]">
                {icon}
              </div>
              <span className="text-[var(--text-secondary-low-color)] group-hover:text-[var(--text-secondary-secondary-color)] duration-200 break-keep">
                {text}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnBoardingMenu;
