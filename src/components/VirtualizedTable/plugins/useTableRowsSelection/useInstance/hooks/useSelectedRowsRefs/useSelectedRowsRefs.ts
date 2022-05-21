import { Row } from 'react-table';
import { useRef } from 'react';
import { useTableIsSomeRowsSelectedContext } from '../../../../../contexts/TableIsSomeRowsSelectedContextProvider';

import {
	combineFunctions,
	getProxiedArray,
	ProxyTarget,
} from './../../../../utils';

const useSelectedRowsRefs = () => {
	/**
	 * FIXME
	 */
	// const { setSelectedRows } = useTableRowsSelectionContext() || {};
	const { setIsSomeRowsSelected } = useTableIsSomeRowsSelectedContext() || {};

	const selectedCacheByIdRef = useRef<Record<string, Row>>({});

	const selectedCacheArrayRef = useRef<ProxyTarget<Row[]>>(
		{ value: [] }
		// combineFunctions<object>(setSelectedRows, setIsSomeRowsSelected)
	);

	return {
		selectedCacheByIdRef,
		selectedCacheArrayRef,
	};
};

export default useSelectedRowsRefs;
