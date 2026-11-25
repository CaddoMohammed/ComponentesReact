import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const STANDARD_BASE_CLASS = "block text-sm font-medium mb-2 select-none";
const FLOATING_BASE_CLASS = "absolute duration-300 transform px-2 z-10 origin-[0] start-1 max-w-[calc(100%-1rem)] overflow-hidden text-ellipsis whitespace-nowrap select-none pointer-events-none";

function getStandardTextColor(error,disabled){
	if(error){
		return "text-red-500 dark:text-red-400";
	}
	if(disabled){
		return "text-gray-400 dark:text-gray-500";
	}
	return "text-gray-700 dark:text-gray-300";
}
function getFloatingTextColor({disabled,isActive,error,isFocused }){
	if(disabled&&!isActive){
		return "text-gray-400 dark:text-gray-400";
	}
	if(error){
		return "text-red-500 dark:text-red-400";
	}
	if(isFocused){
		return "text-cyan-500 dark:text-cyan-400";
	}
	if(disabled){
		return "text-gray-400 dark:text-gray-400";
	}
	return "text-gray-500 dark:text-gray-400";
}
const Label = memo(function Label({
	children,
	htmlFor,
	floating = false,
	isActive = false,
	isFocused = false,
	error = false,
	disabled = false,
	required = false,
	bgColor = "bg-white dark:bg-gray-900",
	className = "",
	ref,
	...props
}){
	const finalClassName = useMemo(() => {
		if(floating){
			const position = isActive?"top-0 -translate-y-1/2 scale-75":"top-1/2 -translate-y-1/2 scale-100";
			const background = disabled?"bg-gray-100 dark:bg-gray-700":bgColor;
			const textColor = getFloatingTextColor({disabled,isActive,error,isFocused});
			const base = `${FLOATING_BASE_CLASS} ${background} ${position} ${textColor}`;
			return className?mergeClasses(base,className):base;
		}
		const textColor = getStandardTextColor(error,disabled);
		const base = `${STANDARD_BASE_CLASS} ${textColor}`;
		return className?mergeClasses(base,className):base;
	},[floating,isActive,isFocused,error,disabled,bgColor,className]);
	return(
		<label ref={ref} htmlFor={htmlFor} className={finalClassName} {...props}>
			{children}
			{required&&(
				<span className="ml-1" aria-hidden="true">
					*
				</span>
			)}
		</label>
	);
});

Label["displayName"] = "Label";

export {Label};
export default Label;