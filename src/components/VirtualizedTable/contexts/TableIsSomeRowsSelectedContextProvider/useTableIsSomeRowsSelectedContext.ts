import { useContext } from 'react';
import {
	TableIsSomeRowsSelectedContextContext,
	TableIsSomeRowsSelectedContextValue,
} from './TableIsSomeRowsSelectedContextProvider';

const useTableIsSomeRowsSelectedContext =
	(): TableIsSomeRowsSelectedContextValue => {
		return useContext(TableIsSomeRowsSelectedContextContext);
	};

export default useTableIsSomeRowsSelectedContext;
