import {memo} from "react";

function DefaultActionIcon(){
	return(
		<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
		</svg>
	);
}
function checkIsActionAllowed(action,row){
	if(typeof action["canExecute"]==="function"){
		return action.canExecute(row);
	}
	if(typeof action["show"]==="function"){
		return action.show(row);
	}
	return action["show"]??action["isAllowed"]??true;
}
function getActionButtonClass(action){
	if(action["color"]){
		return action["color"];
	}
	if(action["icon"]||!action["label"]){
		return "p-2 text-gray-400 hover:text-cyan-600 dark:text-gray-500 dark:hover:text-cyan-400 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500";
	}
	return "px-2.5 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500";
}
function renderActionContent(action){
	if(action["icon"]){
		return action["icon"];
	}
	if(action["label"]){
		return action["label"];
	}
	return <DefaultActionIcon/>;
}
function ActionButton({action,row,idx}){
	if(!action||typeof action!=="object"){
		return null;
	}
	if(!checkIsActionAllowed(action,row)){
		return null;
	}
	const handleClick = (e) => {
		e.stopPropagation();
		action.onClick?.(row);
	};
	const actionKey = action["key"]??action["label"]??idx;
	const buttonTitle = action["label"]||"Acción";
	return(
		<button
			key={actionKey}
			type="button"
			onClick={handleClick}
			className={getActionButtonClass(action)}
			title={buttonTitle}
			aria-label={buttonTitle}
		>
			{renderActionContent(action)}
		</button>
	);
}
function CustomActions({row,customActions}){
	if(!customActions){
		return null;
	}
	if(typeof customActions==="function"){
		return customActions(row);
	}
	const actionsList = Array.isArray(customActions)?customActions:[customActions];
	return(
		<>
			{actionsList.map((action,idx) => (
				<ActionButton key={action?.["key"]??action?.["label"]??idx} action={action} row={row} idx={idx}/>
			))}
		</>
	);
}

export default memo(CustomActions);