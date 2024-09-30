"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, LogOut } from "lucide-react";
import type { User } from "next-auth";
import Link from "next/link";
import { LineMdCogLoop } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";
import { signIn } from "next-auth/react";

type Props = {
	user?: User;
};

const LoginBadge2 = ({ user }: Props) => {
	return (
		<>
			{user && (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar className="size-[45px]">
							<AvatarImage src={user?.image || ""} />
							<AvatarFallback className="bg-slate-300">
								<CircleUser className="h-8 w-8" />
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href="/auth/settings" className="flex flex-1 justify-start items-center">
								<LineMdCogLoop className="mr-2" />
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<LogoutButton>
							<DropdownMenuItem className="p-0 m-0">
								<Button variant={"ghost"} className="flex flex-1 justify-around">
									<LogOut /> Sign out
								</Button>
							</DropdownMenuItem>
						</LogoutButton>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
			{!user && (
				
					<button className='h-fit text-black-400 transition-all text-lg font-semibold hover:text-blue-700'
                    onClick={async () => {
                        signIn();
                    }}>
                        Login
                    </button>
                    
                    
				
			)}
		</>
	);
};

export default LoginBadge2;
