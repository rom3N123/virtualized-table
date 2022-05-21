import { useTableHighlightedRowContext } from '../../../../contexts/TableHighlightedRowContextProvider';
import { useRef } from 'react';
import { getProxiedObject } from '../../../utils';
import { HighlightedRow } from '../../../../contexts/TableHighlightedRowContextProvider/TableHighlightedRowContextProvider';

const useHighlightedRowRef = () => {
	const { setHighlightedRow } = useTableHighlightedRowContext<{}>() || {};

	const highlightedRowRef = useRef(
		getProxiedObject<HighlightedRow<{}>>({ value: null }, setHighlightedRow)
	);

	return {
		highlightedRowRef,
	};
};

export default useHighlightedRowRef;
