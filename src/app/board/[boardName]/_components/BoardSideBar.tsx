"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import arrow from "public/arrow.svg";
import { useState } from "react";
import { Boards } from "~/app/types";
import { api } from "~/trpc/react";

type BoardNavProps = {
    boardName: string;
};

export default function BoardSideBar({ boardName }: BoardNavProps) {
    const [sideBarViewToggle, setSideBarViewToggle] = useState(true);
    const boards: Boards[] = api.board.getAllBoards.useQuery().data;

    return (
        <div
            className={`pt-3 min-h-screen ${
                sideBarViewToggle ? "min-w-64 w-64" : "min-w-8 w-8 delay-150"
            } transition-all duration-500 relative`}
        >
            <Image
                className={`ml-auto cursor-pointer rounded ${
                    !sideBarViewToggle &&
                    "-mr-2 bg-black rounded-full rotate-180"
                } transition-all duration-300 hover:bg-white/[0.3]`}
                src={arrow as StaticImport}
                width={28}
                height={28}
                alt="sidebar control arrow"
                onClick={() => setSideBarViewToggle((prev) => !prev)}
            />
            <div
                className={`flex flex-col transition-all duration-500 ${
                    sideBarViewToggle
                        ? "translate-x-0 delay-150"
                        : "-translate-x-72"
                }`}
            >
                <h4 className="mb-2 px-4 text-sm font-bold">Your boards</h4>
                {boards?.map((board, index) => (
                    <Link
                        key={index}
                        href={`/board/${board.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                        className={`flex gap-2 px-4 py-2 text-sm ${
                            board.name.toLowerCase() === boardName
                                ? "bg-zinc-600"
                                : ""
                        } hover:bg-zinc-700`}
                    >
                        <span
                            className={`w-6 h-5 ${board.color} rounded-sm`}
                        ></span>
                        {board.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}
