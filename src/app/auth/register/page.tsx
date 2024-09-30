import RegisterForm from "@/components/auth/register-form";
import Footer  from "@/components/site/Footer";

const Login = async () => {
	return (
		<div className="pt-5 bg-gradient-to-br from-white to-slate-400 min-w-full h-full">
			<div className="px-3 w-full h-full items-center justify-center mb-52">
				<RegisterForm />
			</div>	
			<Footer />
		</div>
	);
};

export default Login;
