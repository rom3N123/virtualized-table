import { useContext } from 'react';
import {
	TableHighlightedRowContext,
	TableHighlightedRowContextValue,
} from './TableHighlightedRowContextProvider';

const useTableHighlightedRowContext = <
	T extends object
>(): TableHighlightedRowContextValue<T> => {
	return useContext(TableHighlightedRowContext);
};

export default useTableHighlightedRowContext;
