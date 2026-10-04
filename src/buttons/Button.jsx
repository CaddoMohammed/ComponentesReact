import {mergeClasses} from "../utils/classMerger";

const DEFAULT_BUTTON_CLASS = "border flex items-center justify-center px-4 py-2 rounded-lg text-gray-800 dark:text-white  focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-base font-medium";

export default function Button({
	children,
	onClick,
	type = "button",
	loading = false,
	disabled = false,
	className = "",
	spinnerColor = "text-white",
	loadingText = "Cargando...",
	...props
}){
	const finalClassName = mergeClasses(DEFAULT_BUTTON_CLASS,className);
	return(
		<button
			type={type}
			onClick={onClick}
			disabled={loading||disabled}
			aria-busy={loading}
			aria-disabled={loading||disabled}
			className={finalClassName}
			{...props}
		>
			{loading&&(
				<>
					<svg className={`animate-spin -ml-1 mr-2 h-4 w-4 ${spinnerColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<span className="sr-only">{loadingText}</span>
				</>
			)}
			{children}
		</button>
	);
}