import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccess(false);
		
		try {
			await forgotPassword(email);
			setSuccess(true);
			setIsSubmitted(true);
			toast.success("Password reset email sent successfully!");
		} catch (error) {
			setError(error.response?.data?.message || "Failed to send reset email. Please try again.");
			toast.error(error.response?.data?.message || "Failed to send reset email. Please try again.");
			setIsSubmitted(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#ec9569] to-[#EA6601] text-transparent bg-clip-text'>
					Forgot Password
				</h2>

				{!isSubmitted ? (
					<form onSubmit={handleSubmit}>
						<p className='text-gray-300 mb-6 text-center'>
							Enter your email address and we'll send you a link to reset your password.
						</p>
						
						{error && (
							<motion.div
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-lg flex items-center space-x-2"
							>
								<AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
								<p className="text-red-400 text-sm">{error}</p>
							</motion.div>
						)}
						
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={isLoading}
						/>
						<motion.button
							whileHover={{ scale: isLoading ? 1 : 1.02 }}
							whileTap={{ scale: isLoading ? 1 : 0.98 }}
							disabled={isLoading}
							className='w-full py-3 px-4 bg-gradient-to-r from-[#f38650] to-[#EA6601] text-white font-bold rounded-lg shadow-lg hover:from-[#EA6601] hover:to-[#d97a42] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed'
							type='submit'
						>
							{isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
						</motion.button>
					</form>
				) : success ? (
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<CheckCircle className='h-8 w-8 text-white' />
						</motion.div>
						<h3 className='text-xl font-semibold text-white mb-2'>Email Sent Successfully!</h3>
						<p className='text-gray-300 mb-6'>
							We've sent a password reset link to <span className='text-white font-medium'>{email}</span>. 
							Please check your inbox and follow the instructions to reset your password.
						</p>
						<p className='text-gray-400 text-sm'>
							The reset link will expire in 1 hour for security reasons.
						</p>
					</div>
				) : (
					<div className='text-center'>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ type: "spring", stiffness: 500, damping: 30 }}
							className='w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4'
						>
							<AlertCircle className='h-8 w-8 text-white' />
						</motion.div>
						<h3 className='text-xl font-semibold text-white mb-2'>Something went wrong</h3>
						<p className='text-gray-300 mb-6'>
							{error || "Please try again or contact support if the problem persists."}
						</p>
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							onClick={() => {
								setIsSubmitted(false);
								setError(null);
								setSuccess(false);
								setEmail("");
							}}
							className='px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
						>
							Try Again
						</motion.button>
					</div>
				)}
			</div>

			<div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<Link to={"/login"} className='text-sm text-[#EA6601] hover:underline flex items-center'>
					<ArrowLeft className='h-4 w-4 mr-2' /> Back to Login
				</Link>
			</div>
		</motion.div>
		</div>
	);
};
export default ForgotPasswordPage;