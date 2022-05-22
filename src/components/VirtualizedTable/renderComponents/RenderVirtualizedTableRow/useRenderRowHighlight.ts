import { UseHighlightedRowRefReturn } from './../../plugins/useTableRowHighlight/hooks/useHighlightedRowRef/useHighlightedRowRef';
import { RowWithProps } from 'react-table';
import { useState, useLayoutEffect } from 'react';

export type UseRenderRowHighlightProps<D extends object> = {
	row: RowWithProps<D>;
	highlightedRowRef: UseHighlightedRowRefReturn<D>['highlightedRowRef'];
};

export const useRenderRowHighlight = <D extends object>({
	row,
	highlightedRowRef,
}: UseRenderRowHighlightProps<D>) => {
	const [isSelected, setIsSelected] = useState(false);
	const [isHighlighted, setIsHighlighted] = useState(false);

	useLayoutEffect(() => {
		const isRowSelected = row.getIsSelectedRow(row);

		if (highlightedRowRef.current?.value?.id === row.id) {
			setIsHighlighted(true);
		} else if (isSelected !== isRowSelected) {
			setIsSelected(isRowSelected);
		}
	}, [row]);

	return {
		isSelected,
		setIsSelected,
		isHighlighted,
		setIsHighlighted,
	};
};
