"use client";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import { Menu, User2 } from "lucide-react";
import SideBarLinks from "../common/SideBarLinks";
import { useTheme } from "next-themes";

export default function MobileNavBar() {
    const { theme } = useTheme()

    return (
<nav className="md:hidden  sticky top-0 z-50  py-2 px-3 flex justify-between items-center" style={{
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)', // For WebKit browsers like Chrome and Safari
}}>
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger>
                        <Menu height={30} width={30} className="text-primary font-bold" />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="flex justify-start items-center">
                                    <Image
                                        src="/images/logo.png"
                                        className={`${theme && theme === 'dark' ? 'invert rounded-lg' : 'rounded-lg'}`}
                                        width={50}
                                        height={50}
                                        alt="logo"
                                    />
                                    <h1 className="font-bold text-primary text-xl ml-2">LiveLens</h1>
                                </div>
                            </SheetTitle>
                            <SheetDescription>
                                <SideBarLinks />
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <div>
                <Image src="/images/logo.png"    className={`${ theme && theme === 'dark' ? 'invert rounded-lg' : 'rounded-lg'}`} width={30} height={30} alt="Logo" />
            </div>
            <Link href="/profile">
                <User2 height={25} width={25} className="text-primary font-bold" />
            </Link>
        </nav>
    );
}