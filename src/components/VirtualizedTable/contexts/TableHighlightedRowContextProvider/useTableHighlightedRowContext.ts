import { useContext } from 'react';
import {
	TableHighlightedRowContext,
	TableHighlightedRowContextValue,
} from './TableHighlightedRowContextProvider';

export const useTableHighlightedRowContext = <
	T extends object
>(): TableHighlightedRowContextValue<T> => {
	return useContext(TableHighlightedRowContext);
};
