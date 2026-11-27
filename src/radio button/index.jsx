import {memo,useId,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const CONTAINER_BASE_CLASS = "relative flex items-center group";
const INPUT_BASE_CLASS = "peer appearance-none h-4 w-4 border rounded-full transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50";
const INPUT_CHECKED_CLASS = "bg-white border-cyan-500 dark:bg-gray-800 dark:border-cyan-400";
const INPUT_UNCHECKED_CLASS = "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 hover:border-cyan-400 dark:hover:border-cyan-500";
const DOT_BASE_CLASS = "absolute h-2 w-2 rounded-full bg-cyan-500 dark:bg-cyan-400 pointer-events-none transition-all duration-200 ease-out transform";
const LABEL_BASE_CLASS = "ms-2 text-sm font-medium select-none transition-colors duration-200";

const RadioButton = memo(function RadioButton({
	id,
	name,
	value,
	checked = false,
	onChange,
	label,
	disabled = false,
	required = false,
	className = "",
	ref,
	...props
}){
	const generatedId = useId();
	const fieldId = id||generatedId;
	const containerClassName = useMemo(() => (className?mergeClasses(CONTAINER_BASE_CLASS,className):CONTAINER_BASE_CLASS),[className]);
	const inputClassName = `${INPUT_BASE_CLASS} ${checked?INPUT_CHECKED_CLASS:INPUT_UNCHECKED_CLASS} ${disabled?"cursor-not-allowed":"cursor-pointer"}`;
	const dotClassName = `${DOT_BASE_CLASS} ${checked?"opacity-100 scale-100":"opacity-0 scale-0"}`;
	const labelClassName = `${LABEL_BASE_CLASS} ${disabled?"text-gray-400 dark:text-gray-500 cursor-not-allowed":"text-gray-700 dark:text-gray-300 cursor-pointer group-hover:text-cyan-600 dark:group-hover:text-cyan-400"}`;
	return(
		<div className={containerClassName}>
			<div className="relative flex items-center justify-center h-4 w-4 shrink-0">
				<input
					ref={ref}
					id={fieldId}
					type="radio"
					value={value}
					name={name}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					required={required}
					className={inputClassName}
					{...props}
				/>
				<span aria-hidden="true" className={dotClassName}/>
			</div>
			{label&&(
				<label htmlFor={fieldId} className={labelClassName}>
					{label}
				</label>
			)}
		</div>
	);
});

RadioButton["displayName"] = "RadioButton";

export {RadioButton};
export default RadioButton;