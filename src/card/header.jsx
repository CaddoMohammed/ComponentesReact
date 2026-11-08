import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const DEFAULT_HEADER_CLASS = "px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4";

const CardHeader = memo(function CardHeader({
	children,
	className = "",
	ref,
	...props
}){
	const finalClassName = useMemo(() => (className?mergeClasses(DEFAULT_HEADER_CLASS,className):DEFAULT_HEADER_CLASS),[className]);
	return(
		<div ref={ref} className={finalClassName} {...props}>
			{children}
		</div>
	);
});

CardHeader["displayName"] = "CardHeader";

export default CardHeader;