import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";
import Skeleton from "../skeleton";

const DEFAULT_IMAGE_CLASS = "w-full object-cover";

const CardImage = memo(function CardImage({
	src,
	alt = "",
	className = "",
	position = "top",
	hasFooter = false,
	isLoading = false,
	loading = "lazy",
	decoding = "async",
	ref,
	...props
}){
	const positionClass = useMemo(() => {
		if(position==="top"){
			return "rounded-t-2xl";
		}
		if(position==="bottom"){
			return hasFooter?"":"rounded-b-2xl";
		}
		return "";
	},[position,hasFooter]);
	const finalClassName = useMemo(() => {
		const baseWithPos = positionClass?`${DEFAULT_IMAGE_CLASS} ${positionClass}`:DEFAULT_IMAGE_CLASS;
		return className?mergeClasses(baseWithPos,className):baseWithPos;
	},[positionClass,className]);
	const skeletonClassName = useMemo(() => {
		const baseSkeleton = positionClass?`w-full flex items-center justify-center min-h-[160px] text-gray-400 dark:text-gray-600 ${positionClass}`:"w-full flex items-center justify-center min-h-[160px] text-gray-400 dark:text-gray-600";
		return className?mergeClasses(baseSkeleton,className):baseSkeleton;
	},[positionClass,className]);
	if(isLoading){
		return(
			<Skeleton
				ref={ref}
				variant="rectangular"
				className={skeletonClassName}
				aria-busy="true"
				aria-label="Cargando imagen..."
			>
				<svg className="w-10 h-10 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
				</svg>
			</Skeleton>
		);
	}
	return(
		<img
			ref={ref}
			src={src}
			alt={alt}
			loading={loading}
			decoding={decoding}
			className={finalClassName}
			{...props}
		/>
	);
});

CardImage["displayName"] = "CardImage";

export default CardImage;