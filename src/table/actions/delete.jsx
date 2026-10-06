import {memo} from "react";

function DeleteAction({row,onDelete,canDelete}){
	const isAllowed = typeof canDelete==="function"?canDelete(row):(canDelete??true);
	if(!onDelete||!isAllowed){
		return null;
	}
	return(
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				onDelete(row);
			}}
			className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
			title="Eliminar"
			aria-label="Eliminar"
		>
			<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
			</svg>
		</button>
	);
}

export default memo(DeleteAction);