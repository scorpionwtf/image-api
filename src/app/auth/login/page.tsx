import LoginForm from "@/components/auth/login-form";
import Footer  from "@/components/site/Footer";

const Login = async () => {
	return (
		<div className=" pt-14 bg-gradient-to-r from-slate-100/10 to-yellow-300  min-w-full h-full">
			<div className="px-3 w-full h-full items-center justify-center mb-48">
				<LoginForm />
			</div>
			<Footer />
		</div>
	);
};

export default Login;
