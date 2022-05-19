/* eslint-disable max-len */
import React, { memo, useEffect } from 'react';
import { areEqual } from 'react-window';
import { RenderItemProps, RenderItem } from '../../VirtualizedTable';

function RenderVirtualizedTableRowWithRef({
	index,
	data,
	...otherProps
}: RenderItemProps) {
	const { initializeRef, rows, deleteRef, RenderItem } = data;

	const RenderItemWithRef = RenderItem as RenderItem<true>;

	const rowId = rows[index]?.id;

	const rowRef = initializeRef(rowId);

	useEffect(() => {
		return () => {
			deleteRef(rowId);
		};
	}, []);

	return (
		<RenderItemWithRef ref={rowRef} index={index} data={data} {...otherProps} />
	);
}

export default memo(
	RenderVirtualizedTableRowWithRef,
	areEqual
) as typeof RenderVirtualizedTableRowWithRef;
