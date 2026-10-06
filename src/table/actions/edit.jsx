import {memo} from "react";

function EditAction({row,onEdit,canEdit}){
	const isAllowed = typeof canEdit==="function"?canEdit(row):(canEdit??true);
	if(!onEdit||!isAllowed){
		return null;
	}
	return(
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				onEdit(row);
			}}
			className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-cyan-500 hover:bg-gray-200 dark:hover:bg-cyan-500/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
			title="Editar"
			aria-label="Editar"
		>
			<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
			</svg>
		</button>
	);
}

export default memo(EditAction);