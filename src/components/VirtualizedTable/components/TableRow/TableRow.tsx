import React, { MouseEventHandler, ReactElement } from 'react';
import './TableRow.scss';
import { DroppableProvided } from 'react-beautiful-dnd';
import { Row } from 'react-table';
import clsx from 'clsx';

export type TableRowProps<D extends object, R extends object = {}> = {
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
}: TableRowProps<D, R>): ReactElement => {
	const { cells } = row;

	return (
		<tr
			className={clsx(['row', isHighlighted && 'highlighted'])}
			ref={innerRef}
			onClick={onClick}
			{...otherRowProps}
		>
			{cells.map(cell => {
				const { getCellProps, render, column } = cell;
				const { width, minWidth, grow } = column;

				return (
					<td
						className='rowData'
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
