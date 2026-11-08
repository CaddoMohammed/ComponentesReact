import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const DEFAULT_FOOTER_CLASS = "px-6 py-4 bg-gray-50/75 dark:bg-gray-800/40 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4";

const CardFooter = memo(function CardFooter({
	children,
	className = "",
	ref,
	...props
}){
	const finalClassName = useMemo(() => (className?mergeClasses(DEFAULT_FOOTER_CLASS,className):DEFAULT_FOOTER_CLASS),[className]);
	return(
		<div ref={ref} className={finalClassName} {...props}>
			{children}
		</div>
	);
});

CardFooter["displayName"] = "CardFooter";

export default CardFooter;