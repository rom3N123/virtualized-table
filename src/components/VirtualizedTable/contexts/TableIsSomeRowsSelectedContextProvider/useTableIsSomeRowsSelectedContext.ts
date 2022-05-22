import { useContext } from 'react';
import {
	TableIsSomeRowsSelectedContextContext,
	TableIsSomeRowsSelectedContextValue,
} from './TableIsSomeRowsSelectedContextProvider';

export const useTableIsSomeRowsSelectedContext =
	(): TableIsSomeRowsSelectedContextValue => {
		return useContext(TableIsSomeRowsSelectedContextContext);
	};
