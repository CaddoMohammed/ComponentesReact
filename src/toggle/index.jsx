import {memo,useCallback,useId,useMemo} from "react";
import {mergeClasses} from "../utils/classMerger";

const CONTAINER_BASE_CLASS = "flex items-center";
const SWITCH_BASE_CLASS = "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
const THUMB_BASE_CLASS = "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out";
const LABEL_BASE_CLASS = "text-sm font-medium select-none mx-2";

const Toggle = memo(function Toggle({
	id,
	checked = false,
	onChange,
	label,
	disabled = false,
	className = "",
	ref,
	...props
}){
	const generatedId = useId();
	const switchId = id||generatedId;
	const handleToggle = useCallback(() => {
		if(disabled||!onChange){
			return;
		}
		onChange(!checked);
	},[disabled,onChange,checked]);
	const containerClassName = useMemo(() => (className?mergeClasses(CONTAINER_BASE_CLASS,className):CONTAINER_BASE_CLASS),[className]);
	const switchClassName = `${SWITCH_BASE_CLASS} ${checked?"bg-cyan-500 dark:bg-cyan-600":"bg-gray-300 dark:bg-gray-600"} ${disabled?"opacity-50 cursor-not-allowed":"cursor-pointer"}`;
	const thumbClassName = `${THUMB_BASE_CLASS} ${checked?"translate-x-5":"translate-x-0"}`;
	const labelClassName = `${LABEL_BASE_CLASS} ${disabled?"text-gray-400 dark:text-gray-500 cursor-not-allowed":"text-gray-700 dark:text-gray-300 cursor-pointer"}`;
	return(
		<div className={containerClassName}>
			<button
				ref={ref}
				id={switchId}
				type="button"
				role="switch"
				aria-checked={checked}
				disabled={disabled}
				onClick={handleToggle}
				className={switchClassName}
				{...props}
			>
				<span aria-hidden="true" className={thumbClassName} />
			</button>
			{label&&(
				<label htmlFor={switchId} className={labelClassName}>
					{label}
				</label>
			)}
		</div>
	);
});

Toggle["displayName"] = "Toggle";

export {Toggle};
export default Toggle;