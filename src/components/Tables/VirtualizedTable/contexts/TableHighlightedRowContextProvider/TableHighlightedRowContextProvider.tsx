import React, {
	createContext,
	Dispatch,
	ReactElement,
	ReactNode,
	SetStateAction,
	useState,
} from 'react';
import { node } from 'prop-types';
import { Row } from 'react-table';

export type HighlightedRow<T extends object> = Row<T> | null;

export type TableHighlightedRowContextValue<T extends object> = {
	highlightedRow: HighlightedRow<T>;
	setHighlightedRow: Dispatch<SetStateAction<HighlightedRow<T> | null>>;
};

export const TableHighlightedRowContext =
	// @ts-ignore
	createContext<TableHighlightedRowContextValue>({
		highlightedRow: null,
		setHighlightedRow: () => {},
	});

const TableHighlightedRowContextProvider = <T extends object>({
	children,
}: {
	children: ReactNode;
}): ReactElement => {
	const [highlightedRow, setHighlightedRow] = useState<HighlightedRow<T>>(null);

	const contextValue: TableHighlightedRowContextValue<T> = {
		highlightedRow,
		setHighlightedRow,
	};

	return (
		<TableHighlightedRowContext.Provider value={contextValue}>
			{children}
		</TableHighlightedRowContext.Provider>
	);
};

TableHighlightedRowContextProvider.propTypes = {
	children: node,
};

TableHighlightedRowContextProvider.defaultProps = {
	children: null,
};

export default TableHighlightedRowContextProvider;
