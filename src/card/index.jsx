import {memo,useMemo,useCallback,Children} from "react";
import {mergeClasses} from "../utils/classMerger";
import CardHeader from "./header";
import CardTitle from "./title";
import CardDescription from "./description";
import CardContent from "./content";
import CardFooter from "./footer";
import CardImage from "./image";
import CardSkeleton from "./skeleton";

const BASE_CARD_CLASS = "relative bg-white dark:bg-gray-900 border text-gray-900 dark:text-gray-100 rounded-2xl overflow-hidden transition-all duration-200";
const HOVERABLE_CLASS = "hover:-translate-y-1";
const INTERACTIVE_CLASS = "cursor-pointer hover:-translate-y-1 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-600 dark:focus-visible:ring-cyan-400 select-none";
const VARIANT_CLASSES = {
	"default":"border-gray-200 dark:border-gray-800 shadow-xs hover:shadow-md",
	"bordered":"border-gray-300 dark:border-gray-700 shadow-none",
	"elevated":"border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl",
	"flat":"border-transparent bg-gray-50/70 dark:bg-gray-800/40 shadow-none"
};
const CHILD_HANDLERS = {
	"CardImage":(child,r) => {
		r["hasImage"] = true;
		if(child["props"]?.["position"]){
			r["imagePosition"] = child["props"]["position"];
		}
	},
	"CardHeader":(_,r) => {
		r["hasHeader"] = true
	},
	"CardFooter":(_,r) => {
		r["hasFooter"] = true
	},
	"CardContent":() => {}
};

function analyzeCardChildren(children){
	const result = {"hasImage":false,"imagePosition":"top","hasHeader":false,"hasFooter":false};
	let foundAnySubcomponent = false;
	Children.forEach(children,(child) => {
		if(!child||(typeof child!=="object")){
			return;
		}
		const name = child["type"]?.["displayName"]||child["type"]?.["name"];
		const handler = CHILD_HANDLERS[name];
		if(!handler){
			return;
		}
		handler(child,result);
		foundAnySubcomponent = true;
	});
	return foundAnySubcomponent?result:{"hasImage":true,"imagePosition":"top","hasHeader":true,"hasFooter":true};
}

const Card = memo(function Card({
	children,
	className = "",
	variant = "default",
	hoverable = false,
	interactive = false,
	loading = false,
	skeleton,
	skeletonProps,
	onClick,
	onKeyDown,
	ref,
	...props
}){
	const isCardLoading = Boolean(loading);
	const variantClass = VARIANT_CLASSES[variant]||VARIANT_CLASSES["default"];
	const isClickable = interactive||Boolean(onClick);
	const detectedLayout = useMemo(() => {
		if(!isCardLoading){
			return null;
		}
		return analyzeCardChildren(children);
	},[isCardLoading,children]);
	const interactiveClasses = useMemo(() => {
		if(hoverable&&!isClickable){
			return HOVERABLE_CLASS;
		}
		if(isClickable){
			return INTERACTIVE_CLASS;
		}
		return "";
	},[hoverable,isClickable]);
	const finalClassName = useMemo(() => {
		const base = interactiveClasses?`${BASE_CARD_CLASS} ${variantClass} ${interactiveClasses}`:`${BASE_CARD_CLASS} ${variantClass}`;
		return className?mergeClasses(base,className):base;
	},[variantClass,interactiveClasses,className]);
	const handleKeyDown = useCallback(
		(e) => {
			if(isClickable&&(((e["key"]==="Enter"))||(e["key"]===" "))){
				const tag = e["target"]?.["tagName"];
				if((tag==="INPUT")||(tag==="TEXTAREA")||(tag==="SELECT")||(tag==="BUTTON")){
					return;
				}
				e.preventDefault();
				if(onClick){
					onClick(e);
				}
			}
			if(onKeyDown){
				onKeyDown(e);
			}
		},
		[isClickable,onClick,onKeyDown]
	);
	if(isCardLoading){
		if(skeleton){
			return skeleton;
		}
		return(
			<CardSkeleton
				ref={ref}
				variant={variant}
				hasImage={detectedLayout?.["hasImage"]??true}
				imagePosition={detectedLayout?.["imagePosition"]??"top"}
				hasHeader={detectedLayout?.["hasHeader"]??true}
				hasFooter={detectedLayout?.["hasFooter"]??true}
				className={className}
				{...skeletonProps}
			/>
		);
	}
	return(
		<div
			ref={ref}
			className={finalClassName}
			onClick={onClick}
			role={isClickable?"button":undefined}
			tabIndex={isClickable?0:undefined}
			onKeyDown={isClickable||onKeyDown?handleKeyDown:undefined}
			{...props}
		>
			{children}
		</div>
	);
});

Card["displayName"] = "Card";
Card["Header"] = CardHeader;
Card["Title"] = CardTitle;
Card["Description"] = CardDescription;
Card["Content"] = CardContent;
Card["Footer"] = CardFooter;
Card["Image"] = CardImage;
Card["Skeleton"] = CardSkeleton;

export {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
	CardImage,
	CardSkeleton
};

export default Card;