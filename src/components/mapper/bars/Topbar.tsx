import ToggleButton from "@/components/formComponents/components/ToggleButton";
import { InputTypeEnum } from "@/components/formComponents/types/input.types";
import VerticalDivider from "@/components/general/VerticalDivider";
import { rajdhani } from "@/lib/Fonts";
import { saveHop } from "@/service/hop";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLink } from "react-icons/fa6";
import { LuSave } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { useMapperContext, View } from "../hooks/selectedElemContext";
import { MdOutlineCancel } from "react-icons/md";

enum SavingStates {
  SAVING = "saving",
  TICK = "tick",
  SAVE = "save",
  ERROR = "error",
}

const saveIcons: Record<SavingStates, JSX.Element> = {
  [SavingStates.SAVE]: <LuSave />,
  [SavingStates.TICK]: (
    <TiTick className="text-[var(--success-primary-color)]" />
  ),
  [SavingStates.ERROR]: (
    <MdOutlineCancel className="text-[var(--danger-primary-color)]" />
  ),
  [SavingStates.SAVING]: (
    <span className="animate-ping w-[10px] h-[10px] rounded-full bg-[var(--text-secondary-color)] opacity-75 flex justify-center items-center">
      <span className="animate-ping w-[5px] h-[5px] rounded-full bg-[var(--text-primary-color)]"></span>
    </span>
  ),
};

const Topbar = () => {
  const { data: session } = useSession();

  const [savingState, setSaving] = useState<SavingStates>(SavingStates.SAVE);

  const saveHopMutation = useMutation({
    mutationFn: async (_: string) => {
      const payload = await saveHop(
        session,
        useMapper?.roomId || "",
        JSON.stringify(useMapper?.webJson) || ""
      );
      return payload;
    },
  });

  const handleSave = async () => {
    setSaving(SavingStates.SAVING);
    saveHopMutation.mutateAsync("", {
      onSuccess: () => {
        // userModule?.updateUser();
        toast.success("Successfully saved hop");
        setSaving(SavingStates.TICK);
        setTimeout(() => {
          setSaving(SavingStates.SAVE);
        }, 2000);
      },
      onError: () => {
        toast.error("Something went wrong!");
        setSaving(SavingStates.ERROR);
        setTimeout(() => {
          setSaving(SavingStates.SAVE);
        }, 2000);
      },
    });
  };

  const useMapper = useMapperContext();
  return (
    <div
      className={`${rajdhani.className} p-2 fixed z-[101] bg-[var(--card-bg-color)] shadow-xl top-8 rounded-xl flex items-center justify-center gap-2`}
    >
      <ToggleButton
        value={useMapper?.view === View.WEB ? true : false}
        header={"Toggle View"}
        name={"WEB"}
        type={InputTypeEnum.TOGGLE_BUTTON_INPUT}
        onChange={(e) =>
          useMapper?.setView(e.target.value === true ? View.WEB : View.MOBILE)
        }
      />
      <VerticalDivider
        width="1px"
        height="20px"
        backgroundColor="rgba(150,150,150)"
      />
      <div className="flex flex-col mx-2 justify-center gap-1 items-center">
        <div className="text-[var(--text-primary-color)] text-sm">
          {useMapper?.selectedElement?.type || "General"}
        </div>
      </div>
      {useMapper?.roomId && (
        <>
          <VerticalDivider
            width="1px"
            height="20px"
            backgroundColor="rgba(150,150,150)"
          />
          <Link href={`/hops/simulator/${useMapper?.roomId}`} target="_blank">
            <FaLink className="text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] duration-200 cursor-pointer text-xl mx-2" />
          </Link>
        </>
      )}
      <>
        <VerticalDivider
          width="1px"
          height="20px"
          backgroundColor="rgba(150,150,150)"
        />
        <div
          className="mx-2 flex text-[var(--text-secondary-color)] hover:text-[var(--text-primary-color)] items-center gap-2 cursor-pointer"
          onClick={() => savingState != SavingStates.SAVING && handleSave()}
        >
          {saveIcons[savingState]} <span>Save</span>
        </div>
      </>
    </div>
  );
};

export default Topbar;
