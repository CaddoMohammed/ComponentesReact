import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";
import Skeleton from "../skeleton";

const BASE_SKELETON_CARD = "relative bg-white dark:bg-gray-900 border text-gray-900 dark:text-gray-100 rounded-2xl overflow-hidden";
const VARIANT_CLASSES = {
	"default":"border-gray-200 dark:border-gray-800 shadow-xs",
	"bordered":"border-gray-300 dark:border-gray-700 shadow-none",
	"elevated":"border-gray-100 dark:border-gray-800 shadow-lg",
	"flat":"border-transparent bg-gray-50/70 dark:bg-gray-800/40 shadow-none"
};

const CardSkeleton = memo(function CardSkeleton({
	variant = "default",
	hasImage = true,
	imagePosition = "top",
	imageHeight = "h-48",
	hasHeader = true,
	hasFooter = true,
	lines = 3,
	className = "",
	ref,
	...props
}){
	const variantClass = VARIANT_CLASSES[variant]||VARIANT_CLASSES["default"];
	const finalClassName = useMemo(() => {
		const base = `${BASE_SKELETON_CARD} ${variantClass}`;
		return className?mergeClasses(base,className):base;
	},[variantClass,className]);
	const positionClass = useMemo(() => {
		if(imagePosition==="top"){
			return "rounded-t-2xl";
		}
		if(imagePosition==="bottom"){
			return hasFooter?"":"rounded-b-2xl";
		}
		return "";
	},[imagePosition,hasFooter]);
	const imagePlaceholder = (
		<Skeleton
			variant="rectangular"
			className={`w-full flex items-center justify-center text-gray-400 dark:text-gray-600 ${imageHeight} ${positionClass}`}
		>
			<svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
			</svg>
		</Skeleton>
	);
	return(
		<div
			ref={ref}
			className={finalClassName}
			aria-busy="true"
			aria-label="Cargando tarjeta..."
			{...props}
		>
			{hasImage&&(imagePosition==="top")&&imagePlaceholder}
			{hasHeader&&(
				<div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4" aria-hidden="true">
					<div className="space-y-2 w-3/4">
						<Skeleton variant="text" className="h-4 w-3/5"/>
						<Skeleton variant="text" className="h-3 w-4/5 !bg-gray-100 dark:!bg-gray-800"/>
					</div>
					<Skeleton variant="circular" className="h-6 w-16 !rounded-full"/>
				</div>
			)}
			{hasImage&&(imagePosition==="middle")&&imagePlaceholder}
			<div className="px-6 py-4 space-y-2.5" aria-hidden="true">
				{Array.from({"length":lines}).map((_,idx) => {
					const widthClass = (idx===0)?"w-full":(idx===(lines-1))?"w-2/3":"w-5/6";
					return(
						<Skeleton key={idx} variant="text" className={`h-3 ${widthClass}`}/>
					);
				})}
			</div>
			{hasImage&&(imagePosition==="bottom")&&imagePlaceholder}
			{hasFooter&&(
				<div className="px-6 py-4 bg-gray-50/75 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4" aria-hidden="true">
					<Skeleton variant="text" className="h-3 w-24" />
					<Skeleton variant="rounded" className="h-8 w-20 rounded-lg" />
				</div>
			)}
		</div>
	);
});

export default CardSkeleton;