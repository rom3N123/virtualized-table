import { useTableHighlightedRowContext } from '../../../../contexts/TableHighlightedRowContextProvider';
import { useRef, RefObject } from 'react';
import { getProxiedObject, ProxyTarget } from '../../../utils';
import { HighlightedRow } from '../../../../contexts/TableHighlightedRowContextProvider/TableHighlightedRowContextProvider';

export type UseHighlightedRowRefReturn<D extends object> = {
	highlightedRowRef: RefObject<ProxyTarget<HighlightedRow<D>>>;
};

const useHighlightedRowRef = <
	D extends object
>(): UseHighlightedRowRefReturn<D> => {
	const { setHighlightedRow } = useTableHighlightedRowContext<D>() || {};

	const highlightedRowRef = useRef(
		getProxiedObject<HighlightedRow<D>>({ value: null }, setHighlightedRow)
	);

	return {
		highlightedRowRef,
	};
};

export default useHighlightedRowRef;
