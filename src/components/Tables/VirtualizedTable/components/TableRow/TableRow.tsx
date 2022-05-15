import React, { FC, MouseEventHandler, ReactElement } from 'react';
import styles from './TableRow.module.scss';
import { DroppableProvided } from 'react-beautiful-dnd';
import { Row } from 'react-table';

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

	const tableRowClassNames = [styles.row, isHighlighted && 'highlighted']
		.filter(Boolean)
		.join(' ');

	return (
		<tr
			className={tableRowClassNames}
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
						className={styles.rowData}
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
