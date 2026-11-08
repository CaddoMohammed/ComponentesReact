import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const BASE_SKELETON_CLASS = "bg-gray-200 dark:bg-gray-800";
const VARIANT_CLASSES = {
	"text":"h-4 rounded-md w-full",
	"circular":"rounded-full shrink-0",
	"rectangular":"rounded-none",
	"rounded":"rounded-xl"
};
const ANIMATION_CLASSES = {
	"pulse":"animate-pulse",
	"none":""
};

const Skeleton = memo(function Skeleton({
	variant = "text",
	animation = "pulse",
	width,
	height,
	className = "",
	style,
	ref,
	children,
	...props
}){
	const variantClass = VARIANT_CLASSES[variant]||VARIANT_CLASSES["text"];
	const animationClass = ANIMATION_CLASSES[animation]??ANIMATION_CLASSES["pulse"];
	const inlineStyle = useMemo(() => {
		const res = {...style};
		if(width!==undefined){
			res["width"] = (typeof width==="number")?`${width}px`:width;
		}
		if(height!==undefined){
			res["height"] = (typeof height==="number")?`${height}px`:height;
		}
		return (Object.keys(res).length>0)?res:undefined;
	},[width,height,style]);
	const finalClassName = useMemo(() => {
		const base = `${BASE_SKELETON_CLASS} ${variantClass} ${animationClass}`.trim();
		return className?mergeClasses(base,className):base;
	},[variantClass,animationClass,className]);
	return(
		<div
			ref={ref}
			className={finalClassName}
			style={inlineStyle}
			aria-busy="true"
			aria-hidden="true"
			{...props}
		>
			{children}
		</div>
	);
});

Skeleton["displayName"] = "Skeleton";

export {Skeleton};
export default Skeleton;