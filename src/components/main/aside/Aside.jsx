import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Loader2 } from "lucide-react";
import Hands from "./hands/Hands";

const fetchGestures = async () => {
  const { data } = await axios.get("https://nslovar.cnii-jest.ru/api/jests");
  return data;
};

export default function Aside() {
  const {
    data: gestures,
    isLoading,
    error,
  } = useQuery("gestures", (id) => fetchGestures(id));

  if (error) console.log(error);

  const gesturesCount = gestures?.length;
  const imagesPerPage = 5;
  const [page, setPage] = useState(1);
  const [colorLeft, setColorLeft] = useState('#3EA2FF');
  const [colorRight, setColorRight] = useState('#3EA2FF');
  const startIndex = (page - 1) * imagesPerPage;
  const endIndex = Math.min(gesturesCount, startIndex + imagesPerPage);

  const slideBack = () => {
    if (page > 1) setPage((prev) => prev - 1);
    if (endIndex > 4) {setColorLeft('#630B12')}
  };

  const slideForward = () => {
    if (page * imagesPerPage < gesturesCount) setPage((prev) => prev + 1);
    if (endIndex === 5) {setColorRight('#630B12')}
  };
console.log(endIndex)

  return (
    <aside className="h-[670px] w-[420px]">
      <div className="flex h-full">
        <div className="flex w-[232px] flex-col gap-[10px] bg-[#1B1D23] px-[15px]">
          <Hands />
          <Input
            placeholder="Название жеста"
            className="border-none bg-[#303339] text-[#728796] placeholder:text-[#728796] focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <ScrollArea className="h-[240px] rounded-md bg-[#303339]">
            {isLoading && (
              <div className="flex h-[240px] items-center justify-center">
                <Loader2 className="animate-spin text-[#728796]" />
              </div>
            )}
            {error && (
              <div className="flex h-[240px] items-center justify-center px-2">
                <span className="text-center text-sm text-[#728796]">
                  Не удалось загрузить список жестов
                </span>
              </div>
            )}
            {gestures && (
              <div className="flex flex-col">
                {gestures.map((post) => (
                  <a
                    href={`/${post.id}`}
                    className="max-w-[190px] cursor-pointer truncate px-2 py-[1.5px] text-[14px] leading-[17px] text-[#728796] transition hover:text-neutral-200"
                    key={post.id}
                  >
                    {post.name}
                  </a>
                ))}
              </div>
            )}
          </ScrollArea>
          <Button className="bg-[#1B75BB] text-[#C1E1FF]">Темы</Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div
                role="button"
                className="flex items-center justify-center rounded-md bg-[#303339] p-2 text-[14px] text-[#728796] transition hover:bg-neutral-900/90"
              >
                <ChevronDown className="mr-2 h-5 w-5" />
                Лексикон
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[216px] border-none bg-[#303339] text-[#728796]"
              align="center"
              alignOffset={8}
              forceMount
            >
              <DropdownMenuItem className="cursor-pointer focus:bg-[#303339] focus:text-neutral-200">
                Наука
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-[#303339] focus:text-neutral-200">
                Спорт
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-[#303339] focus:text-neutral-200">
                Литература
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="bg-[#303339] text-[#728796]">
            Сброс фильтров
          </Button>
        </div>
        <div className="flex w-[188px] flex-col gap-[12px] rounded-r-md bg-[#212328] px-[10px] py-[12px]">
          {isLoading && (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="animate-spin text-[#728796]" />
            </div>
          )}
          {error && (
            <div className="flex h-full items-center justify-center px-2">
              <span className="text-center text-sm text-[#728796]">
                Не удалось загрузить список жестов
              </span>
            </div>
          )}
          {gestures && (
            <>
              {gestures.slice(startIndex, endIndex).map((post) => (
                <a key={post.id} href={String(post.id)}>
                  <div className="flex flex-col gap-[4px]">
                    <p className="truncate text-[11px] leading-[13px] text-[#C1E1FF] transition hover:opacity-75">
                      {post.name}
                    </p>
                    <img
                      className="h-[96px]"
                      src="/src/assets/video.jpg"
                      alt="Жест"
                    />
                  </div>
                </a>
              ))}
              <div className="mb-[1px] mt-auto flex items-center justify-between px-[6px]">
                <button
                  onClick={slideBack}
                  className="transition hover:opacity-75"
                >
                  <ChevronLeft className={`h-[18px] w-[18px] text-[${colorLeft}]`} />
                </button>
                <div className="text-[13px] text-[#7a7a7a]">
                  {startIndex + 1}-{endIndex} из {gesturesCount}
                </div>
                <button
                  onClick={slideForward}
                  className="transition hover:opacity-75"
                >
                  <ChevronRight className={`text-[${colorRight}] h-[18px] w-[18px] `}/>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
