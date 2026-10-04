import Button from "./Button";

export default function DangerButton({children,className="",...props}){
	return(
		<Button
			className={`bg-red-600 hover:bg-red-800 dark:hover:bg-red-900 focus:ring-red-500 ${className}`}
			spinnerColor="text-white"
			{...props}
		>
			{children}
		</Button>
	);
}