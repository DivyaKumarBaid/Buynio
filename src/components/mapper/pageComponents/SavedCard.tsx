import { formatDate } from "@/utils/utility";
import Link from "next/link";
import { BsHeart } from "react-icons/bs";

type SavedCardType = {
  name: string;
  background: string;
  createdAt: Date;
  updatedAt: Date;
  tag: string;
  logo: string;
  id: string;
};

const SavedCard = (props: SavedCardType) => {
  return (
    <Link href={`/hops/editor/${props.id}`} className="w-max h-max">
      <div
        className="w-[16vw] min-w-[200px] h-[16vw] border-[1px] border-[var(--card-border-color)] min-h-[200px] rounded-xl bg-[var(--card-bg-color)] shadow-[0px_0px_14px_rgba(0,0,0,0.2)] flex flex-col gap-4 p-4 cursor-pointer hover:shadow-[0px_0px_18px_rgba(0,0,0,0.4)] hover:bg-[var(--card-bg-secondary-color)] duration-300"
        style={{ background: props.background }}
      >
        <div className="flex w-full gap-4 text-md">
          <div className="w-full border-[1px] border-[var(--card-border-hover-color)] h-max rounded-md px-2 py-1">
            {props.name}
          </div>
          <div className="border-[1px] flex justify-center items-center border-[var(--card-border-hover-color)] h-max rounded-md p-2">
            <BsHeart />
          </div>
        </div>
        <div
          className="w-full h-full rounded-lg !bg-cover !bg-no-repeat !bg-center"
          style={{ background: `url(${props.logo})` }}
        ></div>
        <h6 className="text-xs text-[var(--text-secondary-color)]">
          Updated at {formatDate(new Date(props.updatedAt))}
        </h6>
      </div>
    </Link>
  );
};

export default SavedCard;
