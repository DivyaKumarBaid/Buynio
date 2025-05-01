import { formatDate } from "@/utils/utility";
import Link from "next/link";

type SavedCardType = {
  name: string;
  background: string;
  createdAt: Date;
  updatedAt: Date;
  tag: string;
  logo: string;
  id: string;
  link?: string;
  isReleased?: boolean;
};

const SavedCard = (props: SavedCardType) => {
  return (
    <Link
      href={props.link ? `/${props.link}` : `/hops/editor/${props.id}`}
      className="w-max h-max"
      target={props.link ? "_blank" : "_self"}
    >
      <div className="w-[16vw] min-w-[200px] h-[16vw] border-[1px] border-[var(--card-border-color)] min-h-[200px] rounded-xl bg-[var(--card-bg-color)] shadow-[0px_0px_14px_rgba(0,0,0,0.2)] flex flex-col gap-4 p-4 cursor-pointer hover:shadow-[0px_0px_18px_rgba(0,0,0,0.4)] hover:bg-[var(--card-bg-secondary-color)] duration-300">
        <div className="flex w-full gap-4 text-md">
          <div className="w-full border-[1px] border-[var(--card-border-hover-color)] h-max rounded-md px-2 py-1">
            {props.name}
          </div>
          {props.isReleased && (
            <div className="text-xs break-keep text-[var(--danger-primary-color)] flex justify-center items-center border-[var(--card-border-hover-color)] h-max rounded-md p-2">
              <span className="animate-ping w-[10px] h-[10px] rounded-full bg-[var(--text-secondary-color)] opacity-75 flex justify-center items-center mr-2">
                <span className="animate-ping w-[5px] h-[5px] rounded-full bg-[var(--text-primary-color)]"></span>
              </span>
              Live
            </div>
          )}
        </div>
        <div
          className="rounded-xl p-2 h-full w-full"
          style={{ background: props.background }}
        >
          <div
            className="w-full h-full rounded-lg !bg-contain !bg-no-repeat !bg-center "
            style={{ background: `url(${props.logo})` }}
          />
        </div>
        <h6 className="text-xs text-[var(--text-secondary-color)]">
          Updated at {formatDate(new Date(props.updatedAt))}
        </h6>
      </div>
    </Link>
  );
};

export default SavedCard;
