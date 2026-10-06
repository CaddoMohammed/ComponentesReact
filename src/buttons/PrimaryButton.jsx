import {memo} from "react";
import Button from "./Button";

const PrimaryButton = memo(function PrimaryButton({children,className="",...props}){
	return(
		<Button
			className={`text-white border-cyan-500 bg-cyan-500 hover:bg-cyan-700 focus:ring-pink-500 dark:focus:ring-pink-500 ${className}`}
			{...props}
		>
			{children}
		</Button>
	)
});

export default PrimaryButton;