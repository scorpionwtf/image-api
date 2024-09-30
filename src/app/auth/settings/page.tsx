import { auth } from "@/auth";
import UserSettingsForm from "@/components/auth/user-settings-form";
import { Navbar } from "@/components/site/navbar";
import { prisma } from "@/lib/db";
import { $Enums } from "@prisma/client";


export default async function Settings() {
	const session = await auth();
	const user = await prisma.user.findUnique({
        where: { id: session?.user.id },
      });
	const isProUser = user?.plan === $Enums.UserPlan.PRO;
	return (		
					<>
						<Navbar/>
						<UserSettingsForm user={session?.user} isProUser={isProUser}/>
					</>

	);
}
