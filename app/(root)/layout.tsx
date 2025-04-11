import React, {ReactNode} from 'react'
import Link from "next/link";
import Image from "next/image";
import {isAuthenticated, getCurrentUser} from "@/lib/actions/auth.action";
import {redirect} from "next/navigation";
import UserMenu from "@/components/UserMenu";
import { Analytics } from "@vercel/analytics/react";

const RootLayout = async ({children}: {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) redirect('/sign-in');

    // Get user data for the UserMenu
    const user = await getCurrentUser();

    return (
        <div className={"root-layout"}>
            <nav className="flex justify-between items-center">
                <Link href={"/"} className={"flex items-center gap-2"}>
                    <Image src={"/logo.svg"} alt={"logo"} width={38} height={32} />
                    <h2 className={"text-primary-100"}>PrepWise</h2>
                </Link>

                {/* Add UserMenu component here */}
                {user && <UserMenu user={user} />}
            </nav>

            {children}
            <Analytics />
        </div>
    )
}
export default RootLayout