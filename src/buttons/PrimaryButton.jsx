import Button from "./Button";

export default function PrimaryButton({children,className="",...props}){
	return(
		<Button
			className={`text-white border-cyan-500 bg-cyan-500 hover:bg-cyan-700 focus:ring-cyan-200`}
			{...props}
		>
			{children}
		</Button>
	)
}