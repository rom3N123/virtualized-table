import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
	arrayOf,
	elementType,
	func,
	number,
	object,
	oneOfType,
	shape,
	string,
} from 'prop-types';
import clsx from 'clsx';
import styles from './RenderTableBody.module.scss';

const RenderTableBody = props => {
	const {
		getTableBodyProps,
		rows,
		prepareRow,
		getRowId,
		rowProps,
		TableRow,
		className,
		outerRef,
		getItemSize,
	} = props;

	// eslint-disable-next-line react/prop-types
	return ({ innerRef, droppableProps }) => {
		const getInnerRef = innerRef => node => {
			innerRef.current = node;

			if (typeof outerRef === 'function') {
				return outerRef(node);
			}

			outerRef.current = node;

			return node;
		};

		return (
			<div
				className={clsx([styles.table, className])}
				ref={getInnerRef(innerRef)}
				{...getTableBodyProps()}
				{...droppableProps}
			>
				{rows.map((row, rowIndex) => {
					const { original } = row;
					prepareRow(row);

					const uniqueRowId = getRowId(original);
					const { style, ...otherProps } =
						typeof rowProps === 'function' ? rowProps(row) : rowProps;

					return (
						<Draggable
							draggableId={uniqueRowId}
							key={uniqueRowId}
							index={rowIndex}
						>
							{({ innerRef, draggableProps, dragHandleProps }) => (
								<TableRow
									ref={innerRef}
									maxHeight={maxRowHeight}
									row={row}
									draggableProps={draggableProps}
									style={style}
									dragHandleProps={dragHandleProps}
									getItemSize={getItemSize}
									{...otherProps}
								/>
							)}
						</Draggable>
					);
				})}
			</div>
		);
	};
};

RenderTableBody.propTypes = {
	getTableBodyProps: func.isRequired,
	TableRow: elementType.isRequired,
	prepareRow: func.isRequired,
	getRowId: func.isRequired,
	rows: arrayOf(shape({ id: number })),
	RenderClone: elementType,
	rowProps: oneOfType([object, func]),
	className: string,
	getItemSize: oneOfType([func, number]),
};

RenderTableBody.defaultProps = {
	className: '',
};

export default RenderTableBody;
