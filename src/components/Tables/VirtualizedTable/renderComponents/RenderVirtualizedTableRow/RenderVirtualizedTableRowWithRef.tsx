/* eslint-disable max-len */
import React, { memo, useEffect } from 'react';
import { areEqual, ListChildComponentProps } from 'react-window';
import { DefaultExtraItemData } from '../../components/RenderVirtualizedTableBody/RenderVirtualizedTableBody';

function RenderVirtualizedTableRowWithRef<D extends object>({
	index,
	data,
	...otherProps
}: ListChildComponentProps<DefaultExtraItemData<D>>) {
	const { initializeRef, rows, deleteRef, RenderItem } = data;

	const rowId = rows[index]?.id;

	const rowRef = initializeRef(rowId);

	useEffect(() => {
		return () => {
			deleteRef(rowId);
		};
	}, []);

	return <RenderItem ref={rowRef} index={index} data={data} {...otherProps} />;
}

export default memo(
	RenderVirtualizedTableRowWithRef,
	areEqual
) as typeof RenderVirtualizedTableRowWithRef;
