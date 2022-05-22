import React, {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';

export type TableSelectionModeContextValue = {
	isSelectionMode: boolean;
	setIsSelectionMode: Dispatch<SetStateAction<boolean>>;
};

export const TableIsSelectionModeContext =
	createContext<TableSelectionModeContextValue>({
		isSelectionMode: false,
		setIsSelectionMode: () => {},
	});

export const TableIsSelectionModeContextProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [isSelectionMode, setIsSelectionMode] = useState<boolean>(false);

	const contextValue: TableSelectionModeContextValue = {
		isSelectionMode,
		setIsSelectionMode,
	};

	return (
		<TableIsSelectionModeContext.Provider value={contextValue}>
			{children}
		</TableIsSelectionModeContext.Provider>
	);
};
