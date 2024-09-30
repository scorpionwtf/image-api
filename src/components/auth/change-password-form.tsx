"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { changePassword, resetPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordSchema } from "@/schemas/auth";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";

export const ChangePasswordForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();
	const searchParam = useSearchParams();
	const token = searchParam.get("token");

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransition(async () => {
			try {
				const { success, error } = await changePassword(values, token);
				if (error) setError(error);
				setSuccess(success || "");
				form.reset();
			} catch (err) {
				setSuccess("");
				setError("Something went wrong.");
				form.reset();
			}
		});
	};

	return (
		<AuthCard title="Modifique sua senha" description="Escolha uma nova senha">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="******" type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{error && <AuthFormMessage type="error" message={error} title="Error" />}
					{success && <AuthFormMessage type="success" message={success} title="Success" />}

					<Button variant={"default"} className="w-full" disabled={isPending}>
						<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
						<span>Change Password</span>
					</Button>
				</form>
			</Form>
			<div className="mt-4 text-center text-sm">
				Would you like to connect?{" "}
				<Link href="/auth/login" className="underline">
					Connect now
				</Link>
			</div>
		</AuthCard>
	);
};
