import Button from "./Button";

export default function SecondaryButton({children,className="",...props}){
	return(
		<Button
			className={`border-gray-400 bg-white text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 focus:ring-blue-500 dark:focus:ring-gray-400 ${className}`}
			spinnerColor="text-gray-700 dark:text-gray-200"
			{...props}
		>
			{children}
		</Button>
	);
}