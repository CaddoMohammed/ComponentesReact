import {memo,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const DEFAULT_TITLE_CLASS = "text-lg font-bold text-gray-900 dark:text-white leading-tight";

const CardTitle = memo(function CardTitle({
	as:Component = "h3",
	children,
	className = "",
	ref,
	...props
}){
	const finalClassName = useMemo(() => (className?mergeClasses(DEFAULT_TITLE_CLASS,className):DEFAULT_TITLE_CLASS),[className]);
	return(
		<Component ref={ref} className={finalClassName} {...props}>
			{children}
		</Component>
	);
});

CardTitle["displayName"] = "CardTitle";

export default CardTitle;