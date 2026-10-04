import Button from "./Button";

export default function PrimaryButton({children,...props}){
	return <Button {...props}>{children}</Button>;
}