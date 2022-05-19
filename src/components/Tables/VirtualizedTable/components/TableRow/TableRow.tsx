import React, { FC, MouseEventHandler, ReactElement } from 'react';
import './TableRow.scss';
import { DroppableProvided } from 'react-beautiful-dnd';
import { Row } from 'react-table';
import clsx from 'clsx';

type TableRowProps = {
	innerRef: DroppableProvided['innerRef'];
	isHighlighted?: boolean;
	onClick: MouseEventHandler<HTMLTableRowElement>;
	row: Row;
	renderProps?: object;
};

const TableRow: FC<TableRowProps> = ({
	innerRef,
	isHighlighted,
	onClick,
	row,
	renderProps,
	...otherRowProps
}): ReactElement => {
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
				// const { width, cellProps } = column;
				const { width } = column;

				return (
					<td
						className='rowData'
						width={width}
						// {...cellProps}
						{...getCellProps()}
						key={column.id}
					>
						{render('Cell', renderProps)}
					</td>
				);
			})}
		</tr>
	);
};

export default TableRow;
