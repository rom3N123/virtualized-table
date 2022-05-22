import React, {
	createContext,
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';

export type TableRowsSelectionContextValue = {
	selectedRows: string[];
	setSelectedRows: Dispatch<SetStateAction<string[]>>;
};

export const TableRowsSelectionContext =
	createContext<TableRowsSelectionContextValue>({
		selectedRows: [],
		setSelectedRows: () => {},
	});

export const TableRowsSelectionContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const contextValue: TableRowsSelectionContextValue = {
		selectedRows,
		setSelectedRows,
	};

	return (
		<TableRowsSelectionContext.Provider value={contextValue}>
			{children}
		</TableRowsSelectionContext.Provider>
	);
};
