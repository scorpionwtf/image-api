"use client";

import { changeSettings } from "@/actions/auth/settings";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserSettingsSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, ShieldAlert } from "lucide-react";
import type { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import AuthFormMessage from "./auth-form-message";

interface Props {
	user?: User;
	isProUser: any
}
export default function UserSettingsForm({ user, isProUser }: Props) {
	const { update } = useSession();
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");
	const form = useForm<z.infer<typeof UserSettingsSchema>>({
		resolver: zodResolver(UserSettingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			email: user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			//@ts-ignore
			isTwoFactorAuthEnabled: !!user?.isTwoFactorEnabled,
		},
	});

	const userImage = user?.image

	const onSubmit = async (values: z.infer<typeof UserSettingsSchema>) => {
		startTransition(async () => {
			try {
				const resp = await changeSettings(values);
				const { success, error } = resp;
				if (!resp) {
					setError("Resposta inválida do servidor");
					setSuccess("");
					form.reset();
					return;
				}

				if (error) {
					setError(error);
					setSuccess("");
					return;
				}
				if (success) {
					setSuccess(success);
					setError("");
					update();
					return;
				}
			} catch (error) {
				setSuccess("");
				setError("Algo deu errado.");
				form.reset();
			}
		});
	};
	
	return (
		<div className="flex flex-row gap-x-2 w-full justify-center justify-items-center md:pl-40 px-5 py-10">
			<div className="w-3/5 self-center justify-center">
				<Card x-chunk="dashboard-04-chunk-1">
					<CardHeader>
						<CardTitle>User information</CardTitle>
						<CardDescription>Your information</CardDescription>
					</CardHeader>
					
					<CardContent>
						<div className="space-y-4">
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<div className="space-y-4">
									{userImage ? <img className="rounded-full size-16" src={userImage}></img>: <img className="rounded-full size-10" src="/images/defaultuser.webp"></img>}
										<FormField
											control={form.control}
											name="name"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Name</FormLabel>
													<FormControl>
														<Input
															autoComplete="off"
															type="name"
															placeholder="Jose da Silva"
															{...field}
															disabled={isPending}
														/>
													</FormControl>
													<FormDescription className="hidden">Your name.</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>E-mail</FormLabel>
													<FormControl>
														<Input type="email" placeholder="yourmail@example.com" {...field} disabled />
													</FormControl>
													<FormDescription className="hidden">Your e-mail.</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Password</FormLabel>
													<FormControl>
														<Input type="password" placeholder="******" {...field} disabled={isPending} />
													</FormControl>
													<FormDescription className="hidden">Your e-mail.</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="newPassword"
											render={({ field }) => (
												<FormItem>
													<FormLabel>New Password</FormLabel>
													<FormControl>
														<Input type="password" placeholder="******" {...field} disabled={isPending} />
													</FormControl>
													<FormDescription className="hidden">Your e-mail.</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										{/* <FormField
											control={form.control}
											name="isTwoFactorAuthEnabled"
											render={({ field }) => (
												<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 m-2 space-x-2">
													<ShieldAlert className="text-yellow-400" />
													<FormLabel className="flex-1 space-y-1">
														<p className="text-sm font-medium leading-none">2 Factro Authentication</p>
														<p className="text-sm text-muted-foreground">Make your account safer</p>
													</FormLabel>
													<FormControl>
														<Switch checked={field.value} onCheckedChange={field.onChange} />
													</FormControl>
												</FormItem>
											)}
										/> */}

										{error && <AuthFormMessage type="error" message={error} title="Erro" />}
										{success && <AuthFormMessage type="success" message={success} title="Sucesso" />}
										<Separator />
										<div className="w-full flex justify-end items-center">
											<Button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" variant={"default"} disabled={isPending}>
												<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
												<span>Save</span>
											</Button>
										</div>
									</div>
								</form>
							</Form>


						</div>
					<div className="flex flex-col lg:w-1/6 md:w-2/5 sm:w-2/6 bg-gradient-to-bl p-5 from-white to-slate-200 rounded-xl mt-5 shadow-lg">
						<div className="text-black/70 text-xl font-semibold">
							Current Plan:
						</div>
						{isProUser ? 
						<div className="text-purple-500 shadow-purple-600 font-bold text-xl">
							Pro
						</div>
						: <div className="text-lg font-bold text-green-600">Free</div>
						}

					</div>
					</CardContent>
				</Card>
				
				</div>
			
		</div>
	);
}
