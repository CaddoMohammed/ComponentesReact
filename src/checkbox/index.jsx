import {memo,useId,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const CONTAINER_BASE_CLASS = "relative flex items-center group";
const INPUT_BASE_CLASS = "peer appearance-none h-5 w-5 border-2 rounded-md transition-all duration-300 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50";
const INPUT_CHECKED_CLASS = "bg-cyan-500 border-cyan-500 dark:bg-cyan-600 dark:border-cyan-600 shadow-md shadow-cyan-500/20";
const INPUT_UNCHECKED_CLASS = "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500";
const ICON_BASE_CLASS = "absolute h-3.5 w-3.5 text-white pointer-events-none transition-all duration-300 ease-out transform";
const LABEL_BASE_CLASS = "ml-3 text-sm font-medium select-none transition-colors duration-200";

const Checkbox = memo(function Checkbox({
	id,
	name,
	checked = false,
	onChange,
	label,
	disabled = false,
	className = "",
	ref,
	...props
}){
	const generatedId = useId();
	const inputId = id||generatedId;
	const containerClassName = useMemo(() => (className?mergeClasses(CONTAINER_BASE_CLASS,className):CONTAINER_BASE_CLASS),[className]);
	const inputClassName = `${INPUT_BASE_CLASS} ${checked?INPUT_CHECKED_CLASS:INPUT_UNCHECKED_CLASS}`;
	const iconClassName = `${ICON_BASE_CLASS} ${checked?"opacity-100 scale-100 rotate-0":"opacity-0 scale-50 -rotate-90"}`;
	const labelClassName = `${LABEL_BASE_CLASS} ${disabled?"text-gray-400 dark:text-gray-500 cursor-not-allowed":"text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-cyan-600 dark:group-hover:text-cyan-400"}`;
	return(
		<div className={containerClassName}>
			<div className="relative flex items-center justify-center h-5 w-5 shrink-0">
				<input
					ref={ref}
					id={inputId}
					type="checkbox"
					name={name}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					className={inputClassName}
					{...props}
				/>
				<svg aria-hidden="true" className={iconClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
					<polyline points="20 6 9 17 4 12"/>
				</svg>
			</div>
			{label&&(
				<label htmlFor={inputId} className={labelClassName}>
					{label}
				</label>
			)}
		</div>
	);
});

Checkbox["displayName"] = "Checkbox";

export {Checkbox};
export default Checkbox;