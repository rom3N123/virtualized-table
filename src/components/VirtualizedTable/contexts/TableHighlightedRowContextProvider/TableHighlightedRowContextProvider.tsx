import React, {
	createContext,
	Dispatch,
	ReactElement,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import { Row } from 'react-table';

export type HighlightedRow<D extends object> = Row<D> | null;

export type TableHighlightedRowContextValue<D extends object> = {
	highlightedRow: HighlightedRow<D>;
	setHighlightedRow: Dispatch<SetStateAction<HighlightedRow<D> | null>>;
};

export const TableHighlightedRowContext =
	// @ts-ignore
	createContext<TableHighlightedRowContextValue>({
		highlightedRow: null,
		setHighlightedRow: () => {},
	});

const TableHighlightedRowContextProvider = <D extends object>({
	children,
}: {
	children: ReactNode;
}): ReactElement => {
	const [highlightedRow, setHighlightedRow] = useState<HighlightedRow<D>>(null);

	const contextValue: TableHighlightedRowContextValue<D> = {
		highlightedRow,
		setHighlightedRow,
	};

	return (
		<TableHighlightedRowContext.Provider value={contextValue}>
			{children}
		</TableHighlightedRowContext.Provider>
	);
};

export default TableHighlightedRowContextProvider;
