import {memo} from "react";
import EditAction from "./edit";
import DeleteAction from "./delete";
import CustomActions from "./customs";

function TableActions({
	row,
	onEdit,
	onDelete,
	customActions,
	canEdit,
	canDelete
}){
	return(
		<td className="flex flex-grow items-center justify-around px-4 whitespace-nowrap text-center text-sm border-gray-300 dark:border-gray-700 my-2">
			<CustomActions row={row} customActions={customActions}/>
			<EditAction row={row} onEdit={onEdit} canEdit={canEdit}/>
			<DeleteAction row={row} onDelete={onDelete} canDelete={canDelete}/>
		</td>
	);
}

export default memo(TableActions);
export {EditAction,DeleteAction,CustomActions};