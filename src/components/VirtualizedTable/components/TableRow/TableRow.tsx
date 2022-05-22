import React, { MouseEventHandler, ReactElement } from 'react';
import { DroppableProvided } from 'react-beautiful-dnd';
import { Row } from 'react-table';
import clsx from 'clsx';

export type RowTableProps<D extends object, R extends object = {}> = {
	innerRef: DroppableProvided['innerRef'];
	isHighlighted?: boolean;
	onClick?: MouseEventHandler<HTMLTableRowElement>;
	row: Row<D>;
	renderProps?: R;
};

export const TableRow = <D extends object, R extends object = {}>({
	innerRef,
	isHighlighted,
	onClick,
	row,
	renderProps,
	...otherRowProps
}: RowTableProps<D, R>): ReactElement => {
	const { cells } = row;

	return (
		<tr
			className={clsx(['table-row', isHighlighted && 'highlighted'])}
			ref={innerRef}
			onClick={onClick}
			{...otherRowProps}
		>
			{cells.map(cell => {
				const { getCellProps, render, column } = cell;
				const { width, minWidth, grow } = column;

				return (
					<td
						className='table-row-data'
						width={width}
						{...getCellProps({
							style: {
								minWidth,
								flexGrow: grow,
							},
						})}
						key={column.id}
					>
						{render('Cell', renderProps)}
					</td>
				);
			})}
		</tr>
	);
};
