import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { sidebarItems } from "@/constants";
import { SidebarItem } from "./sidebar-item";


type Props = {
    className?:string
}

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src={"/assets/logo.svg"} height={40} width={40} alt="Mascot" />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            duolingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {sidebarItems?.map((item) => (
          <SidebarItem
            label={item.label}
            href={item.href}
            iconSrc={item.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};