"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";

import { resetPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetPasswordSchema } from "@/schemas/auth";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import AuthCard from "./auth-card";
import AuthFormMessage from "./auth-form-message";

export const ResetPasswordForm = () => {
	const [error, setError] = useState<string | undefined>("");
	const [success, setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransition(async () => {
			try {
				const { success, error } = await resetPassword(values);
				if (error) setError(error);
				setSuccess(success || "");
				form.reset();
			} catch (err) {
				setSuccess("");
				setError("Algo deu errado.");
				form.reset();
			}
		});
	};

	return (
		<AuthCard title="Mudança de Senha" description="Digite o e-mail cadastrado">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} disabled={isPending} placeholder="yourmail@example.com" type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					{error && <AuthFormMessage type="error" message={error} title="Erro" />}
					{success && <AuthFormMessage type="success" message={success} title="Sucesso" />}

					<Button variant={"default"} className="w-full" disabled={isPending}>
						<LoaderIcon className={!isPending ? "hidden" : "animate-spin mr-2"} />
						<span>Send e-mail</span>
					</Button>
				</form>
			</Form>
			<div className="mt-4 text-center text-sm">
				Yould you like to connect?{" "}
				<Link href="/auth/login" className="underline">
					Connect now
				</Link>
			</div>
		</AuthCard>
	);
};
