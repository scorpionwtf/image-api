import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthCardProps {
	title?: string;
	description?: string;
	children: React.ReactNode;
}

const AuthCard = ({ title, description, children }: AuthCardProps) => {
	return (
		<Card className=" overflow-x-clip mx-auto max-w-sm md:min-w-[350px] -mt-20 items-center md:mt-20 bg-gradient-to-t from-slate-900/20 from-10% to-slate rounded-3xl shadow-2xl">
			<CardHeader>
				{title && <CardTitle className="text-3xl">{title}</CardTitle>}
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};

export default AuthCard;
