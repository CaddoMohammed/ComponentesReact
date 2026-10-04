import Button from "./Button";

export default function SecondaryButton({children,className="",...props}){
	return(
		<Button
			className={`border border-gray-300 bg-white text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 ${className}`}
			spinnerColor="text-gray-700 dark:text-gray-200"
			{...props}
		>
			{children}
		</Button>
	);
}