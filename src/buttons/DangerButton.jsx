import Button from "./Button";

export default function DangerButton({children,className="",...props}){
	return(
		<Button
			className={`text-white border-red-600 hover:border-red-900 bg-red-600 hover:bg-red-800 focus:ring-green-400 dark:focus:ring-yellow-400 ${className}`}
			spinnerColor="text-white"
			{...props}
		>
			{children}
		</Button>
	);
}