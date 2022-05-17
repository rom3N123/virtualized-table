import { useTableHighlightedRowContext } from '../../../../contexts/TableHighlightedRowContextProvider';
/* eslint-disable max-len */
import { useRef } from 'react';
import { getProxiedObject } from '../../../utils';
import { HighlightedRow } from '../../../../contexts/TableHighlightedRowContextProvider/TableHighlightedRowContextProvider';

type RowData = {
	id: number;
};

const useHighlightedRowRef = () => {
	const { setHighlightedRow } = useTableHighlightedRowContext<RowData>() || {};

	const highlightedRowRef = useRef(
		getProxiedObject<HighlightedRow<RowData>>(
			{ value: null },
			setHighlightedRow
		)
	);

	return {
		highlightedRowRef,
	};
};

export default useHighlightedRowRef;
