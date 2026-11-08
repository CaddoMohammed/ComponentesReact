import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const DEFAULT_CONTENT_CLASS = "px-6 py-4 text-gray-700 dark:text-gray-300";

const CardContent = memo(function CardContent({
	children,
	className = "",
	ref,
	...props
}){
	const finalClassName = useMemo(() => (className?mergeClasses(DEFAULT_CONTENT_CLASS,className):DEFAULT_CONTENT_CLASS),[className]);
	return(
		<div ref={ref} className={finalClassName} {...props}>
			{children}
		</div>
	);
});

CardContent["displayName"] = "CardContent";

export default CardContent;