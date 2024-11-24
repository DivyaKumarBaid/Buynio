"use client";
import useForm from "@/hooks/useForm";
import { rajdhani } from "@/lib/Fonts";
import { createHop } from "@/service/hop";
import { useUser } from "@/wrappers/UserWrapper";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { InputTypeEnum } from "../formComponents/types/input.types";
import FormButton from "../general/FormButton";
import Loader from "../general/Loader";
import {
  basicInfoSection,
  brandInfoSection
} from "./Section";
import BasicInfo from "./steps/BasicInfo";

const createBaseValue = () => {
  const initialValue: Record<string, any> = {};
  [...basicInfoSection, ...brandInfoSection].forEach((sect) => {
    sect.inputs.forEach((inp: any) => {
      switch (inp.type) {
        case InputTypeEnum.TEXT_AREA_INPUT:
          initialValue[inp.name] = "";
          break;
        case InputTypeEnum.NUMBER_INPUT:
          initialValue[inp.name] = "";
          break;
        case InputTypeEnum.TEXT_INPUT:
          initialValue[inp.name] = "";
          break;
        case InputTypeEnum.IMAGE_UPLOADER:
          initialValue[inp.name] = null;
          break;
        case InputTypeEnum.MULTI_IMAGE_UPLOADER:
          initialValue[inp.name] = null;
          break;
        case InputTypeEnum.COLOR_PICKER_INPUT:
          initialValue[inp.name] = "#000";
          break;
        case InputTypeEnum.RANGE_INPUT:
          initialValue[inp.name] = "0";
          break;
        case InputTypeEnum.CHECKBOX_INPUT:
          initialValue[inp.name] = inp.multiSelect ? [] : "";
          break;
      }
    });
  });
  return initialValue;
};

const HopCreator = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [value, handleChange] = useForm(createBaseValue());
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [continueButton, setContinueButton] = useState<boolean>(false);
  const userModule = useUser();
  const stepsPage = [
    {
      heading: "Basic Info",
      component: (
        <BasicInfo
          {...{
            value,
            handleChange,
            loading,
            setContinueButton,
            section: basicInfoSection,
          }}
        />
      ),
    },
    {
      heading: "Brand Info",
      component: (
        <BasicInfo
          {...{
            value,
            handleChange,
            loading,
            setContinueButton,
            section: brandInfoSection,
          }}
        />
      ),
    },
  ];

  useEffect(() => {
    if (status != "loading") {
      if (session?.user?.hops?.length && session?.user?.hops?.length > 1) {
        toast.error("You already have a hop!");
        router.push("/");
      }
    }
  }, [router, status, session]);

  const onBoardingMutation = useMutation({
    mutationFn: async (payloadData: Record<string, any>) => {
      const payload = await createHop(session, payloadData);
      if(payload.savedHop){
        router.push(`/hops/editor/${payload.savedHop.id}`)
      }
      return payload;
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    onBoardingMutation.mutateAsync(value,
      {
        onSuccess: () => {
          userModule?.updateUser();
          toast.success("Successfully created hop");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      }
    );
  };

  if(status == "loading")
      return <Loader/>

  return (
    <div
      className={`p-4 px-6 ${rajdhani.className} w-full flex flex-col justify-center items-center`}
    >
      <div className="flex justify-between items-center text-2xl w-full opacity-50 m-4 mb-16 gap-8">
        <div className="min-w-max break-keep" id="heading-section">
          {stepsPage[step].heading}
        </div>
        <div className="flex w-full gap-2">
          {stepsPage.map((_, idx) => {
            return (
              <div
                key={"stepLine" + idx}
                className={`w-full h-[1px] ${idx < step + 1 ? "bg-[--border-color]" : "bg-[var(--border-focus-color)]"}`}
              />
            );
          })}
        </div>
      </div>
      {stepsPage[step].component}
      <div className="w-full flex justify-end items-center gap-8">
        <div className="w-1/4 mb-8 mr-8 flex gap-8">
          {step != 0 && (
            <FormButton
              disabled={false}
              text="Back"
              onClickFunc={() => setStep((prev) => prev - 1)}
            />
          )}
          <Link href="#heading-section" className="w-full">
            <FormButton
              disabled={continueButton}
              text={stepsPage.length == step + 1 ? "Finish" : "Continue"}
              onClickFunc={() =>
                stepsPage.length != step + 1
                  ? setStep((prev) => prev + 1)
                  : handleSubmit()
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HopCreator;
