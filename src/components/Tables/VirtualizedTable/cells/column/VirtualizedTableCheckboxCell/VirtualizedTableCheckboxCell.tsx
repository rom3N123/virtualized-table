import React, { MouseEvent } from 'react';
import { TableCellRenderer } from 'react-table';
import useObservable from '../../../../../../hooks/useObservable';

const VirtualizedTableCheckboxCell: TableCellRenderer<object, string> = ({
	row,
	isSelectionModeObservable,
	toggleRowSelected,
	isSelected,
}) => {
	const { index } = row;
	const isSelectionMode = useObservable(isSelectionModeObservable);

	const onCheckboxClick = (event: MouseEvent<HTMLInputElement>) => {
		event.stopPropagation();
		toggleRowSelected(index, event);
	};

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			{isSelectionMode ? (
				<input checked={isSelected} onClick={onCheckboxClick} type='checkbox' />
			) : (
				<div>!</div>
			)}
		</div>
	);
};

export default VirtualizedTableCheckboxCell;
