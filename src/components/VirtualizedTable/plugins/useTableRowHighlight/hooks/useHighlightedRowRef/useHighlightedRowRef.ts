import { useTableHighlightedRowContext } from '../../../../contexts/TableHighlightedRowContextProvider';
import { useRef, MutableRefObject } from 'react';
import { getProxiedObject, ProxyTarget } from '../../../utils';
import { HighlightedRow } from '../../../../contexts/TableHighlightedRowContextProvider/TableHighlightedRowContextProvider';

export type UseHighlightedRowRefReturn<D extends object> = {
	highlightedRowRef: MutableRefObject<ProxyTarget<HighlightedRow<D>>>;
};

export const useHighlightedRowRef = <
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
