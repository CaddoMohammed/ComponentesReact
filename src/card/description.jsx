import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const DEFAULT_DESCRIPTION_CLASS = "text-sm text-gray-500 dark:text-gray-400 mt-1";

const CardDescription = memo(function CardDescription({
	children,
	className = "",
	ref,
	...props
}){
	const finalClassName = useMemo(() => (className?mergeClasses(DEFAULT_DESCRIPTION_CLASS,className):DEFAULT_DESCRIPTION_CLASS),[className]);
	return(
		<p ref={ref} className={finalClassName} {...props}>
			{children}
		</p>
	);
});

CardDescription["displayName"] = "CardDescription";

export default CardDescription;