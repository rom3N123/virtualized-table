import React, { memo, ReactElement, useEffect } from 'react';
import { areEqual } from 'react-window';
import { RenderItemProps, RenderItem } from '../..';

const RenderVirtualizedTableRowWithRef = <
	D extends object,
	E extends object = {}
>({
	index,
	data,
	...otherProps
}: RenderItemProps<D, E>): ReactElement => {
	const { initializeRef, rows, deleteRef, RenderItem } = data;

	const RenderItemWithRef = RenderItem as RenderItem<D, E, true>;

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
};

export default memo(
	RenderVirtualizedTableRowWithRef,
	areEqual
) as typeof RenderVirtualizedTableRowWithRef;
